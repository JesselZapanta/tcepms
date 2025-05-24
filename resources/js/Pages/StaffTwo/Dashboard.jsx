import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Spin, Row, Col, Card, Statistic } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";


export default function Dashboard({ auth }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    
    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/stafftwo/dashboard/getdata");

            setData(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <AuthenticatedLayout header="Staff Two Dashboard" auth={auth}>
            <Head title="Staff Two Dashboard" />
            {/* <div className="py-2">Staff Two Dashboard</div> */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin />
                </div>
            ) : (
                // <pre className="text-gray-900">
                //     {JSON.stringify(data, null, 2)}
                // </pre>
                <>
                    <div className="bg-amber-300 m-4 p-4 font-bold text-2xl rounded">
                        DASHBOARD
                    </div>
                    <div className="bg-white m-4 p-4 rounded flex">
                        <UserOutlined className="text-5xl mr-4" />
                        <div>
                            <div className="text-2xl uppercase">
                                Welcome back,{" "}
                                <span className="font-bold text-orange-500">
                                    {auth.user.name}
                                </span>
                            </div>
                            <p className="text-sm italic">
                                You are logged in as Staff (Project and Labor
                                Division)
                            </p>
                        </div>
                    </div>
                    <div className="m-4 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        <Link href={route("stafftwo.project")}>
                            <div className="bg-white p-4 rounded ">
                                <h2 className="font-bold text-4xl py-2 text-orange-500">
                                    {data.projectCount}
                                </h2>
                                <p className="text-md">Total Projects</p>
                            </div>
                        </Link>
                        {/* <Link href={route("stafftwo.project")}>
                            <div className="bg-white p-4 rounded ">
                                <h2 className="font-bold text-4xl py-2 text-orange-500">
                                    {data.pendingMaterials}
                                </h2>
                                <p className="text-md">Pending Materials</p>
                            </div>
                        </Link> */}
                        <Link href={route("stafftwo.project")}>
                            <div className="bg-white p-4 rounded ">
                                <h2 className="font-bold text-4xl py-2 text-orange-500">
                                    {data.pendingLabors}
                                </h2>
                                <p className="text-md">Pending Labor</p>
                            </div>
                        </Link>
                        <Link href={route("stafftwo.project-monitoring")}>
                            <div className="bg-white p-4 rounded ">
                                <h2 className="font-bold text-4xl py-2 text-orange-500">
                                    {data.OngoingProjectCount}
                                </h2>
                                <p className="text-md">Ongoing Projects</p>
                            </div>
                        </Link>
                        <Link href={route("stafftwo.project-monitoring")}>
                            <div className="bg-white p-4 rounded ">
                                <h2 className="font-bold text-4xl py-2 text-orange-500">
                                    {data.CompletedProjectCount}
                                </h2>
                                <p className="text-md">Completed Projects</p>
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
