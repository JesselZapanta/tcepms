import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
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
    Select,
    Carousel,
} from "antd";

import {
    CalendarOutlined,
    DatabaseOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    PrinterOutlined,
    QuestionCircleOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
const { Text } = Typography;
import axios from "axios";
import Report from "./Report";
import { useReactToPrint } from "react-to-print";
import Details from "@/Pages/Partials/Details";

export default function Index({ auth, currentProject }) {
    const [latestUpdate, setLatestUpdate] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [order, setOrder] = useState('desc');

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/engineer/project-update/getData/${currentProject.id}?month=${month}&year=${year}&order=${order}`
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
    }, [month, year, order]);

    const [years, setYears] = useState([]);

    useEffect(() => {
        const startYear = 2000;
        const endYear = new Date().getFullYear(); // Current year
        const yearArray = [];

        for (let year = startYear; year <= endYear; year++) {
            yearArray.push(year);
        }

        setYears(yearArray);
    }, []);

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
            excavation_progress: latestUpdate
                ? latestUpdate?.excavation_progress
                : 0,
            concrete_works_progress: latestUpdate
                ? latestUpdate?.concrete_works_progress
                : 0,
            water_works_progress: latestUpdate
                ? latestUpdate?.water_works_progress
                : 0,
            metal_works_progress: latestUpdate
                ? latestUpdate?.metal_works_progress
                : 0,
            cement_plaster_and_finishes_progress: latestUpdate
                ? latestUpdate?.cement_plaster_and_finishes_progress
                : 0,
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

        // console.log(project);

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
                    `/engineer/project-update/update/${project.id}`,
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

    const deleteProjectImage = async ($id) => {
        try {
            const res = await axios.post(
                `/engineer/project-images/delete-upload/${$id}`
            );
            if (res.data.status === "deleted") {
                message.success("Image deleted.");
            }
        } catch (err) {
            console.log(err);
            if (err.response.status === 422) {
                message.error("Cannot delete the last image.");
            }
        }
    };

    const removeProjectImage = async ($filename) => {
        try {
            const res = await axios.post(
                `/engineer/project-images/remove-upload/${$filename}`
            );

            if (res.data.status === "remove") {
                message.success("Image removed.");
            }
        } catch (err) {
            console.log(err);
        }
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
            if (project) {
                deleteProjectImage(info.uid);
                // console.log(info);
            }
            removeProjectImage(info.response); // Remove from server
            setUploadedImages((prev) =>
                prev.filter((image) => image !== info.response)
            );
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
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        documentTitle: "Project Update Report",
        content: () => componentRef.current,
    });

    // const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //     documentTitle: "Project Update Report",
    //     content: () => componentRef.current,
    // });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUpdateImages, setCurrentUpdateImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const carouselRef = useRef(null); // ✅ useRef instead of useState

    const showImageModal = (images, index) => {
        setCurrentUpdateImages(images);
        setCurrentImageIndex(index);
        setIsModalVisible(true);

        setTimeout(() => {
            if (carouselRef.current) {
                carouselRef.current.goTo(index, true);
            }
        }, 50); // ensure modal renders before goTo
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <AuthenticatedLayout header="Project Update and Timeline" auth={auth}>
            <Head title="Project Update and Timeline" />
            {contextHolder}
            <div className="max-w-7xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    Project Updates
                </div>
                <div className="py-2">
                    <Details data={data} />
                </div>

                <div className="flex md:flex-row flex-col py-2 gap-2 justify-between">
                    {/* <div>Filters:</div> */}
                    <Button
                        className="md:w-32 w-full"
                        type="primary"
                        onClick={showCreateModal}
                        icon={<PlusOutlined />}
                    >
                        New Update
                    </Button>

                    <div className="flex gap-2 md:flex-row flex-col">
                        <Link
                            href={route(
                                "engineer.project-update-calendar",
                                currentProject.id
                            )}
                        >
                            <Button
                                className="md:w-24 w-full"
                                icon={<CalendarOutlined />}
                            >
                                Calendar
                            </Button>
                        </Link>
                        <Select
                            defaultValue="Latest"
                            className="md:w-24 w-full"
                            showSearch
                            onChange={(value) => setOrder(value)}
                        >
                            <Select.Option value="desc">Latest</Select.Option>
                            <Select.Option value="asc">Oldest</Select.Option>
                        </Select>
                        <Select
                            p
                            defaultValue="All Month"
                            onChange={(value) => setMonth(value)}
                            className="md:w-24 w-full"
                        >
                            <Option value={0}>All</Option>
                            <Option value={1}>January</Option>
                            <Option value={2}>February</Option>
                            <Option value={3}>March</Option>
                            <Option value={4}>April</Option>
                            <Option value={5}>May</Option>
                            <Option value={6}>June</Option>
                            <Option value={7}>July</Option>
                            <Option value={8}>August</Option>
                            <Option value={9}>September</Option>
                            <Option value={10}>October</Option>
                            <Option value={11}>November</Option>
                            <Option value={12}>December</Option>
                        </Select>
                        <Select
                            defaultValue="All Year"
                            onChange={(value) => setYear(value)}
                            className="md:w-24 w-full"
                        >
                            <Option value={0}>All</Option>
                            {years.reverse().map((year) => (
                                <Option key={year} value={year}>
                                    {year}
                                </Option>
                            ))}
                        </Select>
                        <Button
                            className="md:w-24 w-full"
                            onClick={() => handlePrint()}
                            icon={<PrinterOutlined />}
                        >
                            Print
                        </Button>
                    </div>
                </div>

                {/* <pre className="text-gray-900">{JSON.stringify(data, null, 2)}</pre> */}
                <div className="py-2 mt-4">
                    <div ref={componentRef}>
                        <Report formatDate={formatDate} project={data} />
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Spin />
                        </div>
                    ) : !data || !data.updates ? (
                        <div className="flex justify-center items-center h-64">
                            <Empty description="No Project found" />
                        </div>
                    ) : data.updates.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <Empty description="No updates available for this project" />
                        </div>
                    ) : (
                        <div className="da">
                            <Timeline mode="left">
                                {data.updates.map((update) => (
                                    <Timeline.Item key={update.id}>
                                        <div className="p-4 bg-gray-100 rounded">
                                            <div className="flex justify-between">
                                                <Space direction="vertical">
                                                    <Text className="font-bold text-xl">
                                                        {update.name}
                                                    </Text>
                                                    <Text>
                                                        {formatDate(
                                                            update.update_date
                                                        )}
                                                    </Text>
                                                </Space>
                                                <Space>
                                                    {latestUpdate.latestUpdateId ===
                                                        update.id && (
                                                        <>
                                                            <Button
                                                                type="primary"
                                                                shape="circle"
                                                                icon={
                                                                    <EditOutlined />
                                                                }
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
                                                                    Modal.confirm(
                                                                        {
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
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                </Space>
                                            </div>
                                            <Divider />

                                            <div className="text-justify text-lg">
                                                {update.description}
                                            </div>
                                            <Divider />
                                            <div className="my-4 max-w-96 font-bold">
                                                <Flex
                                                    wrap="wrap"
                                                    vertical
                                                    gap="small"
                                                >
                                                    <Tooltip
                                                        title={`Progress is at ${update.excavation_progress}`}
                                                    >
                                                        <div className="font-bold text-lg">
                                                            Excavation Progress
                                                        </div>
                                                        <Progress
                                                            percent={
                                                                update.excavation_progress
                                                            }
                                                        />
                                                    </Tooltip>
                                                    <Tooltip
                                                        title={`Progress is at ${update.concrete_works_progress}`}
                                                    >
                                                        <div className="font-bold text-lg">
                                                            Concrete Works
                                                            Progress
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
                                                        <div className="font-bold text-lg">
                                                            Water Works Progress
                                                        </div>
                                                        <Progress
                                                            percent={
                                                                update.water_works_progress
                                                            }
                                                        />
                                                    </Tooltip>
                                                    <Tooltip
                                                        title={`Progress is at ${update.metal_works_progress}`}
                                                    >
                                                        <div className="font-bold text-lg">
                                                            Metal Works Progress
                                                        </div>
                                                        <Progress
                                                            percent={
                                                                update.metal_works_progress
                                                            }
                                                        />
                                                    </Tooltip>
                                                    <Tooltip
                                                        title={`Progress is at ${update.cement_plaster_and_finishes_progress}`}
                                                    >
                                                        <div className="font-bold text-lg">
                                                            Cement Plaster and
                                                            Finishes Progress
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
                                                {update.images.map(
                                                    (image, index) => (
                                                        <div
                                                            key={image.id}
                                                            onClick={() =>
                                                                showImageModal(
                                                                    update.images,
                                                                    index
                                                                )
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            <Avatar
                                                                shape="square"
                                                                size={92}
                                                                src={`/storage/project_images/${image.file_path}`}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                            <Modal
                                open={isModalVisible}
                                onCancel={handleModalCancel}
                                footer={null}
                                style={{
                                    top: 0,
                                    padding: 0,
                                }}
                                bodyStyle={{
                                    height: "90vh",
                                    padding: 0,
                                }}
                                width="90"
                                centered
                            >
                                <div className="relative">
                                    <Carousel ref={carouselRef} dots>
                                        {currentUpdateImages.map((image) => (
                                            <div
                                                key={image.id}
                                                className="flex justify-center items-center py-6"
                                            >
                                                <img
                                                    src={`/storage/project_images/${image.file_path}`}
                                                    alt="Preview"
                                                    className="max-h-[80vh] w-full object-contain"
                                                />
                                            </div>
                                        ))}
                                    </Carousel>

                                    <div className="flex justify-between gap-4">
                                        <Button
                                            onClick={() =>
                                                carouselRef.current?.prev()
                                            }
                                            type="primary"
                                        >
                                            Prev
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                carouselRef.current?.next()
                                            }
                                            type="primary"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
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
                    className="overflow-hidden"
                >
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                        autoComplete="off"
                    >
                        <Form.Item
                            label="UPDATE NAME"
                            name="name"
                            // Custom error handling
                            validateStatus={errors?.name ? "error" : ""}
                            help={errors?.name ? errors.name[0] : ""}
                        >
                            <Input
                                placeholder="Update name"
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
                                min={
                                    latestUpdate
                                        ? latestUpdate.excavation_progress
                                        : 0
                                }
                                max={100}
                                marks={
                                    latestUpdate?.excavation_progress === 100
                                        ? { 100: "100%" }
                                        : {
                                              ...(latestUpdate
                                                  ? {
                                                        [latestUpdate.excavation_progress]: `${latestUpdate.excavation_progress}%`,
                                                    }
                                                  : { 0: "0%" }),
                                              ...Array.from(
                                                  { length: 10 },
                                                  (_, i) => i * 10
                                              ).reduce((acc, value) => {
                                                  acc[value] = `${value}%`;
                                                  return acc;
                                              }, {}),
                                              100: "100%",
                                          }
                                }
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
                                        ? latestUpdate.concrete_works_progress
                                        : 0
                                }
                                max={100}
                                marks={
                                    latestUpdate?.concrete_works_progress ===
                                    100
                                        ? { 100: "100%" }
                                        : {
                                              ...(latestUpdate
                                                  ? {
                                                        [latestUpdate.concrete_works_progress]: `${latestUpdate.concrete_works_progress}%`,
                                                    }
                                                  : { 0: "0%" }),
                                              ...Array.from(
                                                  { length: 10 },
                                                  (_, i) => i * 10
                                              ).reduce((acc, value) => {
                                                  acc[value] = `${value}%`;
                                                  return acc;
                                              }, {}),
                                              100: "100%",
                                          }
                                }
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
                                        ? latestUpdate.water_works_progress
                                        : 0
                                }
                                max={100}
                                marks={
                                    latestUpdate?.water_works_progress === 100
                                        ? { 100: "100%" }
                                        : {
                                              ...(latestUpdate
                                                  ? {
                                                        [latestUpdate.water_works_progress]: `${latestUpdate.water_works_progress}%`,
                                                    }
                                                  : { 0: "0%" }),
                                              ...Array.from(
                                                  { length: 10 },
                                                  (_, i) => i * 10
                                              ).reduce((acc, value) => {
                                                  acc[value] = `${value}%`;
                                                  return acc;
                                              }, {}),
                                              100: "100%",
                                          }
                                }
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
                                        ? latestUpdate.metal_works_progress
                                        : 0
                                }
                                max={100}
                                marks={
                                    latestUpdate?.metal_works_progress === 100
                                        ? { 100: "100%" }
                                        : {
                                              ...(latestUpdate
                                                  ? {
                                                        [latestUpdate.metal_works_progress]: `${latestUpdate.metal_works_progress}%`,
                                                    }
                                                  : { 0: "0%" }),
                                              ...Array.from(
                                                  { length: 10 },
                                                  (_, i) => i * 10
                                              ).reduce((acc, value) => {
                                                  acc[value] = `${value}%`;
                                                  return acc;
                                              }, {}),
                                              100: "100%",
                                          }
                                }
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
                                    ? errors
                                          .cement_plaster_and_finishes_progress[0]
                                    : ""
                            }
                        >
                            <Slider
                                min={
                                    latestUpdate
                                        ? latestUpdate.cement_plaster_and_finishes_progress
                                        : 0
                                }
                                max={100}
                                marks={
                                    latestUpdate?.cement_plaster_and_finishes_progress ===
                                    100
                                        ? { 100: "100%" }
                                        : {
                                              ...(latestUpdate
                                                  ? {
                                                        [latestUpdate.cement_plaster_and_finishes_progress]: `${latestUpdate.cement_plaster_and_finishes_progress}%`,
                                                    }
                                                  : { 0: "0%" }),
                                              ...Array.from(
                                                  { length: 10 },
                                                  (_, i) => i * 10
                                              ).reduce((acc, value) => {
                                                  acc[value] = `${value}%`;
                                                  return acc;
                                              }, {}),
                                              100: "100%",
                                          }
                                }
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
                            validateStatus={
                                errors?.project_images ? "error" : ""
                            }
                            help={
                                errors?.project_images
                                    ? errors.project_images[0]
                                    : ""
                            }
                        >
                            <Upload
                                listType="picture"
                                multiple
                                {...Uploadprops}
                            >
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
            </div>
        </AuthenticatedLayout>
    );
}
