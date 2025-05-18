import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
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
} from "chart.js";
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

export default function LineGraph({ auth, rawData }) {
    const labels = ["Start", ...rawData.dates];

    const datasets = [
        {
            label: "Excavation",
            data: [0, ...rawData.excavation],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
            label: "Concrete Works",
            data: [0, ...rawData.concrete],
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
            label: "Water Works",
            data: [0, ...rawData.water],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
            label: "Metal Works",
            data: [0, ...rawData.metal],
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
        },
        {
            label: "Cement Plaster & Finishes",
            data: [0, ...rawData.plaster],
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
        },
    ];

    const chartData = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <AuthenticatedLayout header="Project Monitoring" auth={auth}>
            <Head title="Project Monitoring" />
            <div className="max-w-7xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    Project Update Performance
                </div>
                <div className="bg-amber-300 font-bold text-md rounded text-gray-700 p-4 mb-4">
                    Project Progress Tracking
                </div>
                <Line data={chartData} options={options} />
            </div>
        </AuthenticatedLayout>
    );
}
