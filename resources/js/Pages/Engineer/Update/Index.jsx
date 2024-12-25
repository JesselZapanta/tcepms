import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    Flex,
    Progress,
    Tooltip,
    Button,
    Modal,
    Timeline,
    Form,
    Upload,
    Input,
    Row,
    Space,
    Slider,
    message,
    Spin,
    Empty,
    Avatar,
    Divider,
    Typography,
    notification,
} from "antd";

import {
    DatabaseOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import Details from "./Details";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
const { Text } = Typography;
import axios from "axios";

export default function Index({ auth, currentProject }) {
    const [latestUpdate, setLatestUpdate] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/engineer/project-update/gedData/${currentProject.id}`
            );
            setData(res.data.projectDetails);
            setLatestUpdate(res.data.latestUpdate);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    // console.log(latestUpdate);
    
    //modals and forms
    const [project, setProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, placement, title, msg) => {
        api[type]({
            message: title,
            description: msg,
            placement: placement,
        });
    };


    const showCreateModal = () => {
        setProject(null);
        setIsModalOpen(true);
        form.setFieldsValue({
            name: "",
            description: "",
            excavation_progress: latestUpdate ? latestUpdate?.excavation_progress : 0,
            concrete_works_progress: latestUpdate ? latestUpdate?.concrete_works_progress : 0,
            water_works_progress: latestUpdate ? latestUpdate?.water_works_progress : 0,
            metal_works_progress: latestUpdate ? latestUpdate?.metal_works_progress : 0,
            cement_plaster_and_finishes_progress: latestUpdate ? latestUpdate?.cement_plaster_and_finishes_progress : 0,
        });
    };

    const showEditModal = (project) => {
        const project_images = project.images
            ? project.images.map((image) => ({
                  uid: image.id.toString(),
                  name: image.file_path,
                  url: `/storage/project_images/${image.file_path}`,
              }))
            : [];

        setIsModalOpen(true);
        setProject(project);

        console.log(project);

        form.setFieldsValue({
            name: project.name,
            description: project.description,
            excavation_progress: project.excavation_progress || 0,
            concrete_works_progress: project.concrete_works_progress || 0,
            water_works_progress: project.water_works_progress || 0,
            metal_works_progress: project.metal_works_progress || 0,
            cement_plaster_and_finishes_progress:
                project.cement_plaster_and_finishes_progress || 0,
            project_images: project_images,
        });
    };


    const handleSubmit = async (values) => {
        setProcessing(true);

        if (!project) {
            values.project = currentProject.id;
            try {
                // console.log(values);
                const res = await axios.post(
                    "/engineer/project-update/store",
                    values
                );

                if (res.data.status === "created") {
                    handleCancel();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The project update has been saved successfully."
                    );
                }
            } catch (err) {
                // console.log(err);
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.put(
                    `/admin/project/update/${project.id}`,
                    values
                );

                if (res.data.status === "updated") {
                    setIsModalOpen(false);
                    form.resetFields();
                    setErrors({});
                    getData();
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
        }
    };

    const { props } = usePage();
    const csrfToken = props.auth.csrf_token || "";

    const [uploadedImages, setUploadedImages] = useState([]);

    const removeProjectImage = ($filename) => {
        axios
            .post(`/engineer/project-images/remove-upload/${$filename}`)
            .then((res) => {
                if (res.data.status === "remove") {
                    message.success("Image removed.");
                }
                if (res.data.status === "error") {
                    alert("error");
                }
            });
    };

    const Uploadprops = {
        name: "project_images",
        action: "/engineer/project-images/temp-upload",
        headers: {
            "X-CSRF-Token": csrfToken,
        },

        beforeUpload: (file) => {
            const isPNG = file.type === "image/png";
            const isJPG = file.type === "image/jpeg";

            if (!isPNG && !isJPG) {
                message.error(`${file.name} is not a png/jpg file.`);
            }
            return isPNG || isJPG || Upload.LIST_IGNORE;
        },

        onChange(info) {
            if (info.file.status === "done") {
                message.success(`${info.file.name} uploaded successfully.`);
                setUploadedImages((prev) => [...prev, info.file.response]);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} upload failed.`);
            }
        },

        onRemove(info) {
            removeProjectImage(info.response); // Remove from server
            setUploadedImages((prev) =>
                prev.filter((image) => image !== info.response)
            ); // Remove from state immediately
            return true;
        },
    };

    const handleCancel = () => {
        // Clear uploaded images and remove them from the server
        uploadedImages.forEach(removeProjectImage);
        setUploadedImages([]); // Clear state immediately
        setIsModalOpen(false);
        form.resetFields();
        setErrors({});
        setProject(null);
        getData();
    };

    
    const handleDelete = async (id) => {
        setLoading(true);

        try {
            const res = await axios.delete(
                `/engineer/project-update/destroy/${id}`
            );

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
    
    function formatDate(updateDate) {
        const date = new Date(updateDate);

        return date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric", // Add year
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    return (
        <AuthenticatedLayout header="Project Update and Timeline" auth={auth}>
            <Head title="Project Update and Timeline" />

            {contextHolder}

            <div className="py-2">
                <Details data={data} />
            </div>
            <div className="flex py-4 justify-start">
                <Button
                    type="primary"
                    onClick={showCreateModal}
                    icon={<PlusOutlined />}
                >
                    New Update
                </Button>
            </div>
            {/* <pre className="text-gray-900">{JSON.stringify(data, null, 2)}</pre> */}
            <div className="py-2">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spin />
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <Empty description="No Project found" />
                    </div>
                ) : (
                    <Timeline mode="left">
                        {data.updates.map((update) => (
                            <Timeline.Item key={update.id}>
                                <div className="p-4 bg-gray-100 rounded">
                                    <div className="flex justify-between">
                                        <Space direction="vertical">
                                            <Text>
                                                {formatDate(update.update_date)}
                                            </Text>
                                            <Text>{update.name}</Text>
                                        </Space>
                                        <Space>
                                            {latestUpdate.latestUpdateId ===
                                                update.id && (
                                                <>
                                                    <Button
                                                        type="primary"
                                                        shape="circle"
                                                        icon={<EditOutlined />}
                                                        onClick={() =>
                                                            showEditModal(
                                                                update
                                                            )
                                                        }
                                                    ></Button>
                                                    <Button
                                                        danger
                                                        shape="circle"
                                                        icon={
                                                            <DeleteOutlined />
                                                        }
                                                        onClick={() =>
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
                                                                        update.id
                                                                    );
                                                                },
                                                            })
                                                        }
                                                    />
                                                </>
                                            )}
                                        </Space>
                                    </div>
                                    <Divider />

                                    <div>{update.description}</div>
                                    <Divider />
                                    <div className="my-4 max-w-96">
                                        <Flex wrap="wrap" vertical gap="small">
                                            <Tooltip
                                                title={`Progress is at ${update.excavation_progress}`}
                                            >
                                                <div>Excavation Progress</div>
                                                <Progress
                                                    percent={
                                                        update.excavation_progress
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={`Progress is at ${update.concrete_works_progress}`}
                                            >
                                                <div>
                                                    Concrete Works Progress
                                                </div>
                                                <Progress
                                                    percent={
                                                        update.concrete_works_progress
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={`Progress is at ${update.water_works_progress}`}
                                            >
                                                <div>Water Works Progress</div>
                                                <Progress
                                                    percent={
                                                        update.water_works_progress
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={`Progress is at ${update.metal_works_progress}`}
                                            >
                                                <div>Metal Works Progress</div>
                                                <Progress
                                                    percent={
                                                        update.metal_works_progress
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={`Progress is at ${update.cement_plaster_and_finishes_progress}`}
                                            >
                                                <div>
                                                    Cement Plaster and Finishes
                                                    Progress
                                                </div>
                                                <Progress
                                                    percent={
                                                        update.cement_plaster_and_finishes_progress
                                                    }
                                                />
                                            </Tooltip>
                                        </Flex>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        {update.images.map((image) => (
                                            <a
                                                key={image.id}
                                                href={`/storage/project_images/${image.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Avatar
                                                    shape="square"
                                                    size={92}
                                                    src={`/storage/project_images/${image.file_path}`}
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                )}
            </div>
            {/* Modal */}
            <Modal
                title="Update"
                open={isModalOpen}
                onCancel={handleCancel}
                maskClosable={false}
                width={800}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    autoComplete="off"
                >
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
                        help={errors?.description ? errors?.description[0] : ""}
                    >
                        <TextArea
                            placeholder="Project Description"
                            allowClear
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item
                        label="EXCAVATION PROGRESS"
                        name="excavation_progress"
                        validateStatus={
                            errors?.excavation_progress ? "error" : ""
                        }
                        help={
                            errors?.excavation_progress
                                ? errors.excavation_progress[0]
                                : ""
                        }
                    >
                        <Slider
                            defaultValue={
                                latestUpdate
                                    ? latestUpdate?.excavation_progress
                                    : 0
                            }
                            min={
                                latestUpdate
                                    ? latestUpdate?.excavation_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestUpdate
                                    ? latestUpdate.excavation_progress
                                    : 0]: latestUpdate
                                    ? `${latestUpdate.excavation_progress}%`
                                    : "0%",
                                100: "100%",
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="CONCRETE WORKS PROGRESS"
                        name="concrete_works_progress"
                        validateStatus={
                            errors?.concrete_works_progress ? "error" : ""
                        }
                        help={
                            errors?.concrete_works_progress
                                ? errors.concrete_works_progress[0]
                                : ""
                        }
                    >
                        <Slider
                            min={
                                latestUpdate
                                    ? latestUpdate?.concrete_works_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestUpdate
                                    ? latestUpdate.concrete_works_progress
                                    : 0]: latestUpdate
                                    ? `${latestUpdate.concrete_works_progress}%`
                                    : "0%",
                                100: "100%",
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="WATER WORKS PROGRESS"
                        name="water_works_progress"
                        validateStatus={
                            errors?.water_works_progress ? "error" : ""
                        }
                        help={
                            errors?.water_works_progress
                                ? errors.water_works_progress[0]
                                : ""
                        }
                    >
                        <Slider
                            min={
                                latestUpdate
                                    ? latestUpdate?.water_works_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestUpdate
                                    ? latestUpdate.water_works_progress
                                    : 0]: latestUpdate
                                    ? `${latestUpdate.water_works_progress}%`
                                    : "0%",
                                100: "100%",
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="METAL WORKS PROGRESS"
                        name="metal_works_progress"
                        validateStatus={
                            errors?.metal_works_progress ? "error" : ""
                        }
                        help={
                            errors?.metal_works_progress
                                ? errors.metal_works_progress[0]
                                : ""
                        }
                    >
                        <Slider
                            min={
                                latestUpdate
                                    ? latestUpdate?.metal_works_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestUpdate
                                    ? latestUpdate.metal_works_progress
                                    : 0]: latestUpdate
                                    ? `${latestUpdate.metal_works_progress}%`
                                    : "0%",
                                100: "100%",
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="CEMENT PLASTER & FINISHES PROGRESS"
                        name="cement_plaster_and_finishes_progress"
                        validateStatus={
                            errors?.cement_plaster_and_finishes_progress
                                ? "error"
                                : ""
                        }
                        help={
                            errors?.cement_plaster_and_finishes_progress
                                ? errors.cement_plaster_and_finishes_progress[0]
                                : ""
                        }
                    >
                        <Slider
                            min={
                                latestUpdate
                                    ? latestUpdate?.cement_plaster_and_finishes_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestUpdate
                                    ? latestUpdate.cement_plaster_and_finishes_progress
                                    : 0]: latestUpdate
                                    ? `${latestUpdate.cement_plaster_and_finishes_progress}%`
                                    : "0%",
                                100: "100%",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="PROJECT IMAGES"
                        name="project_images"
                        valuePropName="fileList"
                        className="w-full"
                        getValueFromEvent={(e) =>
                            Array.isArray(e) ? e : e?.fileList
                        }
                        validateStatus={errors?.project_images ? "error" : ""}
                        help={
                            errors?.project_images
                                ? errors.project_images[0]
                                : ""
                        }
                    >
                        <Upload listType="picture" multiple {...Uploadprops}>
                            <Button icon={<UploadOutlined />}>
                                Click to Upload
                            </Button>
                        </Upload>
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
                                Saved
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
}
