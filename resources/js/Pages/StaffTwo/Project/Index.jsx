import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Button, Dropdown, Select, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import {
    EditOutlined,
    FileTextOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Column from "antd/es/table/Column";
import { useReactToPrint } from "react-to-print";
import DetailedReport from "@/Pages/Partials/DetailedReport";

export default function Index({ auth, categories, badge }) {
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
            const res = await axios.get(`/stafftwo/project/getdata?${params}`);
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

    // console.log(data);

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
            const res = await axios.get(`/stafftwo/project/get-report/${id}`);

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
        <AuthenticatedLayout
            header="Project Labor Management"
            auth={auth}
            badge={badge}
        >
            <Head title="Project Labor Management" />
            <div className="w-full p-4 mt-4 rounded bg-white mx-auto">
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
                            className="whitespace-nowrap"
                            //sorter={true}
                            title="CODE"
                            dataIndex="project_code"
                            key="project_code"
                        />

                        <Column
                            className="whitespace-nowrap bg-white font-bold"
                            // sorter={true}
                            title="Project Name"
                            dataIndex="name"
                            key="name"
                            render={(name) => truncate(name, 50)}
                        />

                        <Column
                            className="whitespace-nowrap bg-white"
                            //sorter={true}
                            title="Category"
                            dataIndex="category"
                            key="category"
                            render={(name) => <Tag>{truncate(name, 20)}</Tag>}
                        />

                        <Column
                            className="whitespace-nowrap bg-white"
                            // sorter={true}
                            title="Engineer"
                            dataIndex="site_engineer"
                            key="site_engineer"
                            render={(site_engineer) =>
                                site_engineer?.name || "N/A"
                            }
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            //sorter={true}
                            title="Start Date"
                            dataIndex="start_date"
                            key="start_date"
                            render={(start_date) =>
                                start_date.slice(0, 10) || "N/A"
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
                                    {/* <Link
                                        href={route(
                                            "stafftwo.labor",
                                            record.id
                                        )}
                                    >
                                        <Button
                                            type="primary"
                                            shape="circle"
                                            icon={<EditOutlined />}
                                        />
                                    </Link> */}
                                    <div>
                                        <Dropdown.Button
                                            type="primary"
                                            placement="bottomRight"
                                            menu={{
                                                items: [
                                                    {
                                                        key: "1",
                                                        label: "Project Material",
                                                        icon: (
                                                            <UnorderedListOutlined
                                                                size={16}
                                                            />
                                                        ),
                                                        onClick: () => {
                                                            router.visit(
                                                                route(
                                                                    "stafftwo.labor",
                                                                    record.id
                                                                )
                                                            );
                                                        },
                                                    },
                                                    {
                                                        key: "2",
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
            </div>
        </AuthenticatedLayout>
    );
}
