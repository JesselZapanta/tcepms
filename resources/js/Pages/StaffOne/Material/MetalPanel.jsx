import {
    Button,
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
    PlusOutlined,
    UserOutlined,
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import axios from "axios";
import Column from "antd/es/table/Column";

export default function MetalPanel({ project }) {
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
                `/stafftwo/materials/metal/getdata?${params}`
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

    const [metal, setMetal] = useState(false);
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

    const showEditModal = (metal) => {
        setIsModalOpen(true);
        setMetal(metal);

        setQuantity(metal.quantity);
        setUnitCost(metal.unit_cost);

        form.setFieldsValue({
            material: metal.material,
            unit: metal.unit,
            quantity: metal.quantity,
            unit_cost: metal.unit_cost,
            cost: metal.cost,
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setMetal(false);
        form.resetFields();
        setErrors({});
        getData();
        setQuantity(0);
        setUnitCost(0);
    };

    const handleSubmit = async (values) => {
        setProcessing(true);

        if (metal) {
            try {
                const res = await axios.put(
                    `/stafftwo/materials/metal/updata/${metal.id}`,
                    values
                );
                if (res.data.status === "updated") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "The metal has been updated successfully."
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
                    "/stafftwo/materials/metal/store",
                    values
                );
                if (res.data.status === "created") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The metal has been created successfully."
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
                `/stafftwo/materials/metal/destroy/${id}`
            );

            if (res.data.status === "deleted") {
                handleCancel();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The metal has been deleted successfully."
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

    return (
        <>
            {contextHolder}
            <div className="py-2">List of Metal Works Materials</div>
            <div className="flex gap-2 mb-2">
                <Search
                    placeholder="Input metal material"
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
                                Total Material Cost: {totalAmount.toFixed(2)}
                            </div>
                            <div>Labor Cost (40%): {laborCost.toFixed(2)}</div>
                            <div>Sub Total Cost: {subTotalCost.toFixed(2)}</div>
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
                    />
                    <Column
                        sorter={true}
                        title="Cost"
                        dataIndex="cost"
                        key="cost"
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
                    metal
                        ? "UPDATE METAL WORKS MATERIAL"
                        : "METAL WORKS MATERIAL"
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
                                {metal ? "Update" : "Save"}
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
