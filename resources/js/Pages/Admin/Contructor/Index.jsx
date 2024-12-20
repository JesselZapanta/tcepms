import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
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
    const [sortOrder, setSortOrder] = useState("asc");

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
            const res = await axios.get(`/admin/contructor/getdata?${params}`);
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

    const [contructor, setContructor] = useState(false);
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

    const showEditModal = (contructor) => {
        setIsModalOpen(true);
        setContructor(contructor);

        form.setFieldsValue({
            company_name: contructor.company_name,
            description: contructor.description,
            contact: contructor.contact,
            website: contructor.website,
            address: contructor.address,
            status: contructor.status,
        });
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setContructor(false);
        form.resetFields();
        setErrors({});
        getData();
    };

    const handleSubmit = async (values) => {
        setProcessing(true);
        
        if(contructor){
            try {
                const res = await axios.put(
                    `/admin/contructor/update/${contructor.id}`,
                    values
                );
                if (res.data.status === "updated") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "The contructor has been updated successfully."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        }else{
            try {
                const res = await axios.post("/admin/contructor/store", values);
                if (res.data.status === "created") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The contructor has been created successfully."
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
            const res = await axios.delete(`/admin/contructor/destroy/${id}`);

            if (res.data.status === "deleted") {
                handleCancel();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The contructor has been deleted successfully."
                );
            }

        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    return (
        <AuthenticatedLayout header="Contructor Management" auth={auth}>
            <Head title="Contructor Management" />
            {contextHolder}
            <div className="py-2">List of Contructors</div>
            <div className="flex gap-2 mb-2">
                <Search
                    placeholder="Input name or email"
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
                    <Column sorter={true} title="ID" dataIndex="id" key="id" />

                    <Column
                        sorter={true}
                        title="Company Name"
                        dataIndex="company_name"
                        key="company_name"
                    />
                    <Column
                        // sorter={true}
                        title="Contact"
                        dataIndex="contact"
                        key="contact"
                    />
                    <Column
                        // sorter={true}
                        title="Address"
                        dataIndex="address"
                        key="address"
                    />
                    <Column
                        sorter={true}
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
                    contructor
                        ? "UPDATE CONTRUCTOR INFORMATION"
                        : "CONTRUCTOR INFORMATION"
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
                            label="COMPANY NAME"
                            name="company_name"
                            // Custom error handling
                            validateStatus={errors?.company_name ? "error" : ""}
                            help={
                                errors?.company_name
                                    ? errors.company_name[0]
                                    : ""
                            }
                        >
                            <Input
                                placeholder="Company Name"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            validateStatus={errors?.description ? "error" : ""}
                            help={
                                errors?.description
                                    ? errors?.description[0]
                                    : ""
                            }
                        >
                            <TextArea
                                placeholder="Company Description"
                                allowClear
                                rows={4}
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
                                prefix={<PhoneOutlined />}
                                className="w-full"
                            />
                        </Form.Item>

                        <Form.Item
                            label="WEBSITE"
                            name="website"
                            validateStatus={errors?.website ? "error" : ""}
                            help={errors?.website ? errors?.website[0] : ""}
                        >
                            <Input
                                placeholder="example.com"
                                addonBefore="https://"
                                type="website"

                                // prefix={<LockOutlined />}
                            />
                        </Form.Item>

                        <Form.Item
                            label="ADDRESS"
                            name="address"
                            validateStatus={errors?.address ? "error" : ""}
                            help={errors?.address ? errors?.address[0] : ""}
                        >
                            <Input prefix={<LockOutlined />} />
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
                                {contructor ? "Update" : "Create"}
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
}
