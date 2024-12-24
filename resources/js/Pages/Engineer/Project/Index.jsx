import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {  Carousel, Spin, Empty, Pagination, Flex, Progress, Tooltip, Button, Modal } from "antd";
import Search from "antd/es/input/Search";
import {
    EyeOutlined,  
    HistoryOutlined  ,
    SignatureOutlined ,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

export default function Index({ auth }) {
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
    }

    const getData = async (isSearch = false, page = 1) => {
        if (isSearch) {
            setSearching(true);
        }
        setLoading(true);

        const params = [
            `search=${search}`,
            `page=${page}`
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
    }, []);

    return (
        <AuthenticatedLayout header="Project Monitoring" auth={auth}>
            <Head title="Project Monitoring" />
            <div className="py-2">
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
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {data.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white shadow-lg flex flex-col justify-between rounded-lg overflow-hidden"
                            >
                                <div>
                                    <div className="relative">
                                        <Carousel arrows infinite={true}>
                                            <div>
                                                <h3 style={contentStyle}>1</h3>
                                            </div>
                                            <div>
                                                <h3 style={contentStyle}>2</h3>
                                            </div>
                                            <div>
                                                <h3 style={contentStyle}>3</h3>
                                            </div>
                                            <div>
                                                <h3 style={contentStyle}>4</h3>
                                            </div>
                                        </Carousel>
                                    </div>
                                    <div className="p-4">
                                        <div>{project.name}</div>
                                        <div className="mt-4">
                                            <Flex
                                                wrap="wrap"
                                                vertical
                                                gap="small"
                                            >
                                                <Tooltip title="Progress is at 30%">
                                                    <div>Phase 1</div>
                                                    <Progress percent={30} />
                                                </Tooltip>
                                                <Tooltip title="Progress is at 30%">
                                                    <div>Phase 1</div>
                                                    <Progress percent={30} />
                                                </Tooltip>
                                                <Tooltip title="Progress is at 30%">
                                                    <div>Phase 1</div>
                                                    <Progress percent={100} />
                                                </Tooltip>
                                                <Tooltip title="Progress is at 30%">
                                                    <div>Phase 1</div>
                                                    <Progress percent={30} />
                                                </Tooltip>
                                                <Tooltip title="Progress is at 30%">
                                                    <div>Phase 1</div>
                                                    <Progress percent={30} />
                                                </Tooltip>
                                            </Flex>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end items-center gap-2 p-4 bg-gray-100 border-t border-gray-300">
                                    <Tooltip title="View Project Details">
                                        <Button
                                            shape="circle"
                                            icon={<EyeOutlined />}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white"
                                        >
                                            {/* Details */}
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="View Project Time Line">
                                        <Button
                                            shape="circle"
                                            icon={<HistoryOutlined />}
                                            className="bg-green-500 hover:bg-green-700 text-white"
                                        >
                                            {/* Time Line */}
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Make Project Update">
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
                                            >
                                                {/* Update */}
                                            </Button>
                                        </Link>
                                    </Tooltip>
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
            </div>
        </AuthenticatedLayout>
    );
}
