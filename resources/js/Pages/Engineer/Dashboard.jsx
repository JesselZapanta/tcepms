import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Spin, Row, Col, Card, Statistic } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { useReactToPrint } from "react-to-print";

export default function Dashboard({ auth }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/engineer/dashboard/getdata");

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
        <AuthenticatedLayout header="Engineer Dashboard" auth={auth}>
            <Head title="Engineer Dashboard" />
            {/* <div className="py-2">Engineer Dashboard</div> */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin />
                </div>
            ) : (
                // <pre className="text-gray-900">
                //     {JSON.stringify(data, null, 2)}
                // </pre>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <Statistic
                            title="Total Assigned Projects"
                            value={data.projectCount}
                        />
                    </Card>
                    <Card>
                        <Statistic
                            title="Ongoing Assigned Projects"
                            value={data.OngoingProjectCount}
                        />
                    </Card>
                    <Card>
                        <Statistic
                            title="Completed Assigned Projects"
                            value={data.CompletedProjectCount}
                        />
                    </Card>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
