import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Carousel,
    Spin,
    Empty,
    Pagination,
    Flex,
    Progress,
    Tooltip,
    Button,
    Avatar,
    Select,
    Modal,
} from "antd";
import Search from "antd/es/input/Search";
import {
    SignatureOutlined,
    AppstoreAddOutlined,
    CalendarOutlined,
    BarChartOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

import { Dropdown, Menu } from "antd";

const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

export default function Index({ auth, categories }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("Ongoing");
    const [order, setOrder] = useState("desc");

    const [pagination, setPagination] = useState({
        current: 1,
        pagesize: 10,
        total: 0,
    });

    const handlePageChange = (page) => {
        getData(false, page);
    };

    const getData = async (isSearch = false, page = 1) => {
        if (isSearch) {
            setSearching(true);
        }
        setLoading(true);

        const params = [
            `search=${search}`,
            `page=${page}`,
            `category=${category}`,
            `status=${status}`,
            `order=${order}`,
        ].join("&");

        try {
            const res = await axios.get(
                `/engineer/project-monitoring/getdata?${params}`
            );
            setData(res.data.data);
            setPagination({
                current: res.data.current_page,
                pageSize: res.data.per_page,
                total: res.data.total,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setSearching(false);
        }
    };

    useEffect(() => {
        getData(false);
    }, [category, status, order]);

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
        <AuthenticatedLayout header="Project Monitoring" auth={auth}>
            <Head title="Project Monitoring" />
            <div className="max-w-7xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    List of Project
                </div>
                <div className="bg-amber-300 font-bold  text-md rounded text-gray-700 p-4 mb-4">
                    Monitor the project progress here!
                </div>
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                    <Select
                        defaultValue="Latest"
                        className="w-full md:w-40"
                        showSearch
                        onChange={(value) => setOrder(value)}
                    >
                        <Select.Option value="desc">Latest</Select.Option>
                        <Select.Option value="asc">Oldest</Select.Option>
                    </Select>
                    <Select
                        defaultValue="All"
                        className="w-full md:w-40"
                        showSearch
                        onChange={(value) => setCategory(value)}
                    >
                        <Select.Option value="">All</Select.Option>
                        {categories.map((category) => (
                            <Select.Option
                                key={category.id}
                                value={category.name}
                            >
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select
                        defaultValue="Ongoing"
                        className="w-full md:w-40"
                        showSearch
                        onChange={(value) => setStatus(value)}
                    >
                        <Select.Option value="Ongoing">Ongoing</Select.Option>
                        <Select.Option value="Completed">
                            Completed
                        </Select.Option>
                    </Select>
                    <Search
                        placeholder="Input project name"
                        allowClear
                        enterButton="Search"
                        loading={searching}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={() => getData(true)}
                    />
                </div>

                {/* <pre className="text-gray-900">
                    {JSON.stringify(data, null, 2)}
                </pre> */}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spin />
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <Empty description="No Project found" />
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white shadow-lg flex flex-col justify-between rounded-lg overflow-hidden"
                            >
                                <div>
                                    <div className="relative">
                                        {/* Carousel for images */}
                                        {project.updates &&
                                        project.updates.length > 0 ? (
                                            <Carousel arrows infinite={true}>
                                                {project.updates.map((update) =>
                                                    update.images.map(
                                                        (image, imgIndex) => (
                                                            <div
                                                                key={`${update.id}-${imgIndex}`}
                                                                onClick={() =>
                                                                    showImageModal(
                                                                        update.images,
                                                                        imgIndex
                                                                    )
                                                                }
                                                                className="cursor-pointer"
                                                            >
                                                                <Avatar
                                                                    className="w-full h-72"
                                                                    shape="square"
                                                                    src={`/storage/project_images/${image.file_path}`}
                                                                    alt={`Project Update ${update.id} - Image ${imgIndex}`}
                                                                />
                                                            </div>
                                                        )
                                                    )
                                                )}
                                            </Carousel>
                                        ) : (
                                            // Placeholder when no updates
                                            <div className="flex justify-center items-center">
                                                <Avatar
                                                    icon={
                                                        <AppstoreAddOutlined />
                                                    }
                                                    shape="square"
                                                    className="w-full h-72"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="font-bold text-lg">
                                            {project.name}
                                        </div>
                                        <div className="mt-4 font-bold">
                                            <Flex
                                                wrap="wrap"
                                                vertical
                                                gap="small"
                                            >
                                                {project.updates &&
                                                project.updates.length > 0 ? (
                                                    project.updates.map(
                                                        (update) => (
                                                            <>
                                                                <Tooltip
                                                                    title={`Progress is at ${update.excavation_progress}%`}
                                                                >
                                                                    <div>
                                                                        Excavation
                                                                        Progress
                                                                    </div>
                                                                    <Progress
                                                                        percent={
                                                                            update.excavation_progress
                                                                        }
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip
                                                                    title={`Progress is at ${update.concrete_works_progress}%`}
                                                                >
                                                                    <div>
                                                                        Concrete
                                                                        Works
                                                                        Progress
                                                                    </div>
                                                                    <Progress
                                                                        percent={
                                                                            update.concrete_works_progress
                                                                        }
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip
                                                                    title={`Progress is at ${update.water_works_progress}%`}
                                                                >
                                                                    <div>
                                                                        Water
                                                                        Works
                                                                        Progress
                                                                    </div>
                                                                    <Progress
                                                                        percent={
                                                                            update.water_works_progress
                                                                        }
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip
                                                                    title={`Progress is at ${update.metal_works_progress}%`}
                                                                >
                                                                    <div>
                                                                        Metal
                                                                        Works
                                                                        Progress
                                                                    </div>
                                                                    <Progress
                                                                        percent={
                                                                            update.metal_works_progress
                                                                        }
                                                                    />
                                                                </Tooltip>
                                                                <Tooltip
                                                                    title={`Progress is at ${update.cement_plaster_and_finishes_progress}%`}
                                                                >
                                                                    <div>
                                                                        Cement
                                                                        Plaster
                                                                        and
                                                                        Finishes
                                                                        Progress
                                                                    </div>
                                                                    <Progress
                                                                        percent={
                                                                            update.cement_plaster_and_finishes_progress
                                                                        }
                                                                    />
                                                                </Tooltip>
                                                            </>
                                                        )
                                                    )
                                                ) : (
                                                    <>
                                                        <Tooltip
                                                            title={`Progress is at 0%`}
                                                        >
                                                            <div>
                                                                Excavation
                                                                Progress
                                                            </div>
                                                            <Progress
                                                                percent={0}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip
                                                            title={`Progress is at 0%`}
                                                        >
                                                            <div>
                                                                Concrete Works
                                                                Progress
                                                            </div>
                                                            <Progress
                                                                percent={0}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip
                                                            title={`Progress is at 0`}
                                                        >
                                                            <div>
                                                                Water Works
                                                                Progress
                                                            </div>
                                                            <Progress
                                                                percent={0}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip
                                                            title={`Progress is at 0%`}
                                                        >
                                                            <div>
                                                                Metal Works
                                                                Progress
                                                            </div>
                                                            <Progress
                                                                percent={0}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip
                                                            title={`Progress is at 0%`}
                                                        >
                                                            <div>
                                                                Cement Plaster
                                                                and Finishes
                                                                Progress
                                                            </div>
                                                            <Progress
                                                                percent={0}
                                                            />
                                                        </Tooltip>
                                                    </>
                                                )}
                                            </Flex>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-2 p-4 bg-amber-100 border-t border-gray-300">
                                    {/* <Tooltip title="Make Project Update">
                                        <Link
                                            href={route(
                                                "engineer.project-update",
                                                project.id
                                            )}
                                        >
                                            <Button
                                                shape="circle"
                                                icon={<SignatureOutlined />}
                                                className="bg-blue-500 hover:bg-blue-700 text-white"
                                            ></Button>
                                        </Link>
                                    </Tooltip> */}

                                    <div>
                                        <Dropdown.Button
                                            type="primary"
                                            placement="bottomLeft"
                                            menu={{
                                                items: [
                                                    {
                                                        key: "1",
                                                        label: "Make Update",
                                                        icon: (
                                                            <SignatureOutlined
                                                                size={16}
                                                            />
                                                        ),
                                                        onClick: () => {
                                                            router.visit(
                                                                route(
                                                                    "engineer.project-update",
                                                                    project.id
                                                                )
                                                            );
                                                        },
                                                    },
                                                    {
                                                        key: "2",
                                                        label: "Project Update Performance ",
                                                        icon: (
                                                            <BarChartOutlined
                                                                size={16}
                                                            />
                                                        ),
                                                        onClick: () => {
                                                            router.visit(
                                                                route(
                                                                    "engineer.project-monitoring-graph",
                                                                    project.id
                                                                )
                                                            );
                                                        },
                                                    },
                                                    {
                                                        key: "3",
                                                        label: "Request End Date Extension",
                                                        icon: (
                                                            <CalendarOutlined
                                                                size={16}
                                                            />
                                                        ),
                                                        onClick: () => {
                                                            router.visit(
                                                                route(
                                                                    "engineer.project-request-extension",
                                                                    project.id
                                                                )
                                                            );
                                                        },
                                                    },
                                                    // {
                                                    //     key: "4",
                                                    //     label: "Request Additional Material",
                                                    //     icon: (
                                                    //         <CalendarOutlined
                                                    //             size={16}
                                                    //         />
                                                    //     ),
                                                    //     onClick: () => {
                                                    //         router.visit(
                                                    //             route(
                                                    //                 "engineer.project-request-extension",
                                                    //                 project.id
                                                    //             )
                                                    //         );
                                                    //     },
                                                    // },
                                                    // {
                                                    //     key: "4",
                                                    //     label: "Request Additional Labor",
                                                    //     icon: (
                                                    //         <CalendarOutlined
                                                    //             size={16}
                                                    //         />
                                                    //     ),
                                                    //     onClick: () => {
                                                    //         router.visit(
                                                    //             route(
                                                    //                 "engineer.project-request-extension",
                                                    //                 project.id
                                                    //             )
                                                    //         );
                                                    //     },
                                                    // },
                                                ],
                                            }}
                                            trigger={["click"]}
                                        >
                                            Action
                                        </Dropdown.Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex justify-center mt-12">
                    <Pagination
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={handlePageChange}
                    />
                </div>
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
                                onClick={() => carouselRef.current?.prev()}
                                type="primary"
                            >
                                Prev
                            </Button>
                            <Button
                                onClick={() => carouselRef.current?.next()}
                                type="primary"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
