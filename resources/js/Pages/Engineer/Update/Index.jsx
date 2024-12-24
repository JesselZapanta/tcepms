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
} from "antd";

import {
    DatabaseOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import Details from "./Details";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

export default function Index({ auth, projectDetails, latestProgress }) {
    //modals and forms
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const showCreateModal = () => {
        setUser(null);
        setIsModalOpen(true);
        form.setFieldsValue({
            name: "",
        });
    };

    console.log(latestProgress);

    const handleSubmit = async (values) => {
        setProcessing(true);

        if (!user) {
            values.project = projectDetails.id;
            try {
                console.log(values);
                const res = await axios.post(
                    "/engineer/project-update/store",
                    values
                );

                if (res.data.status === "created") {
                    setIsModalOpen(false);
                    form.resetFields();
                    setErrors({});
                    getData();
                    openNotification(
                        "success",
                        "bottomRight",
                        "Created!",
                        "The user has been created successfully."
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
                    `/admin/user/update/${user.id}`,
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
                        "The user has been updated successfully."
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

    const removeProjectImage = (avatar) => {
        axios.post(`/avatar-temp-remove/${avatar}`).then((res) => {
            if (res.data.status === "remove") {
                message.success("Avatar removed.");
                setIsUpload(false);
            }
            if (res.data.status === "error") {
                alert("error");
            }
        });
    };

    const Uploadprops = {
        name: "project_images",
        action: "/project-images-temp-upload",
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
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} upload failed.`);
            }
        },

        onRemove(info) {
            if (user) {
                message.error(
                    "You cannot remove project images once uploaded."
                );
                return false; // Prevent file removal
            }

            removeProjectImage(info.response); // Adjust this to your handler for removing images
            return true;
        },
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setErrors({});
        setUser(null);
    };

    return (
        <AuthenticatedLayout header="Project Update and Timeline" auth={auth}>
            <Head title="Project Update and Timeline" />
            <div className="py-2">
                <Details projectDetails={projectDetails} />
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
            <div className="py-2">
                <Timeline mode="left">
                    {projectDetails.updates.map((update) => (
                        <Timeline.Item key={update.id}>
                            <div className="p-4 bg-gray-100 rounded">
                                <h3>{update.name}</h3>
                                <p>{update.update_date}</p>
                                <p>{update.description}</p>
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
                                            <div>Concrete Works Progress</div>
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
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Planning stage"
                                        className="w-[100px] rounded-md mt-2"
                                    />
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Planning stage"
                                        className="w-[100px] rounded-md mt-2"
                                    />
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Planning stage"
                                        className="w-[100px] rounded-md mt-2"
                                    />
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Planning stage"
                                        className="w-[100px] rounded-md mt-2"
                                    />
                                </div>
                            </div>
                        </Timeline.Item>
                    ))}
                </Timeline>
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
                                latestProgress
                                    ? latestProgress?.excavation_progress
                                    : 0
                            }
                            min={
                                latestProgress
                                    ? latestProgress?.excavation_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestProgress
                                    ? latestProgress.excavation_progress
                                    : 0]: latestProgress
                                    ? `${latestProgress.excavation_progress}%`
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
                                latestProgress
                                    ? latestProgress?.concrete_works_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestProgress
                                    ? latestProgress.concrete_works_progress
                                    : 0]: latestProgress
                                    ? `${latestProgress.concrete_works_progress}%`
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
                                latestProgress
                                    ? latestProgress?.water_works_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestProgress
                                    ? latestProgress.water_works_progress
                                    : 0]: latestProgress
                                    ? `${latestProgress.water_works_progress}%`
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
                                latestProgress
                                    ? latestProgress?.metal_works_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestProgress
                                    ? latestProgress.metal_works_progress
                                    : 0]: latestProgress
                                    ? `${latestProgress.metal_works_progress}%`
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
                                latestProgress
                                    ? latestProgress?.cement_plaster_and_finishes_progress
                                    : 0
                            }
                            max={100}
                            marks={{
                                [latestProgress
                                    ? latestProgress.cement_plaster_and_finishes_progress
                                    : 0]: latestProgress
                                    ? `${latestProgress.cement_plaster_and_finishes_progress}%`
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
                                // disabled={processing}
                                // loading={processing}
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
