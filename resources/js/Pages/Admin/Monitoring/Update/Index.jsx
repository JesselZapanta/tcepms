import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Flex,
    Progress,
    Tooltip,
    Timeline,
    Space,
    Spin,
    Empty,
    Avatar,
    Divider,
    Typography,
    Button,
    Select,
    Modal,
    Carousel,
} from "antd";

const { Option } = Select;

import {
    CalendarOutlined,
    PrinterOutlined,
    SearchOutlined,
} from "@ant-design/icons";

import { useEffect, useRef, useState } from "react";
const { Text } = Typography;
import axios from "axios";
import Report from "./Report";
import { useReactToPrint } from "react-to-print";
import Details from "@/Pages/Partials/Details";

export default function Index({ auth, currentProject, badge }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [order, setOrder] = useState("desc");

    console.log(year);

    const getData = async () => {
        setLoading(true);

        try {
            const res = await axios.get(
                `/admin/project-monitoring/project/getData/${currentProject.id}?month=${month}&year=${year}&order=${order}`
            );

            setData(res.data.projectDetails);
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
        <AuthenticatedLayout
            header="Project Update and Timeline"
            auth={auth}
            badge={badge}
        >
            <Head title="Project Update and Timeline" />

            <div className="max-w-7xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    Project Updates
                </div>
                <div className="py-2">
                    <Details data={data} />
                </div>
                <div className="flex md:flex-row flex-col py-2 gap-2 justify-end">
                    {/* <div>Filters:</div> */}
                    <Link
                        href={route(
                            "admin.project-update-calendar",
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
                        // placeholder="Select a month"
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
                        // placeholder="Select a Year"
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

                {/* <pre className="text-gray-900">{JSON.stringify(data, null, 2)}</pre> */}
                <div className="py-2">
                    <div ref={componentRef}>
                        <Report
                            month={month}
                            formatDate={formatDate}
                            project={data}
                        />
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
                        <div className="">
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
                                            </div>
                                            <Divider />

                                            <div className="text-justify text-lg">
                                                {update.description}
                                            </div>
                                            <Divider />

                                            <div className="my-4 max-w-96">
                                                <Flex
                                                    wrap="wrap"
                                                    vertical
                                                    gap="small"
                                                >
                                                    {[
                                                        {
                                                            label: "Excavation Progress",
                                                            value: update.excavation_progress,
                                                        },
                                                        {
                                                            label: "Concrete Works Progress",
                                                            value: update.concrete_works_progress,
                                                        },
                                                        {
                                                            label: "Water Works Progress",
                                                            value: update.water_works_progress,
                                                        },
                                                        {
                                                            label: "Metal Works Progress",
                                                            value: update.metal_works_progress,
                                                        },
                                                        {
                                                            label: "Cement Plaster and Finishes Progress",
                                                            value: update.cement_plaster_and_finishes_progress,
                                                        },
                                                    ].map((item) => (
                                                        <Tooltip
                                                            key={item.label}
                                                            title={`Progress is at ${item.value}%`}
                                                        >
                                                            <div className="font-bold text-lg">
                                                                {item.label}
                                                            </div>
                                                            <Progress
                                                                percent={
                                                                    item.value
                                                                }
                                                            />
                                                        </Tooltip>
                                                    ))}
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
                                width="100%"
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
            </div>
        </AuthenticatedLayout>
    );
}
