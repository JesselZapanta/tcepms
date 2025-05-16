import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Spin, Card, Statistic } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import { UserOutlined } from "@ant-design/icons";

export default function Dashboard({ auth }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/mayor/dashboard/getdata");

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
        <AuthenticatedLayout header="Mayor Dashboard" auth={auth}>
            <Head title="Mayor Dashboard" />
            {/* <div className="py-2">Mayor Dashboard</div> */}
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
                                    Mayor{" "}{auth.user.name}
                                </span>
                            </div>
                            <p className="text-sm italic">
                                You are logged in as City Mayor
                            </p>
                        </div>
                    </div>
                    <div className="m-4 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white p-4 rounded ">
                            <h2 className="font-bold text-4xl py-2 text-orange-500">
                                {data.projectCount}
                            </h2>
                            <p className="text-md">Total Projects</p>
                        </div>
                        <div className="bg-white p-4 rounded ">
                            <h2 className="font-bold text-4xl py-2 text-orange-500">
                                {data.OngoingProjectCount}
                            </h2>
                            <p className="text-md">Ongoing Projects</p>
                        </div>
                        <div className="bg-white p-4 rounded ">
                            <h2 className="font-bold text-4xl py-2 text-orange-500">
                                {data.CompletedProjectCount}
                            </h2>
                            <p className="text-md">Completed Projects</p>
                        </div>
                    </div>
                </>
                // <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                //     <Card>
                //         <Statistic
                //             title="Total Projects"
                //             value={data.projectCount}
                //         />
                //     </Card>
                //     <Card>
                //         <Statistic
                //             title="Ongoing Projects"
                //             value={data.OngoingProjectCount}
                //         />
                //     </Card>
                //     <Card>
                //         <Statistic
                //             title="Completed Projects"
                //             value={data.CompletedProjectCount}
                //         />
                //     </Card>
                // </div>
            )}
        </AuthenticatedLayout>
    );
}
