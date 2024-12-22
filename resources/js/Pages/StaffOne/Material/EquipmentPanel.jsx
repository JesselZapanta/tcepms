import {
    Button,
    Form,
    notification,
    Row,
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

export default function EquipmentPanel({ project, setCostChange }) {
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
                `/staffone/materials/equipment/getdata?${params}`
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

    const [equipment, setEquipment] = useState(false);
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

    const showEditModal = (equipment) => {
        setIsModalOpen(true);
        setEquipment(equipment);

        setQuantity(equipment.quantity);
        setNoOfDays(equipment.no_of_days);
        setRate(equipment.rate);

        form.setFieldsValue({
            equipment: equipment.equipment,
            quantity: equipment.quantity,
            no_of_days: equipment.no_of_days,
            rate: equipment.rate,
            cost: equipment.cost,
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEquipment(false);
        form.resetFields();
        setErrors({});
        getData();
        setQuantity(0);
        setNoOfDays(0);
        setRate(0);
    };

    const handleSubmit = async (values) => {
        setProcessing(true);

        if (equipment) {
            try {
                const res = await axios.put(
                    `/staffone/materials/equipment/update/${equipment.id}`,
                    values
                );
                if (res.data.status === "updated") {
                    setCostChange();
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "The equipment has been updated successfully."
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
                    "/staffone/materials/equipment/store",
                    values
                );
                if (res.data.status === "created") {
                    setCostChange();
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The equipment has been created successfully."
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
                `/staffone/materials/equipment/destroy/${id}`
            );

            if (res.data.status === "deleted") {
                setCostChange();
                handleCancel();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The equipment has been deleted successfully."
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const [quantity, setQuantity] = useState(0);
    const [noOfDays, setNoOfDays] = useState(0);
    const [rate, setRate] = useState(0);

    // Calculate cost dynamically
    const cost = quantity * noOfDays * rate;

    const totalAmount = data.reduce(
        (total, item) => total + parseFloat(item.cost || 0),
        0
    );

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
            <div className="py-2">List of Equipment Materials</div>
            <div className="flex gap-2 mb-2">
                <Search
                    placeholder="Input equipment material"
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
                    footer={() =>
                        `Total Material Cost: ${formatPeso(totalAmount)}`
                    }
                    onChange={handleTableChange}
                >
                    <Column sorter={true} title="ID" dataIndex="id" key="id" />

                    <Column
                        sorter={true}
                        title="Equipment"
                        dataIndex="equipment"
                        key="equipment"
                    />
                    <Column
                        sorter={true}
                        title="Quantity"
                        dataIndex="quantity"
                        key="quantity"
                    />
                    <Column
                        sorter={true}
                        title="No. of Days"
                        dataIndex="no_of_days"
                        key="no_of_days"
                        render={(value) => formatPeso(value)}
                    />
                    <Column
                        sorter={true}
                        title="Rate / Day"
                        dataIndex="rate"
                        key="rate"
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
                    equipment ? "UPDATE EQUIPMENT DETAILS" : "EQUIPMENT DETAILS"
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
                            label="EQUIPMENT NAME"
                            name="equipment"
                            // Custom error handling
                            validateStatus={errors?.equipment ? "error" : ""}
                            help={errors?.equipment ? errors.equipment[0] : ""}
                        >
                            <Input
                                placeholder="Equipment Name"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <div className="flex gap-4">
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
                            <Form.Item
                                label="NO. OF DAYS"
                                name="no_of_days"
                                validateStatus={
                                    errors?.no_of_days ? "error" : ""
                                }
                                help={
                                    errors?.no_of_days
                                        ? errors?.no_of_days[0]
                                        : ""
                                }
                                className="w-full"
                            >
                                <Input
                                    type="number"
                                    prefix={<PhoneOutlined />}
                                    onChange={(e) =>
                                        setNoOfDays(Number(e.target.value) || 0)
                                    }
                                    className="w-full"
                                />
                            </Form.Item>
                        </div>
                        <div className="flex gap-4">
                            <Form.Item
                                label="RATE / DAY"
                                name="rate"
                                validateStatus={errors?.rate ? "error" : ""}
                                help={errors?.rate ? errors?.rate[0] : ""}
                                className="w-full"
                            >
                                <Input
                                    type="number"
                                    prefix={<PhoneOutlined />}
                                    onChange={(e) =>
                                        setRate(Number(e.target.value) || 0)
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
                                {equipment ? "Update" : "Save"}
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
