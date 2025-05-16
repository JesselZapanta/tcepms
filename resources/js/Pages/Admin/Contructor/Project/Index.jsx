import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
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
} from "antd";
import Search from "antd/es/input/Search";
import { SignatureOutlined, AppstoreAddOutlined, PrinterOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Report from "./Report";
import { useReactToPrint } from "react-to-print";


export default function Index({ auth, contructor }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);

    const [pagination, setPagination] = useState({
        current: 1,
        pagesize: 10,
        total: 0,
    });

    const handlePageChange = (page) => {
        getData(false, page);
    };

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    const getData = async (isSearch = false, page = 1) => {
        if (isSearch) {
            setSearching(true);
        }
        setLoading(true);

        const params = [
            `id=${contructor.id}`,
            `month=${month}`,
            `year=${year}`,
            `search=${search}`,
            `page=${page}`,
        ].join("&");

        try {
            const res = await axios.get(
                `/admin/contructor/getprojects?${params}`
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
    }, [month, year]);

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


    //report

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        documentTitle: "Project Update Report",
        content: () => componentRef.current,
    });
    
    return (
        <AuthenticatedLayout
            header={`${contructor.company_name} / Project Monitoring`}
            auth={auth}
        >
            <Head title={`${contructor.company_name} / Project Monitoring`} />
            <div className="max-w-7xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    List of Project
                </div>
                <div className="bg-amber-300 font-bold  text-md rounded text-gray-700 p-4 mb-4">
                    Projects associated with this contractor
                </div>
                <div className="flex md:flex-row flex-col py-2 gap-2 justify-end">
                    <Select
                        placeholder="Select a month"
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
                        placeholder="Select a Year"
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
                    <div>
                        <Button
                            className="md:w-24 w-full"
                            onClick={() => handlePrint()}
                            icon={<PrinterOutlined />}
                        >
                            Print
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2 mb-2">
                    <Search
                        placeholder="Input project name"
                        allowClear
                        enterButton="Search"
                        loading={searching}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={() => getData(true)}
                    />
                </div>

                <div ref={componentRef}>
                    <Report
                        contructor={contructor.company_name}
                        projects={data}
                        month={month}
                        year={year}
                    />
                </div>
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
                                                {project.updates.map(
                                                    (update, index) =>
                                                        update.images.map(
                                                            (
                                                                image,
                                                                imgIndex
                                                            ) => (
                                                                <div
                                                                    key={`${index}-${imgIndex}`}
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
                                        <div className="font-bold text-md">
                                            {project.name}
                                        </div>
                                        <div className="mt-4">
                                            <Flex
                                                wrap="wrap"
                                                vertical
                                                gap="small"
                                            >
                                                {project.updates &&
                                                project.updates.length > 0 ? (
                                                    project.updates.map(
                                                        (update) => (
                                                            <div
                                                                key={update.id}
                                                            >
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
                                                            </div>
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
                                {/* <div className="flex justify-end items-center gap-2 p-4 bg-gray-100 border-t border-gray-300">
                                    <Tooltip title="Project Update">
                                        <Link
                                            href={route(
                                                "admin.project-update",
                                                project.id
                                            )}
                                        >
                                            <Button
                                                shape="circle"
                                                icon={<SignatureOutlined />}
                                                className="bg-blue-500 hover:bg-blue-700 text-white"
                                            >
                                            </Button>
                                        </Link>
                                    </Tooltip>
                                </div> */}
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
            </div>
        </AuthenticatedLayout>
    );
}
