import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Button,
    DatePicker,
    Form,
    notification,
    Row,
    Select,
    Space,
    Table,
    Tag,
} from "antd";
import Search from "antd/es/input/Search";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
    ProjectOutlined,
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import axios from "axios";
import Column from "antd/es/table/Column";
import Details from "@/Pages/Partials/Details";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

export default function Index({ auth }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);

    const getData = async (isSearch = false) => {
        if (isSearch) {
            setSearching(true);
        }
        setLoading(true);

        const params = [`page=${page}`, `search=${search}`].join("&");

        try {
            const res = await axios.get(
                `/staffone/request-extension/getdata?${params}`
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
        setPage(pagination.current);
    };

    useEffect(() => {
        getData(false);
    }, [page]);

    const [request, setRequest] = useState(false);
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

    const showEditModal = (request) => {
        setIsModalOpen(true);
        setRequest(request);

        form.setFieldsValue({
            name: request.project.name,
            requested_by: request.requested_by,
            current_end_date: dayjs(request.current_end_date),
            requested_end_date: dayjs(request.requested_end_date),
            reason: request.reason,
            status: request.status,
            remarks: request.remarks,
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setRequest(false);
        form.resetFields();
        setErrors({});
        getData();
    };

    const handleSubmit = async (values) => {
        setProcessing(true);

        if (request) {
            try {
                const res = await axios.put(
                    `/staffone/request-extension/update/${request.id}`,
                    values
                );
                if (res.data.status === "updated") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "Updated successfully."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } 
    };

    const truncate = (word, limit) => {
        if (word.length > limit) {
            return word.slice(0, limit) + "...";
        }
        return word;
    };

    return (
        <AuthenticatedLayout header="Request Extension" auth={auth}>
            <Head title="Request Extension" />
            {/* {contextHolder} */}
            <div className="max-w-7xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    List of Request Extension
                </div>
                <div className="overflow-x-auto">
                    <Table
                        className="mt-2 custom-ant-table"
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
                        onChange={handleTableChange}
                    >
                        <Column
                            className="whitespace-nowrap bg-white"
                            //sorter={true}
                            title="ID"
                            dataIndex="id"
                            key="id"
                        />

                        <Column
                            className="whitespace-nowrap bg-white font-bold"
                            title="Project Name"
                            key="project.name"
                            render={(_, record) =>
                                truncate(record.project.name, 50)
                            }
                        />

                        <Column
                            className="whitespace-nowrap bg-white"
                            //sorter={true}
                            title="Request Reason"
                            dataIndex="reason"
                            key="reason"
                            render={(_, record) => truncate(record.reason, 50)}
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            title="Requested End Date"
                            dataIndex="requested_end_date"
                            key="requested_end_date"
                            render={(_, record) =>
                                dayjs(record.requested_end_date).format(
                                    "YYYY-MM-DD"
                                )
                            }
                        />

                        <Column
                            className="whitespace-nowrap bg-white"
                            title="Status"
                            dataIndex="status"
                            key="status"
                            render={(_, record) => {
                                if (record.status === 0) {
                                    return <Tag color="orange">Pending</Tag>;
                                } else if (record.status === 1) {
                                    return <Tag color="green">Approved</Tag>;
                                } else {
                                    return <Tag color="red">Rejected</Tag>;
                                }
                            }}
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
                                </Space>
                            )}
                        />
                    </Table>
                    <Modal
                        title={
                            request
                                ? "UPDATE REQUEST INFORMATION"
                                : "REQUEST INFORMATION"
                        }
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
                                <Form.Item label="PROJECT NAME" name="name">
                                    <Input
                                        disabled
                                        prefix={<ProjectOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="REQUESTED BY"
                                    name="requested_by"
                                >
                                    <Input
                                        disabled
                                        prefix={<ProjectOutlined />}
                                    />
                                </Form.Item>

                                <div className="flex gap-2">
                                    <Form.Item
                                        label="CURRENT END DATE"
                                        name="current_end_date"
                                        className="w-full"
                                    >
                                        <DatePicker
                                            disabled
                                            className="w-full"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="REQUESTED END DATE"
                                        name="requested_end_date"
                                        className="w-full"
                                        validateStatus={
                                            errors?.requested_end_date
                                                ? "error"
                                                : ""
                                        }
                                        help={
                                            errors?.requested_end_date
                                                ? errors?.requested_end_date[0]
                                                : ""
                                        }
                                    >
                                        <DatePicker
                                            disabled
                                            className="w-full"
                                        />
                                    </Form.Item>
                                </div>

                                <Form.Item
                                    label="REASON"
                                    name="reason"
                                    validateStatus={
                                        errors?.reason ? "error" : ""
                                    }
                                    help={
                                        errors?.reason ? errors?.reason[0] : ""
                                    }
                                >
                                    <TextArea
                                        disabled
                                        placeholder="Type the reason"
                                        allowClear
                                        rows={4}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="STATUS"
                                    name="status"
                                    validateStatus={
                                        errors?.status ? "error" : ""
                                    }
                                    help={
                                        errors?.status ? errors?.status[0] : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        options={[
                                            { value: 2, label: "Rejected" },
                                            { value: 1, label: "Approved" },
                                            { value: 0, label: "Pending" },
                                        ]}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="REMARKS"
                                    name="remarks"
                                    validateStatus={
                                        errors?.remarks ? "error" : ""
                                    }
                                    help={
                                        errors?.remarks
                                            ? errors?.remarks[0]
                                            : ""
                                    }
                                >
                                    <TextArea
                                        placeholder="Type the remarks"
                                        allowClear
                                        rows={4}
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Row justify="end">
                                <Space size="small">
                                    <Button
                                        type="default"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        disabled={processing}
                                        loading={processing}
                                    >
                                        Saved
                                    </Button>
                                </Space>
                            </Row>
                        </Form>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
