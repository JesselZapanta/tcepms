import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Spin, Row, Col, Card, Statistic } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

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
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <Statistic
                            title="Total Projects"
                            value={data.projectCount}
                        />
                    </Card>
                    <Card>
                        <Statistic
                            title="Pending Materials"
                            value={data.pendingMaterials}
                        />
                    </Card>
                    <Card>
                        <Statistic
                            title="Pending Labors"
                            value={data.pendingLabors}
                        />
                    </Card>
                    <Card>
                        <Statistic
                            title="Ongoing Projects"
                            value={data.OngoingProjectCount}
                        />
                    </Card>
                    <Card>
                        <Statistic
                            title="Completed Projects"
                            value={data.CompletedProjectCount}
                        />
                    </Card>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
