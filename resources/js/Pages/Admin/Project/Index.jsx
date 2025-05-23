import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Row, Select, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { FileTextOutlined, EyeOutlined } from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import Input from "antd/es/input/Input";
import axios from "axios";
import Column from "antd/es/table/Column";
import Dropdown from "antd/es/dropdown/dropdown";
import { useReactToPrint } from "react-to-print";
import DetailedReport from "@/Pages/Partials/DetailedReport";
import Details from "@/Pages/Partials/Details";

export default function Index({ auth, categories }) {
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
            const res = await axios.get(`/admin/project/getdata?${params}`);
            setData(res.data.data);
            setTotal(res.data.total);
        } catch (err) {
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

    const truncate = (text, limit) => {
        if (text.length > limit) {
            return text.slice(0, limit) + "...";
        }

        return text;
    };

    const [project, setProject] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (project) => {
        setProject(project);
        setIsModalOpen(true);

        console.log(project);
    };

    const handleClose = () => {
        setProject({});
        setIsModalOpen(false);
    };

    const currency = (amount) =>
        Number(amount).toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
        });

    //print report
    const componentRef = useRef();
    const [reportData, setReportData] = useState(null); // set to null for better condition handling
    const [shouldPrint, setShouldPrint] = useState(false);

    const handlePrint = async (id) => {
        try {
            const res = await axios.get(`/admin/project/get-report/${id}`);

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
        <AuthenticatedLayout header="Project Management" auth={auth}>
            <Head title="Project Management" />
            <div className="max-w-7xl p-4 mt-4 rounded bg-white mx-auto">
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
                            <Select.Option value="">
                                All
                            </Select.Option>
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
                            className="whitespace-nowrap bg-green"
                            //sorter={true}
                            title="CODE"
                            dataIndex="project_code"
                            key="project_code"
                        />
                        <Column
                            className="whitespace-nowrap bg-white font-bold"
                            //sorter={true}
                            title="Project Name"
                            dataIndex="name"
                            key="name"
                            render={(name) => truncate(name, 40)}
                        />
                        <Column
                            className="whitespace-nowrap bg-white"
                            //sorter={true}
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
                            render={(start_date) => start_date || "N/A"}
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
                                    <div>
                                        <Dropdown.Button
                                            type="primary"
                                            placement="bottomRight"
                                            menu={{
                                                items: [
                                                    {
                                                        key: "1",
                                                        label: "Project Details",
                                                        icon: (
                                                            <EyeOutlined
                                                                size={16}
                                                            />
                                                        ),
                                                        onClick: () =>
                                                            showModal(record),
                                                    },
                                                    {
                                                        key: "3",
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

                {/* <DetailedReport data={reportData} /> */}

                <Modal
                    title="PROJECT DETAILS"
                    width={800}
                    open={isModalOpen}
                    onCancel={handleClose}
                    maskClosable={false}
                    footer={false}
                >
                    {/* <Details data={project}/> */}
                    <div className="border">
                        <table className="w-full nb table-auto border-collapse">
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r w-1/3">
                                        Project Name:
                                    </td>
                                    <td className="p-2">{project?.name}</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Project Code:
                                    </td>
                                    <td className="p-2">
                                        {project?.project_code}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Project Category:
                                    </td>
                                    <td className="p-2">{project?.category}</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Project Description:
                                    </td>
                                    <td className="p-2 text-justify">
                                        {project?.description}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Start Date:
                                    </td>
                                    <td className="p-2">
                                        {project?.start_date?.slice(0, 10)}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        End Date:
                                    </td>
                                    <td className="p-2">
                                        {project?.end_date?.slice(0, 10)}
                                    </td>
                                </tr>
                                {project?.contractual === 1 && (
                                    <tr className="border-t">
                                        <td className="p-2 font-bold bg-gray-100 border-r">
                                            Budget:
                                        </td>
                                        <td className="p-2">
                                            {currency(project?.budget)}
                                        </td>
                                    </tr>
                                )}
                                {project?.contractual === 0 && (
                                    <tr className="border-t">
                                        <td className="p-2 font-bold bg-gray-100 border-r">
                                            Cost:
                                        </td>
                                        <td className="p-2">
                                            {currency(project?.cost)}
                                        </td>
                                    </tr>
                                )}
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Source:
                                    </td>
                                    <td className="p-2">{project?.source}</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Location:
                                    </td>
                                    <td className="p-2">{project?.location}</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        On-Site Engineer:
                                    </td>
                                    <td className="p-2">
                                        {project?.site_engineer?.name}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Contractual:
                                    </td>
                                    <td className="p-2">
                                        {project?.contractual === 1
                                            ? "Yes"
                                            : "No"}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Contractor:
                                    </td>
                                    <td className="p-2">
                                        {project?.contractual === 1
                                            ? project?.contructor?.company_name
                                            : "Not Contractual"}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Priority:
                                    </td>
                                    <td className="p-2">{project?.priority}</td>
                                </tr>
                                <tr className="border-t border-b">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Status:
                                    </td>
                                    <td className="p-2">{project?.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
