import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Button,
    Form,
    InputNumber,
    notification,
    Row,
    Select,
    Space,
    Table,
    Tag,
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
import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import axios from "axios";
import Column from "antd/es/table/Column";

export default function Index({ auth }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const getData = async (isSearch = false) => {
        if (isSearch) {
            setSearching(true);
        }
        setLoading(true);

        const params = [
            `page=${page}`,
            `search=${search}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
        ].join("&");

        try {
            const res = await axios.get(`/admin/user/getdata?${params}`);
            setData(res.data.data);
            setTotal(res.data.total);
        } catch {
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

    const [user, setUser] = useState(false);
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

    const showEditModal = (user) => {
        setIsModalOpen(true);
        setUser(user);

        form.setFieldsValue({
            name: user.name,
            email: user.email,
            contact: user.contact,
            role: user.role,
            status: user.status,
            password: "",
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setUser(false);
        form.resetFields();
        setErrors({});
        getData();
    };

    const handleSubmit = async (values) => {
        setProcessing(true);

        if (user) {
            try {
                const res = await axios.put(
                    `/admin/user/update/${user.id}`,
                    values
                );
                if (res.data.status === "updated") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "The user has been updated successfully."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.post("/admin/user/store", values);
                if (res.data.status === "created") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The user has been created successfully."
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
            const res = await axios.delete(`/admin/user/destroy/${id}`);

            if (res.data.status === "deleted") {
                handleCancel();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The user has been deleted successfully."
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const roleLabels = {
        0: "Admin",
        1: "Staff 1",
        2: "Staff 2",
        3: "On-site Engineer",
        4: "Mayor",
    };

    return (
        <AuthenticatedLayout header="User Management" auth={auth}>
            <Head title="User Management" />
            {contextHolder}
            <div className="max-w-5xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    List of Users
                </div>
                <div className="flex my-2 md:flex-row flex-col gap-2">
                    <Search
                        placeholder="Input name or email"
                        allowClear
                        enterButton="Search"
                        loading={searching}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={() => getData(true)}
                    />
                    <Button
                        // className="custom-ant-btn"
                        type="primary"
                        onClick={showCreateModal}
                        icon={<PlusOutlined />}
                    >
                        New
                    </Button>
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
                            //sorter={true}
                            title="Name"
                            dataIndex="name"
                            key="name"
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            //sorter={true}
                            title="Role"
                            dataIndex="role"
                            key="role"
                            render={(role) => roleLabels[role] || "Unknown"}
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            //sorter={true}
                            title="Email"
                            dataIndex="email"
                            key="email"
                        />
                        {/* <Column
                            className="whitespace-nowrap bg-white"
                            title="Contact"
                            dataIndex="contact"
                            key="contact"
                            render={(contact) => {
                                const formatted = contact.replace(
                                    /(\d{3})(\d{3})(\d{4})/,
                                    "$1 $2 $3"
                                );
                                return `+63 ${formatted}`;
                            }}
                        /> */}

                        <Column
                            className="whitespace-nowrap bg-white"
                            //sorter={true}
                            title="Status"
                            dataIndex="status"
                            key="status"
                            render={(_, record) =>
                                record.status === 0 ? (
                                    <Tag color="yellow">Inactive</Tag>
                                ) : (
                                    <Tag color="green">Active</Tag>
                                )
                            }
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
                                                icon: (
                                                    <QuestionCircleOutlined />
                                                ),
                                                content:
                                                    "Are you sure you want to delete this data?",
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
                        user ? "UPDATE USER INFORMATION" : "USER INFORMATION"
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
                            <Form.Item
                                label="NAME"
                                name="name"
                                // Custom error handling
                                validateStatus={errors?.name ? "error" : ""}
                                help={errors?.name ? errors.name[0] : ""}
                            >
                                <Input
                                    placeholder="Name"
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>
                            <Form.Item
                                label="EMAIL"
                                name="email"
                                validateStatus={errors?.email ? "error" : ""}
                                help={errors?.email ? errors?.email[0] : ""}
                            >
                                <Input
                                    placeholder="Email"
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="CONTACT"
                                name="contact"
                                validateStatus={errors?.contact ? "error" : ""}
                                help={errors?.contact ? errors?.contact[0] : ""}
                            >
                                <Input
                                    placeholder="Contact"
                                    type="number"
                                    addonBefore="+63"
                                    prefix={<PhoneOutlined />}
                                    className="w-full"
                                />
                            </Form.Item>

                            <div className="flex gap-4">
                                <Form.Item
                                    label="ROLE"
                                    name="role"
                                    validateStatus={errors?.role ? "error" : ""}
                                    help={errors?.role ? errors?.role[0] : ""}
                                    className="w-full"
                                >
                                    <Select
                                        options={[
                                            { value: 0, label: "Admin" },
                                            { value: 1, label: "Staff 1" },
                                            { value: 2, label: "Staff 2" },
                                            {
                                                value: 3,
                                                label: "On-Site Engineer",
                                            },
                                            { value: 4, label: "Mayor" },
                                        ]}
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
                                            { value: 1, label: "Active" },
                                            { value: 0, label: "Inactive" },
                                        ]}
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="PASSWORD"
                                name="password"
                                validateStatus={errors?.password ? "error" : ""}
                                help={
                                    errors?.password ? errors?.password[0] : ""
                                }
                            >
                                <Input.Password
                                    placeholder="Password"
                                    type="password"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="RE-TYPE PASSWORD"
                                name="password_confirmation"
                                validateStatus={
                                    errors?.password_confirmation ? "error" : ""
                                }
                                help={
                                    errors?.password_confirmation
                                        ? errors?.password_confirmation[0]
                                        : ""
                                }
                            >
                                <Input.Password
                                    placeholder="Re-type Password"
                                    type="password"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>
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
                                    {user ? "Update" : "Create"}
                                </Button>
                            </Space>
                        </Row>
                    </Form>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
