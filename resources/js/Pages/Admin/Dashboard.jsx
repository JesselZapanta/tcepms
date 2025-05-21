import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Spin, Card, Statistic } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({ auth }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const chartData = {
        labels: [
            "2025-01-01",
            "2025-01-05",
            "2025-01-10",
            "2025-01-15",
            "2025-01-20",
            "2025-01-25",
            "2025-01-30",
        ],
        datasets: [
            {
                label: "Excavation Progress",
                data: [0.0, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Concrete Works Progress",
                data: [0.0, 0.05, 0.15, 0.3, 0.5, 0.75, 1.0],
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Water Works Progress",
                data: [0.0, 0.1, 0.25, 0.45, 0.65, 0.85, 1.0],
                borderColor: "rgb(255, 206, 86)",
                backgroundColor: "rgba(255, 206, 86, 0.5)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Metal Works Progress",
                data: [0.0, 0.05, 0.2, 0.4, 0.6, 0.85, 1.0],
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Cement Plaster and Finishes Progress",
                data: [0.0, 0.1, 0.2, 0.35, 0.5, 0.75, 1.0],
                borderColor: "rgb(153, 102, 255)",
                backgroundColor: "rgba(153, 102, 255, 0.5)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            // title: {
            //     display: true,
            //     text: "Project Progress Tracking",
            // },
        },
    };
    

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/admin/dashboard/getdata");

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
        <AuthenticatedLayout header="Admin Dashboard" auth={auth}>
            <Head title="Admin Dashboard" />
            {/* <div className="py-2">Admin Dashboard</div> */}
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
                                You are logged in as Administrator (Officer in
                                Charge)
                            </p>
                        </div>
                    </div>
                    <div className="m-4 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white p-4 rounded ">
                            <h2 className="font-bold text-4xl py-2 text-orange-500">
                                {data.activeUserCount}
                            </h2>
                            <p className="text-md">Active Users</p>
                        </div>
                        <div className="bg-white p-4 rounded ">
                            <h2 className="font-bold text-4xl py-2 text-orange-500">
                                {data.activeContructorCount}
                            </h2>
                            <p className="text-md">Active Contractors</p>
                        </div>
                        <div className="bg-white p-4 rounded ">
                            <h2 className="font-bold text-4xl py-2 text-orange-500">
                                {data.projectCount}
                            </h2>
                            <p className="text-md">Total Projects</p>
                        </div>
                        <div className="bg-white p-4 rounded ">
                            <h2 className="font-bold text-4xl py-2 text-orange-500">
                                {data.pendingMaterials}
                            </h2>
                            <p className="text-md">Pending Materials</p>
                        </div>
                        <div className="bg-white p-4 rounded ">
                            <h2 className="font-bold text-4xl py-2 text-orange-500">
                                {data.pendingLabors}
                            </h2>
                            <p className="text-md">Pending Labor</p>
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
                        <div className="bg-white p-4 rounded ">
                            <h2 className="font-bold text-4xl py-2 text-orange-500">
                                {data.pendingRequest}
                            </h2>
                            <p className="text-md">Pending Date Request</p>
                        </div>
                    </div>
                    {/* <div className="bg-white m-4 p-4 rounded-2xl shadow-md grid md:grid-cols-1 lg:grid-cols-2">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">
                                Project Progress Tracking
                            </h2>
                            <Line data={chartData} options={options} />
                        </div>
                    </div> */}
                </>
            )}
        </AuthenticatedLayout>
    );
}
