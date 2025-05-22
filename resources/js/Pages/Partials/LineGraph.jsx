import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useRef } from "react";
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
import { Button } from "antd";
import { useReactToPrint } from "react-to-print";

import {  PrinterOutlined } from "@ant-design/icons";

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

export default function LineGraph({ auth, rawData, project }) {
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

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        documentTitle: "Project Update Report",
        content: () => componentRef.current,
    });

    return (
        <AuthenticatedLayout header="Project Monitoring" auth={auth}>
            <Head title="Project Monitoring" />
            <div className="max-w-7xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    Project Progress Performance
                </div>
                <div className="bg-amber-300 font-bold text-md rounded text-gray-700 p-4 mb-4">
                    {project?.name}
                </div>
                {/* <pre>{JSON.stringify(project, null, 2)}</pre> */}
                <div className="w-full flex justify-end">
                    <Button
                        className="md:w-24 w-full"
                        onClick={() => handlePrint()}
                        icon={<PrinterOutlined />}
                    >
                        Print
                    </Button>
                </div>
                <div ref={componentRef}>
                    <div className="print-container mb-8">
                        <div className="flex justify-around">
                            <img
                                src="/images/tangub.png"
                                alt="tangub.png"
                                className="h-48"
                            />
                            <div className="mt-4 text-center">
                                <p>Republic of the Philippines</p>
                                <p>CITY OF TANGUB</p>
                                <p>CITY ENGINEER'S OFFICE</p>
                                <p>CONTRUCTOR'S PROJECTS</p>
                                <p className="mt-2 uppercase text-lg">
                                    Project Update Performance Graph
                                </p>
                                <p className="mt-2 uppercase text-lg">
                                    {project?.name}
                                </p>
                            </div>
                            <img
                                src="/images/tcepms.png"
                                alt="tcepms.png"
                                className="h-48"
                            />
                        </div>
                    </div>
                    <Line data={chartData} options={options} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
