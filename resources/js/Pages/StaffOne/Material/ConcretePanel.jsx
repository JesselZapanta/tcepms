import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import dayjs from "dayjs";
import {
    Button,
    Divider,
    Form,
    DatePicker,
    notification,
    Row,
    Select,
    Space,
    Table,
} from "antd";
import Search from "antd/es/input/Search";
import {
    PhoneOutlined,
    LockOutlined,
    MailOutlined,
    PlusOutlined,
    UserOutlined,
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import axios from "axios";
import Column from "antd/es/table/Column";
const { RangePicker } = DatePicker;

export default function ConcretePanel({ project, setCostChange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    const getData = async (isSearch = false) => {
        if (isSearch) {
            setSearching(true);
        }
        setLoading(true);

        const params = [
            `project=${project.id}`,
            `page=${page}`,
            `search=${search}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
        ].join("&");

        try {
            const res = await axios.get(
                `/staffone/materials/concrete/getdata?${params}`
            );
            setData(res.data.data);
            setTotal(res.data.total);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            setSearching(false);
        }
    };

    //antd onchange table has 3 params
    const handleTableChange = (pagination, filters, sorter) => {
        setSortField(sorter.field || "id");
        setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
        setPage(pagination.current);
    };

    useEffect(() => {
        getData(false);
    }, [page, sortField, sortOrder]);

    const [concrete, setConcrete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, placement, title, msg) => {
        api[type]({
            message: title,
            description: msg,
            placement: placement,
        });
    };

    const [form] = Form.useForm();
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const showCreateModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const showEditModal = (concrete) => {
        setIsModalOpen(true);
        setConcrete(concrete);

        setQuantity(concrete.quantity);
        setUnitCost(concrete.unit_cost);

        form.setFieldsValue({
            material: concrete.material,
            unit: concrete.unit,
            quantity: concrete.quantity,
            unit_cost: concrete.unit_cost,
            cost: concrete.cost,
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setConcrete(false);
        form.resetFields();
        setErrors({});
        getData();
        setQuantity(0);
        setUnitCost(0);
    };

    const handleSubmit = async (values) => {
        setProcessing(true);

        if (concrete) {
            try {
                const res = await axios.put(
                    `/staffone/materials/concrete/updata/${concrete.id}`,
                    values
                );
                if (res.data.status === "updated") {
                    setCostChange();
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "The concrete has been updated successfully."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            values.project = project.id;

            try {
                const res = await axios.post(
                    "/staffone/materials/concrete/store",
                    values
                );
                if (res.data.status === "created") {
                    setCostChange();
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The concrete has been created successfully."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);

        try {
            const res = await axios.delete(
                `/staffone/materials/concrete/destroy/${id}`
            );

            if (res.data.status === "deleted") {
                setCostChange();
                handleCancel();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The concrete has been deleted successfully."
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const [quantity, setQuantity] = useState(0);
    const [unitCost, setUnitCost] = useState(0);

    // Calculate cost dynamically
    const cost = quantity * unitCost;

    const totalAmount = data.reduce(
        (total, item) => total + parseFloat(item.cost || 0),
        0
    );

    const laborCost = totalAmount * 0.4;

    const subTotalCost = totalAmount + laborCost;

    useEffect(() => {
        form.setFieldsValue({ cost });
    }, [cost]);

    const formatPeso = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "₱0.00";
        return `₱${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    };

    return (
        <>
            {contextHolder}
            <div className="py-2">List of Concrete Works Materials</div>
            <div className="flex gap-2 mb-2">
                <Search
                    placeholder="Input concrete material"
                    allowClear
                    enterButton="Search"
                    loading={searching}
                    onChange={(e) => setSearch(e.target.value)}
                    onSearch={() => getData(true)}
                />
                <Button
                    type="primary"
                    onClick={showCreateModal}
                    icon={<PlusOutlined />}
                >
                    Add
                </Button>
            </div>
            <div className="overflow-x-auto">
                <Table
                    loading={loading}
                    dataSource={data}
                    rowKey={(data) => data.id}
                    pagination={{
                        current: page,
                        total: total,
                        pageSize: 10,
                        showSizeChanger: false,
                        onChange: (page) => setPage(page),
                    }}
                    footer={() => (
                        <div>
                            <div>
                                Total Material Cost: {formatPeso(totalAmount)}
                            </div>
                            <div>Labor Cost (40%): {formatPeso(laborCost)}</div>
                            <div>
                                Sub Total Cost: {formatPeso(subTotalCost)}
                            </div>
                        </div>
                    )}
                    onChange={handleTableChange}
                >
                    <Column sorter={true} title="ID" dataIndex="id" key="id" />

                    <Column
                        sorter={true}
                        title="Materials"
                        dataIndex="material"
                        key="material"
                    />
                    <Column
                        sorter={true}
                        title="Unit"
                        dataIndex="unit"
                        key="unit"
                    />
                    <Column
                        sorter={true}
                        title="Quantity"
                        dataIndex="quantity"
                        key="quantity"
                    />
                    <Column
                        sorter={true}
                        title="UNIT COST"
                        dataIndex="unit_cost"
                        key="unit_cost"
                        render={(value) => formatPeso(value)}
                    />
                    <Column
                        sorter={true}
                        title="Cost"
                        dataIndex="cost"
                        key="cost"
                        render={(value) => formatPeso(value)}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space>
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<EditOutlined />}
                                    onClick={() => showEditModal(record)}
                                ></Button>
                                <Button
                                    danger
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                        Modal.confirm({
                                            title: "Delete?",
                                            icon: <QuestionCircleOutlined />,
                                            content:
                                                "Are you sure you want to delete this material?",
                                            okText: "Yes",
                                            cancelText: "No",
                                            onOk() {
                                                handleDelete(record.id);
                                            },
                                        })
                                    }
                                />
                            </Space>
                        )}
                    />
                </Table>
            </div>
            <Modal
                title={
                    concrete
                        ? "UPDATE CONCRETE WORKS MATERIAL"
                        : "CONCRETE WORKS MATERIAL"
                }
                width={800}
                open={isModalOpen}
                onCancel={handleCancel}
                maskClosable={false}
                footer={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item>
                        <Form.Item
                            label="MATERIAL NAME"
                            name="material"
                            // Custom error handling
                            validateStatus={errors?.material ? "error" : ""}
                            help={errors?.material ? errors.material[0] : ""}
                        >
                            <Input
                                placeholder="Material Name"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <div className="flex gap-4">
                            <Form.Item
                                label="UNIT"
                                name="unit"
                                validateStatus={errors?.unit ? "error" : ""}
                                help={errors?.unit ? errors?.unit[0] : ""}
                                className="w-full"
                            >
                                <Select
                                    options={[
                                        { value: "bag", label: "Bag" },
                                        {
                                            value: "cu.m",
                                            label: "Cubic Meter (cu.m)",
                                        },
                                        { value: "pcs", label: "Pieces (pcs)" },
                                        {
                                            value: "bd.ft.",
                                            label: "Board Feet (bd.ft.)",
                                        },
                                        { value: "kg", label: "Kilogram (kg)" },
                                    ]}
                                    className="w-full"
                                />
                            </Form.Item>
                            <Form.Item
                                label="QUANTITY"
                                name="quantity"
                                validateStatus={errors?.quantity ? "error" : ""}
                                help={
                                    errors?.quantity ? errors?.quantity[0] : ""
                                }
                                className="w-full"
                            >
                                <Input
                                    type="number"
                                    prefix={<PhoneOutlined />}
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value) || 0)
                                    }
                                    className="w-full"
                                />
                            </Form.Item>
                        </div>
                        <div className="flex gap-4">
                            <Form.Item
                                label="UNIT COST"
                                name="unit_cost"
                                validateStatus={
                                    errors?.unit_cost ? "error" : ""
                                }
                                help={
                                    errors?.unit_cost
                                        ? errors?.unit_cost[0]
                                        : ""
                                }
                                className="w-full"
                            >
                                <Input
                                    type="number"
                                    prefix={<PhoneOutlined />}
                                    onChange={(e) =>
                                        setUnitCost(Number(e.target.value) || 0)
                                    }
                                    className="w-full"
                                />
                            </Form.Item>
                            <Form.Item
                                label="COST (READ ONLY)"
                                name="cost"
                                className="w-full"
                            >
                                <Input
                                    type="number"
                                    disabled
                                    // value={cost}
                                    prefix={<PhoneOutlined />}
                                    className="w-full"
                                />
                            </Form.Item>
                        </div>
                    </Form.Item>
                    <Row justify="end">
                        <Space size="small">
                            <Button type="default" onClick={handleCancel}>
                                Cancel
                            </Button>

                            <Button
                                htmlType="submit"
                                type="primary"
                                icon={<PlusOutlined />}
                                disabled={processing}
                                loading={processing}
                            >
                                {concrete ? "Update" : "Save"}
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
