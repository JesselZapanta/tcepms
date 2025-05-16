import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Form, InputNumber, notification, Row, Select, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import {
    PhoneOutlined ,
    LockOutlined,
    MailOutlined,
    PlusOutlined,
    UserOutlined,
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
    UnorderedListOutlined,
    TagOutlined,
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import axios from "axios";
import Column from "antd/es/table/Column";
import TextArea from "antd/es/input/TextArea";

export default function Index({auth}) {
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
            const res = await axios.get(`/admin/fund/getdata?${params}`);
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

    const [fund, setFund] = useState(false);
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

    const showEditModal = (fund) => {
        setIsModalOpen(true);
        setFund(fund);

        form.setFieldsValue({
            name: fund.name,
            status: fund.status,
        });
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setFund(false);
        form.resetFields();
        setErrors({});
        getData();
    };

    const handleSubmit = async (values) => {
        setProcessing(true);
        
        if(fund){
            try {
                const res = await axios.put(
                    `/admin/fund/update/${fund.id}`,
                    values
                );
                if (res.data.status === "updated") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "The fund has been updated successfully."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        }else{
            try {
                const res = await axios.post("/admin/fund/store", values);
                if (res.data.status === "created") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The fund has been created successfully."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        }
    };

    const handleDelete = async(id) => {
        setLoading(true);
        
        try{
            const res = await axios.delete(`/admin/fund/destroy/${id}`);

            if (res.data.status === "deleted") {
                handleCancel();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The fund has been deleted successfully."
                );
            }

        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    return (
        <AuthenticatedLayout header="Fund Management" auth={auth}>
            <Head title="Fund Management" />
            {contextHolder}
            <div className="max-w-5xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    List of Funds Source
                </div>
                <div className="flex md:flex-row flex-col gap-2 mb-2">
                    <Search
                        placeholder="Input funds source"
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
                            title="Fund Name"
                            dataIndex="name"
                            key="name"
                        />
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
                        fund
                            ? "UPDATE FUND SOURCE INFORMATION"
                            : "FUND SOURCE INFORMATION"
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
                                label="FUND SOURCE"
                                name="name"
                                // Custom error handling
                                validateStatus={errors?.name ? "error" : ""}
                                help={errors?.name ? errors.name[0] : ""}
                            >
                                <Input
                                    placeholder="Fund Source name"
                                    prefix={<TagOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="STATUS"
                                name="status"
                                validateStatus={errors?.status ? "error" : ""}
                                help={errors?.status ? errors?.status[0] : ""}
                                className="w-full"
                            >
                                <Select
                                    options={[
                                        { value: 1, label: "Active" },
                                        { value: 0, label: "Inactive" },
                                    ]}
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
                                    {fund ? "Update" : "Create"}
                                </Button>
                            </Space>
                        </Row>
                    </Form>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
