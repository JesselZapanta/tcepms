import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
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
    InputNumber,
    Tag,
} from "antd";
import Search from "antd/es/input/Search";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
    DatabaseOutlined,
    DollarOutlined,
    CompassOutlined,
    EnvironmentOutlined,
    UnorderedListOutlined,
    CodeOutlined,
    SignatureOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import Input from "antd/es/input/Input";
import axios from "axios";
import Column from "antd/es/table/Column";
import Dropdown from "antd/es/dropdown/dropdown";
import { useReactToPrint } from "react-to-print";
import DetailedReport from "@/Pages/Partials/DetailedReport";

export default function Index({
    auth,
    contructors,
    engineers,
    categories,
    funds,
}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

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
            `category=${category}`,
            `status=${status}`,
        ].join("&");

        try {
            const res = await axios.get(`/staffone/project/getdata?${params}`);
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
    }, [page, sortField, sortOrder, category, status]);

    const [project, setProject] = useState(false);
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

    const showEditModal = (project) => {
        setIsModalOpen(true);
        setProject(project);

        form.setFieldsValue({
            name: project.name,
            project_code: project.project_code,
            description: project.description,
            start_date: project.start_date ? dayjs(project.start_date) : null,
            end_date: project.end_date ? dayjs(project.end_date) : null,
            actual_start_date: project.actual_start_date
                ? dayjs(project.actual_start_date)
                : null,
            actual_end_date: project.actual_end_date
                ? dayjs(project.actual_end_date)
                : null,
            budget: project.budget,
            cost: project.cost,
            source: project.source,
            location: project.location,
            latitude: project.latitude,
            longitude: project.longitude,
            engineer: project.engineer,
            contructor: project.contructor?.id,
            category: project.category,
            status: project.status,
            contractual: project.contractual,
            priority: project.priority,
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setProject(false);
        form.resetFields();
        setErrors({});
        getData();
    };

    const handleSubmit = async (values) => {
        setProcessing(true);

        if (project) {
            try {
                const res = await axios.put(
                    `/staffone/project/update/${project.id}`,
                    values
                );
                if (res.data.status === "updated") {
                    const project = res.data.project;

                    if (project.contractual === 0) {
                        router.visit(`/staffone/materials/index/${project.id}`);
                        // console.log(project);
                    }

                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Updated!",
                        "The project has been updated successfully."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.post("/staffone/project/store", values);
                if (res.data.status === "created") {
                    const project = res.data.project;

                    if (project.contractual === 0) {
                        router.visit(`/staffone/materials/index/${project.id}`);
                        // console.log(project);
                    }

                    handleCancel(); // Close the modal
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The project has been created successfully."
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
            const res = await axios.delete(`/staffone/project/destroy/${id}`);

            if (res.data.status === "deleted") {
                handleCancel();
                openNotification(
                    "success",
                    "bottomRight",
                    "Deleted!",
                    "The project has been deleted successfully."
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    // Tracks the contractual status
    const [con, setCon] = useState(
        project.contractual ? project.contractual : 0
    );

    useEffect(() => {
        form.setFieldsValue({ status: con === 1 ? "Ongoing" : "Material" });
    }, [con]);

    const truncate = (text, limit) => {
        if (text.length > limit) {
            return text.slice(0, limit) + "...";
        }

        return text;
    };

    //print report
    const componentRef = useRef();
    const [reportData, setReportData] = useState(null); // set to null for better condition handling
    const [shouldPrint, setShouldPrint] = useState(false);

    const handlePrint = async (id) => {
        try {
            const res = await axios.get(`/staffone/project/get-report/${id}`);

            if (res.status === 200) {
                setReportData(res.data.data);
                setShouldPrint(true); // mark that we should print after data is set
            }
        } catch (err) {
            console.error(err);
        }
    };

    const triggerPrint = useReactToPrint({
        documentTitle: "Project Detailed Report",
        content: () => componentRef.current,
    });

    useEffect(() => {
        if (shouldPrint && reportData) {
            triggerPrint();
            setShouldPrint(false); // reset the flag
        }
    }, [reportData, shouldPrint]);

    return (
        <AuthenticatedLayout header="Project Management" auth={auth}>
            <Head title="Project Management" />
            {contextHolder}
            <div className="max-w-7xl p-4 mt-4 rounded bg-white mx-auto">
                <div className="py-2 text-lg font-bold uppercase">
                    List of Project
                </div>
                <div className="flex mt-2 md:flex-row flex-col gap-2 mb-2">
                    <Search
                        placeholder="Input project name"
                        allowClear
                        enterButton="Search"
                        loading={searching}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={() => getData(true)}
                    />
                    <div className="flex gap-2 items-center justify-between">
                        <Select
                            defaultValue="All"
                            className="w-full md:w-40"
                            showSearch
                            onChange={(value) => setStatus(value)}
                        >
                            <Select.Option value="">All</Select.Option>
                            <Select.Option value="Material">
                                Pending Material
                            </Select.Option>
                            <Select.Option value="Labor">
                                Pending Labor
                            </Select.Option>
                            <Select.Option value="Ongoing">
                                Ongoing
                            </Select.Option>
                            <Select.Option value="Completed">
                                Completed
                            </Select.Option>
                        </Select>
                        <Select
                            defaultValue="All Categories"
                            className="w-40"
                            showSearch
                            onChange={(value) => setCategory(value)}
                        >
                            <Option value="">All</Option>
                            {categories.map((category) => (
                                <Option key={category.id} value={category.name}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                        <Button
                            type="primary"
                            onClick={showCreateModal}
                            icon={<PlusOutlined />}
                        >
                            New
                        </Button>
                    </div>
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
                            className="whitespace-nowrap bg-green"
                            //sorter={true}
                            title="CODE"
                            dataIndex="project_code"
                            key="project_code"
                        />
                        <Column
                            className="whitespace-nowrap bg-white font-bold"
                            //sorter={true}
                            title="Project Name"
                            dataIndex="name"
                            key="name"
                            render={(name) => truncate(name, 50)}
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            //sorter={true}
                            title="Engineer"
                            dataIndex="site_engineer"
                            key="site_engineer"
                            render={(site_engineer) =>
                                site_engineer?.name || "N/A"
                            }
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            title="Status"
                            dataIndex="status"
                            key="status"
                            render={(_, record) =>
                                record.status === "Material" ? (
                                    <Tag color="orange">Pending Materials</Tag>
                                ) : record.status === "Labor" ? (
                                    <Tag color="purple">Pending Labor</Tag>
                                ) : record.status === "Ongoing" ? (
                                    <Tag color="blue">Ongoing</Tag>
                                ) : record.status === "Completed" ? (
                                    <Tag color="green">Completed</Tag>
                                ) : (
                                    <Tag color="gray">Unknown</Tag>
                                )
                            }
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            title="Contractual"
                            dataIndex="contractual"
                            key="contractual"
                            render={(_, record) =>
                                record.contractual === 0 ? (
                                    <Tag color="orange">No</Tag>
                                ) : record.contractual === 1 ? (
                                    <Tag color="purple">Yes</Tag>
                                ) : (
                                    <Tag color="gray">Unknown</Tag>
                                )
                            }
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            title="Priority"
                            dataIndex="priority"
                            key="priority"
                            render={(priority) =>
                                priority === "High" ? (
                                    <Tag color="red">High</Tag>
                                ) : priority === "Medium" ? (
                                    <Tag color="orange">Medium</Tag>
                                ) : priority === "Low" ? (
                                    <Tag color="green">Low</Tag>
                                ) : (
                                    <Tag color="gray">Unknown</Tag>
                                )
                            }
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            title="Action"
                            key="action"
                            render={(_, record) => (
                                <Space>
                                    <div>
                                        <Dropdown.Button
                                            type="primary"
                                            placement="bottomRight"
                                            menu={{
                                                items: [
                                                    {
                                                        key: "1",
                                                        label: "Edit Project",
                                                        icon: (
                                                            <SignatureOutlined
                                                                size={16}
                                                            />
                                                        ),
                                                        onClick: () =>
                                                            showEditModal(
                                                                record
                                                            ),
                                                    },
                                                    {
                                                        key: "2",
                                                        label: "Project Material",
                                                        icon: (
                                                            <UnorderedListOutlined
                                                                size={16}
                                                            />
                                                        ),
                                                        onClick: () => {
                                                            router.visit(
                                                                route(
                                                                    "staffone.material",
                                                                    record.id
                                                                )
                                                            );
                                                        },
                                                    },
                                                    {
                                                        key: "3",
                                                        label: "Generate Detailed Report",
                                                        icon: (
                                                            <FileTextOutlined
                                                                size={16}
                                                            />
                                                        ),
                                                        onClick: () => {
                                                            handlePrint(
                                                                record.id
                                                            );
                                                        },
                                                    },
                                                    {
                                                        key: "4",
                                                        label: "Delete Project",
                                                        icon: (
                                                            <DeleteOutlined
                                                                size={16}
                                                            />
                                                        ),
                                                        onClick: () => {
                                                            Modal.confirm({
                                                                title: "Delete?",
                                                                icon: (
                                                                    <QuestionCircleOutlined />
                                                                ),
                                                                content:
                                                                    "Are you sure you want to delete this data?",
                                                                okText: "Yes",
                                                                cancelText:
                                                                    "No",
                                                                onOk() {
                                                                    handleDelete(
                                                                        record.id
                                                                    );
                                                                },
                                                            });
                                                        },
                                                    },
                                                ],
                                            }}
                                            trigger={["click"]}
                                        >
                                            Action
                                        </Dropdown.Button>
                                    </div>
                                </Space>
                            )}
                        />
                    </Table>
                </div>

                <div ref={componentRef}>
                    <div className="print-container mx-auto bg-white">
                        {reportData && (
                            <DetailedReport
                                data={reportData.project}
                                signatories={reportData.signatories}
                            />
                        )}
                    </div>
                </div>

                <Modal
                    title={
                        project
                            ? "UPDATE PROJECT INFORMATION"
                            : "PROJECT INFORMATION"
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
                        initialValues={{
                            contractual: 0,
                            status: "Material",
                        }}
                    >
                        <Form.Item>
                            <Divider orientation="left">
                                Basic Project Details
                            </Divider>
                            <Form.Item
                                label="PROJECT NAME"
                                name="name"
                                // Custom error handling
                                validateStatus={errors?.name ? "error" : ""}
                                help={errors?.name ? errors.name[0] : ""}
                            >
                                <Input
                                    placeholder="Name"
                                    prefix={<DatabaseOutlined />}
                                />
                            </Form.Item>
                            <Form.Item
                                label="PROJECT CODE"
                                name="project_code"
                                // Custom error handling
                                validateStatus={
                                    errors?.project_code ? "error" : ""
                                }
                                help={
                                    errors?.project_code
                                        ? errors.project_code[0]
                                        : ""
                                }
                            >
                                <Input
                                    placeholder="Project Code"
                                    prefix={<CodeOutlined />}
                                />
                            </Form.Item>
                            <Form.Item
                                label="DESCRIPTION/OBJECTIVES"
                                name="description"
                                validateStatus={
                                    errors?.description ? "error" : ""
                                }
                                help={
                                    errors?.description
                                        ? errors?.description[0]
                                        : ""
                                }
                            >
                                <TextArea
                                    placeholder="Project Description"
                                    allowClear
                                    rows={4}
                                />
                            </Form.Item>
                            <Divider orientation="left">
                                Project Timeline
                            </Divider>
                            <div className="flex md:flex-row flex-col gap-4">
                                <Form.Item
                                    label="ESTIMATED START DATE"
                                    name="start_date"
                                    validateStatus={
                                        errors?.start_date ? "error" : ""
                                    }
                                    help={
                                        errors?.start_date
                                            ? errors?.start_date[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <DatePicker className="w-full" />
                                </Form.Item>

                                <Form.Item
                                    label="ESTIMATED END DATE"
                                    name="end_date"
                                    validateStatus={
                                        errors?.end_date ? "error" : ""
                                    }
                                    help={
                                        errors?.end_date
                                            ? errors?.end_date[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <DatePicker className="w-full" />
                                </Form.Item>
                            </div>

                            <Divider orientation="left">
                                Financial Information
                            </Divider>
                            <div className="flex md:flex-row flex-col gap-4">
                                <Form.Item
                                    label="ESTIMATED BUDGET"
                                    name="budget"
                                    validateStatus={
                                        errors?.budget ? "error" : ""
                                    }
                                    help={
                                        errors?.budget ? errors?.budget[0] : ""
                                    }
                                    className="w-full"
                                >
                                    {/* <Input
                                        type="number"
                                        prefix={<DollarOutlined />}
                                        className="w-full"
                                    /> */}
                                    <InputNumber
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        parser={(value) =>
                                            value.replace(/\$\s?|(,*)/g, "")
                                        }
                                        prefix={<DollarOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="ACTUAL COST"
                                    name="cost"
                                    validateStatus={errors?.cost ? "error" : ""}
                                    help={errors?.cost ? errors?.cost[0] : ""}
                                    className="w-full"
                                >
                                    <Input
                                        type="number"
                                        disabled
                                        prefix={<DollarOutlined />}
                                        className="w-full"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="FUND SOURCE"
                                    name="source"
                                    validatesource={
                                        errors?.source ? "error" : ""
                                    }
                                    help={
                                        errors?.source ? errors?.source[0] : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        showSearch
                                        options={funds.map((fund) => ({
                                            label: fund.name,
                                            value: fund.name,
                                        }))}
                                    />
                                </Form.Item>
                            </div>

                            <Divider orientation="left">
                                Location Information
                            </Divider>

                            <Form.Item
                                label="PROJECT LOCATION"
                                name="location"
                                // Custom error handling
                                validateStatus={errors?.location ? "error" : ""}
                                help={
                                    errors?.location ? errors.location[0] : ""
                                }
                            >
                                <Input
                                    placeholder="Location"
                                    prefix={<EnvironmentOutlined />}
                                />
                            </Form.Item>

                            <Divider orientation="left">
                                Other Information
                            </Divider>

                            <div className="flex md:flex-row flex-col gap-4">
                                <Form.Item
                                    label="ON-SITE ENGINEER"
                                    name="engineer"
                                    validateengineer={
                                        errors?.engineer ? "error" : ""
                                    }
                                    help={
                                        errors?.engineer
                                            ? errors?.engineer[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        showSearch
                                        options={engineers.map((engineer) => ({
                                            label: engineer.name,
                                            value: engineer.id,
                                        }))}
                                        filterOption={(input, option) =>
                                            option.label
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="PRIORITY"
                                    name="priority"
                                    validatepriority={
                                        errors?.priority ? "error" : ""
                                    }
                                    help={
                                        errors?.priority
                                            ? errors?.priority[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        options={[
                                            { value: "High", label: "High" },
                                            {
                                                value: "Medium",
                                                label: "Medium",
                                            },
                                            { value: "Low", label: "Low" },
                                        ]}
                                    />
                                </Form.Item>
                            </div>

                            <div className="flex md:flex-row flex-col gap-4">
                                <Form.Item
                                    label="CATEGORY"
                                    name="category"
                                    validateStatus={
                                        errors?.category ? "error" : ""
                                    }
                                    help={
                                        errors?.category
                                            ? errors?.category[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        showSearch
                                        options={categories.map((category) => ({
                                            label: category.name,
                                            value: category.name,
                                        }))}
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex md:flex-row flex-col gap-4">
                                {/* Contractual Dropdown */}
                                <Form.Item
                                    label="CONTRACTUAL"
                                    name="contractual"
                                    validateStatus={
                                        errors?.contractual ? "error" : ""
                                    }
                                    help={
                                        errors?.contractual
                                            ? errors?.contractual[0]
                                            : ""
                                    }
                                    className="w-full"
                                >
                                    <Select
                                        value={con}
                                        onChange={(value) => setCon(value)}
                                        options={[
                                            { value: 0, label: "No" },
                                            { value: 1, label: "Yes" },
                                        ]}
                                    />
                                </Form.Item>

                                {con === 1 && (
                                    <Form.Item
                                        label="CONTRUCTOR"
                                        name="contructor"
                                        validatecontructor={
                                            errors?.contructor ? "error" : ""
                                        }
                                        help={
                                            errors?.contructor
                                                ? errors?.contructor[0]
                                                : ""
                                        }
                                        className="w-full"
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Select constructor"
                                            options={contructors.map(
                                                (contructor) => ({
                                                    label: contructor.company_name,
                                                    value: contructor.id,
                                                })
                                            )}
                                            filterOption={(input, option) =>
                                                option.label
                                                    .toLowerCase()
                                                    .includes(
                                                        input.toLowerCase()
                                                    )
                                            }
                                        />
                                    </Form.Item>
                                )}

                                {/* Status Dropdown */}
                                <Form.Item
                                    label="STATUS"
                                    name="status"
                                    className="w-full"
                                >
                                    <Select
                                        disabled
                                        value={
                                            con === 1 ? "Ongoing" : "Material"
                                        } // Dynamically set value
                                        options={[
                                            {
                                                value: "Material",
                                                label: "Pending Materials",
                                            },
                                            {
                                                value: "Ongoing",
                                                label: "Ongoing",
                                            },
                                        ]}
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
                                    {project ? "Update" : "Create"}
                                </Button>
                            </Space>
                        </Row>
                    </Form>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
