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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { Button } from "antd";
import { useReactToPrint } from "react-to-print";

import { PrinterOutlined } from "@ant-design/icons";
import ReportGraft from "./ReportGraft";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function LineGraph({ auth, rawData, project, badge }) {
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
        responsive: false,
        maintainAspectRatio: false,
        width: 1200,
        plugins: {
            title: {
                display: true,
                text: "Project Progress Graph",
                font: {
                    size: 20,
                },
                padding: {
                    top: 10,
                    bottom: 30,
                },
            },
            legend: {
                position: "bottom",
            },
            datalabels: {
                display: true,
                align: "top", //the 100% is not visible
                formatter: (value) => `${value}%`,
                font: {
                    weight: "bold",
                },
                clip: false,
            },
        },
    };

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        documentTitle: "Project Update Report",
        content: () => componentRef.current,
    });

    return (
        <AuthenticatedLayout
            header="Project Monitoring"
            auth={auth}
            badge={badge}
        >
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
                <div>
                    <div
                        ref={componentRef}
                        className="landscape-print print-container"
                    >
                        <ReportGraft rawData={rawData} project={project} />
                    </div>
                </div>
                {/* working */}
                {/* <div ref={componentRef} className="landscape-print">
                    <ReportGraft rawData={rawData} project={project} />
                </div> */}
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[1200px] h-full">
                        <Line
                            data={chartData}
                            options={options}
                            height={600}
                            width={1200}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
