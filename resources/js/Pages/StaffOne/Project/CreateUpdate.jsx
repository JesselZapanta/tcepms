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
export default function CreateUpdate({
    project,
    contructors,
    engineers,
    categories,
    funds,
    handleCancel,
    errors,
    setErrors
}) {
    const [form] = Form.useForm();
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (project) {
            form.setFieldsValue({
                name: project.name,
                project_code: project.project_code,
                description: project.description,
                start_date: project.start_date
                    ? dayjs(project.start_date)
                    : null,
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
        } else {
            form.resetFields();
        }
    }, [project, form]);
    

    //for notif

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, placement, title, msg) => {
        api[type]({
            message: title,
            description: msg,
            placement: placement,
        });
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

    // Tracks the contractual status
    const [con, setCon] = useState(project.contractual ? project.contractual : 0);

    useEffect(() => {
        form.setFieldsValue({ status: con === 1 ? "Ongoing" : "Material" });
    }, [con]);

    return (
        <div>
            {contextHolder}

            <pre>{JSON.stringify(project, null, 2)}</pre>
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
                    <Divider orientation="left">Basic Project Details</Divider>
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
                        validateStatus={errors?.project_code ? "error" : ""}
                        help={
                            errors?.project_code ? errors.project_code[0] : ""
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
                        validateStatus={errors?.description ? "error" : ""}
                        help={errors?.description ? errors?.description[0] : ""}
                    >
                        <TextArea
                            placeholder="Project Description"
                            allowClear
                            rows={4}
                        />
                    </Form.Item>
                    <Divider orientation="left">Project Timeline</Divider>
                    <div className="flex md:flex-row flex-col gap-4">
                        <Form.Item
                            label="ESTIMATED START DATE"
                            name="start_date"
                            validateStatus={errors?.start_date ? "error" : ""}
                            help={
                                errors?.start_date ? errors?.start_date[0] : ""
                            }
                            className="w-full"
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                            label="ESTIMATED END DATE"
                            name="end_date"
                            validateStatus={errors?.end_date ? "error" : ""}
                            help={errors?.end_date ? errors?.end_date[0] : ""}
                            className="w-full"
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>
                    </div>

                    <Divider orientation="left">Financial Information</Divider>
                    <div className="flex md:flex-row flex-col gap-4">
                        <Form.Item
                            label="ESTIMATED BUDGET"
                            name="budget"
                            validateStatus={errors?.budget ? "error" : ""}
                            help={errors?.budget ? errors?.budget[0] : ""}
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
                            validatesource={errors?.source ? "error" : ""}
                            help={errors?.source ? errors?.source[0] : ""}
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

                    <Divider orientation="left">Location Information</Divider>

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

                    <Divider orientation="left">Other Information</Divider>

                    <div className="flex md:flex-row flex-col gap-4">
                        <Form.Item
                            label="ON-SITE ENGINEER"
                            name="engineer"
                            validateengineer={errors?.engineer ? "error" : ""}
                            help={errors?.engineer ? errors?.engineer[0] : ""}
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
                            validatepriority={errors?.priority ? "error" : ""}
                            help={errors?.priority ? errors?.priority[0] : ""}
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
                            validateStatus={errors?.category ? "error" : ""}
                            help={errors?.category ? errors?.category[0] : ""}
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
                            validateStatus={errors?.contractual ? "error" : ""}
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
                                    options={contructors.map((contructor) => ({
                                        label: contructor.company_name,
                                        value: contructor.id,
                                    }))}
                                    filterOption={(input, option) =>
                                        option.label
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
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
                                value={con === 1 ? "Ongoing" : "Material"} // Dynamically set value
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
        </div>
    );
}
