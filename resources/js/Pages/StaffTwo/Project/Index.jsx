import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Button,
    Space,
    Table,
    Tag,
} from "antd";
import Search from "antd/es/input/Search";
import {
    EditOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Column from "antd/es/table/Column";


export default function Index({ auth }) {
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
    }, [page, sortField, sortOrder]);

    // console.log(data);

    return (
        <AuthenticatedLayout header="Project Labor Management" auth={auth}>
            <Head title="Project Labor Management" />
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
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space>
                                <Link href={route("stafftwo.labor", record.id)}>
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<EditOutlined />}
                                    />
                                </Link>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </AuthenticatedLayout>
    );
}
