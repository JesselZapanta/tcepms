import {
    Button,
    Form,
    DatePicker,
    notification,
    Row,
    Space,
    Table,
    message,
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
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import axios from "axios";
import Column from "antd/es/table/Column";
const { RangePicker } = DatePicker;

export default function WaterLabor({ project, setCostChange, costs }) {
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
                `/stafftwo/labor/water/getdata?${params}`
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

    const [waterLabor, setWaterLabor] = useState(false);
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

    const showEditModal = (waterLabor) => {
        setIsModalOpen(true);
        setWaterLabor(waterLabor);

        setQuantity(waterLabor.quantity);
        setNoOfDays(waterLabor.no_of_days);
        setRate(waterLabor.rate);

        form.setFieldsValue({
            position: waterLabor.position,
            quantity: waterLabor.quantity,
            no_of_days: waterLabor.no_of_days,
            rate: waterLabor.rate,
            cost: waterLabor.cost,
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setWaterLabor(false);
        form.resetFields();
        setErrors({});
        getData(false);
        setQuantity(0);
        setNoOfDays(0);
        setRate(0);
    };

    const handleSubmit = async (values) => {
        setProcessing(true);

        if (waterLabor) {
            try {
                const res = await axios.put(
                    `/stafftwo/labor/water/update/${waterLabor.id}`,
                    values
                );
                if (res.data.status === "updated") {
                    setCostChange();
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "The water labor has been updated successfully."
                    );
                }
            } catch (err) {
                if (
                    err.response.status === 422 &&
                    err.response.data.status === "over"
                ) {
                    message.error("The total labor cost exceeds the budget.");
                } else {
                    setErrors(err.response.data.errors);
                }
            } finally {
                setProcessing(false);
            }
        } else {
            values.project = project.id;

            try {
                const res = await axios.post(
                    "/stafftwo/labor/water/store",
                    values
                );
                if (res.data.status === "created") {
                    setCostChange();
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The water labor has been created successfully."
                    );
                }
            } catch (err) {
                if (
                    err.response.status === 422 &&
                    err.response.data.status === "over"
                ) {
                    message.error("The total labor cost exceeds the budget.");
                } else {
                    setErrors(err.response.data.errors);
                }
            } finally {
                setProcessing(false);
            }
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);

        try {
            const res = await axios.delete(
                `/stafftwo/labor/water/destroy/${id}`
            );

            if (res.data.status === "deleted") {
                setCostChange();
                handleCancel();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The water labor has been deleted successfully."
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
            <div className="py-2">List of Water Labor</div>
            <div className="flex md:flex-row flex-col gap-2 mb-2">
                <Search
                    placeholder="Input water labor position"
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
                                Total Water Labor Budget:
                                {formatPeso(costs.WaterLaborBudget)}
                            </div>
                            <div>
                                Total Water Labor Cost:
                                {formatPeso(costs.ActualWaterLaborCost)}
                            </div>
                        </div>
                    )}
                    onChange={handleTableChange}
                >
                    <Column
                        className="whitespace-nowrap bg-white"
                        sorter={true}
                        title="ID"
                        dataIndex="id"
                        key="id"
                    />

                    <Column
                        className="whitespace-nowrap bg-white"
                        sorter={true}
                        title="Position"
                        dataIndex="position"
                        key="position"
                    />
                    <Column
                        className="whitespace-nowrap bg-white"
                        sorter={true}
                        title="Quantity"
                        dataIndex="quantity"
                        key="quantity"
                    />
                    <Column
                        className="whitespace-nowrap bg-white"
                        sorter={true}
                        title="No. of Days"
                        dataIndex="no_of_days"
                        key="no_of_days"
                        // render={(value) => formatPeso(value)}
                    />
                    <Column
                        className="whitespace-nowrap bg-white"
                        sorter={true}
                        title="Rate / Day"
                        dataIndex="rate"
                        key="rate"
                        render={(value) => formatPeso(value)}
                    />
                    <Column
                        className="whitespace-nowrap bg-white"
                        sorter={true}
                        title="Cost"
                        dataIndex="cost"
                        key="cost"
                        render={(value) => formatPeso(value)}
                    />
                    <Column
                        className="whitespace-nowrap bg-white"
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
                                                "Are you sure you want to delete this water labor?",
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
                title={waterLabor ? "UPDATE WATER LABOR" : "WATER LABOR"}
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
                            label="LABORER POSITION"
                            name="position"
                            // Custom error handling
                            validateStatus={errors?.position ? "error" : ""}
                            help={errors?.position ? errors.position[0] : ""}
                        >
                            <Input
                                placeholder="Laborer Position"
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
                                validateStatus={errors?.cost ? "error" : ""}
                                help={errors?.cost ? errors?.cost[0] : ""}
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
                                {waterLabor ? "Update" : "Save"}
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
