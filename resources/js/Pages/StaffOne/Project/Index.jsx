import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
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
    Slider,
    Col,
    InputNumber,
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
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import axios from "axios";
import Column from "antd/es/table/Column";

export default function Index({ auth, contructors, engineers }) {
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
    }, [page, sortField, sortOrder]);

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
            contructor: project.contructor,
            category: project.category,
            status: project.status,
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
                    handleCancel();
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

    // console.log(data);

    // const [phases, setPhases] = useState({
    //     phase1: 20,
    //     phase2: 20,
    //     phase3: 20,
    //     phase4: 20,
    //     phase5: 20,
    // });

    // const sliderTotal = Object.values(phases).reduce((sum, val) => sum + val, 0);
    // const remaining = 100 - sliderTotal;

    // const handleChange = (value, phaseKey) => {
    //     setPhases((prevPhases) => ({
    //         ...prevPhases,
    //         [phaseKey]: value,
    //     }));
    // };
    return (
        <AuthenticatedLayout header="Project Management" auth={auth}>
            <Head title="Project Management" />
            {contextHolder}
            <div className="py-2">List of Project</div>
            <div className="flex gap-2 mb-2">
                <Search
                    placeholder="Input project name"
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
                        title="Project Name"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        sorter={true}
                        title="Engineer"
                        dataIndex="site_engineer"
                        key="site_engineer"
                        render={(site_engineer) => site_engineer?.name || "N/A"}
                    />
                    <Column
                        // sorter={true}
                        title="Status"
                        dataIndex="status"
                        key="status"
                    />
                    <Column
                        // sorter={true}
                        title="Priority"
                        dataIndex="priority"
                        key="priority"
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
                                <Link
                                    href={route("staffone.material", record.id)}
                                >
                                    <Button
                                        type="default"
                                        shape="circle"
                                        icon={<UnorderedListOutlined />}
                                    />
                                </Link>
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
                            label="DESCRIPTION"
                            name="description"
                            validateStatus={errors?.description ? "error" : ""}
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
                        <Divider orientation="left">Project Timeline</Divider>
                        <div className="flex gap-4">
                            <Form.Item
                                label="START DATE"
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
                                label="END DATE"
                                name="end_date"
                                validateStatus={errors?.end_date ? "error" : ""}
                                help={
                                    errors?.end_date ? errors?.end_date[0] : ""
                                }
                                className="w-full"
                            >
                                <DatePicker className="w-full" />
                            </Form.Item>
                        </div>
                        <div className="flex gap-4">
                            <Form.Item
                                label="ACTUAL START DATE"
                                name="actual_start_date"
                                validateStatus={
                                    errors?.actual_start_date ? "error" : ""
                                }
                                help={
                                    errors?.actual_start_date
                                        ? errors?.actual_start_date[0]
                                        : ""
                                }
                                className="w-full"
                            >
                                <DatePicker className="w-full" />
                            </Form.Item>
                            <Form.Item
                                label="ACTUAL END DATE"
                                name="actual_end_date"
                                validateStatus={
                                    errors?.actual_end_date ? "error" : ""
                                }
                                help={
                                    errors?.actual_end_date
                                        ? errors?.actual_end_date[0]
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

                        <div className="flex gap-4">
                            <Form.Item
                                label="ESTIMATED BUDGET"
                                name="budget"
                                validateStatus={errors?.budget ? "error" : ""}
                                help={errors?.budget ? errors?.budget[0] : ""}
                                className="w-full"
                            >
                                <Input
                                    type="number"
                                    prefix={<DollarOutlined />}
                                    className="w-full"
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
                                validatesource={errors?.source ? "error" : ""}
                                help={errors?.source ? errors?.source[0] : ""}
                                className="w-full"
                            >
                                <Select
                                    options={[
                                        {
                                            value: "Government",
                                            label: "Government",
                                        },
                                        { value: "Private", label: "Private" },
                                    ]}
                                    className="w-full"
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
                            help={errors?.location ? errors.location[0] : ""}
                        >
                            <Input
                                placeholder="Location"
                                prefix={<EnvironmentOutlined />}
                            />
                        </Form.Item>

                        <div className="flex gap-4">
                            <Form.Item
                                label="LATITUDE (OPTIONAL)"
                                name="latitude"
                                validateStatus={errors?.latitude ? "error" : ""}
                                help={
                                    errors?.latitude ? errors?.latitude[0] : ""
                                }
                                className="w-full"
                            >
                                <Input
                                    type="number"
                                    prefix={<CompassOutlined />}
                                    className="w-full"
                                />
                            </Form.Item>
                            <Form.Item
                                label="LONGITUDE (OPTIONAL)"
                                name="longitude"
                                validateStatus={
                                    errors?.longitude ? "error" : ""
                                }
                                help={
                                    errors?.longitude
                                        ? errors?.longitude[0]
                                        : ""
                                }
                                className="w-full"
                            >
                                <Input
                                    type="number"
                                    prefix={<CompassOutlined />}
                                    className="w-full"
                                />
                            </Form.Item>
                        </div>

                        <Divider orientation="left">Other Information</Divider>

                        <div className="flex gap-4">
                            <Form.Item
                                label="ON-SITE ENGINEER"
                                name="engineer"
                                validateengineer={
                                    errors?.engineer ? "error" : ""
                                }
                                help={
                                    errors?.engineer ? errors?.engineer[0] : ""
                                }
                                className="w-full"
                            >
                                <Select
                                    options={engineers.map((engineer) => ({
                                        label: engineer.name,
                                        value: engineer.id,
                                    }))}
                                />
                            </Form.Item>

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
                                    options={contructors.map((contructor) => ({
                                        label: contructor.company_name,
                                        value: contructor.id,
                                    }))}
                                />
                            </Form.Item>
                        </div>

                        <div className="flex gap-4">
                            <Form.Item
                                label="CATEGORY"
                                name="category"
                                validateStatus={errors?.category ? "error" : ""}
                                help={
                                    errors?.category ? errors?.category[0] : ""
                                }
                                className="w-full"
                            >
                                <Select
                                    options={[
                                        {
                                            value: "Roadwork",
                                            label: "Roadwork",
                                        },
                                        {
                                            value: "Building",
                                            label: "Building",
                                        },
                                        {
                                            value: "Waterworks",
                                            label: "Waterworks",
                                        },
                                    ]}
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
                                        {
                                            value: "Pending",
                                            label: "Pending Materials",
                                        },
                                        { value: "Ongoing", label: "Ongoing" },
                                        {
                                            value: "Completed",
                                            label: "Completed",
                                        },
                                        { value: "Hold", label: "On Hold" },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item
                                label="PRIORITY"
                                name="priority"
                                validatepriority={
                                    errors?.priority ? "error" : ""
                                }
                                help={
                                    errors?.priority ? errors?.priority[0] : ""
                                }
                                className="w-full"
                            >
                                <Select
                                    options={[
                                        { value: "High", label: "High" },
                                        { value: "Medium", label: "Medium" },
                                        { value: "Low", label: "Low" },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </Form.Item>
{/* 
                    <div className="w-full">
                        <div>
                            <h2>Project Phases</h2>
                            <div style={{ marginBottom: 16 }}>
                                <span>Phase 1: </span>
                                <Slider
                                    value={phases.phase1}
                                    onChange={(val) =>
                                        handleChange(val, "phase1")
                                    }
                                    min={0}
                                    max={phases.phase1 + remaining}
                                    step={1}
                                />
                                <InputNumber
                                    value={phases.phase1}
                                    onChange={(val) =>
                                        handleChange(val, "phase1")
                                    }
                                    min={0}
                                    max={phases.phase1 + remaining}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <span>Phase 2: </span>
                                <Slider
                                    value={phases.phase2}
                                    onChange={(val) =>
                                        handleChange(val, "phase2")
                                    }
                                    min={0}
                                    max={phases.phase2 + remaining}
                                    step={1}
                                />
                                <InputNumber
                                    value={phases.phase2}
                                    onChange={(val) =>
                                        handleChange(val, "phase2")
                                    }
                                    min={0}
                                    max={phases.phase2 + remaining}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <span>Phase 3: </span>
                                <Slider
                                    value={phases.phase3}
                                    onChange={(val) =>
                                        handleChange(val, "phase3")
                                    }
                                    min={0}
                                    max={phases.phase3 + remaining}
                                    step={1}
                                />
                                <InputNumber
                                    value={phases.phase3}
                                    onChange={(val) =>
                                        handleChange(val, "phase3")
                                    }
                                    min={0}
                                    max={phases.phase3 + remaining}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <span>Phase 4: </span>
                                <Slider
                                    value={phases.phase4}
                                    onChange={(val) =>
                                        handleChange(val, "phase4")
                                    }
                                    min={0}
                                    max={phases.phase4 + remaining}
                                    step={1}
                                />
                                <InputNumber
                                    value={phases.phase4}
                                    onChange={(val) =>
                                        handleChange(val, "phase4")
                                    }
                                    min={0}
                                    max={phases.phase4 + remaining}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <span>Phase 5: </span>
                                <Slider
                                    value={phases.phase5}
                                    onChange={(val) =>
                                        handleChange(val, "phase5")
                                    }
                                    min={0}
                                    max={phases.phase5 + remaining}
                                    step={1}
                                />
                                <InputNumber
                                    value={phases.phase5}
                                    onChange={(val) =>
                                        handleChange(val, "phase5")
                                    }
                                    min={0}
                                    max={phases.phase5 + remaining}
                                />
                            </div>
                            <div style={{ marginTop: 16, fontWeight: "bold" }}>
                                <span>Total: {sliderTotal}%</span>
                                <br />
                                <span>
                                    Remaining: {remaining >= 0 ? remaining : 0}%
                                </span>
                            </div>
                        </div>
                    </div> */}

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
        </AuthenticatedLayout>
    );
}
