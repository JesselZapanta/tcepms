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

export default function ReportGraft({ rawData, project }) {
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
                position: "bottom",
                labels: {
                    padding: 24, // Adds space below legend
                },
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
        },
    };

    const currency = (amount) =>
        Number(amount).toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
        });

    return (
        <>
            <div className="print-container">
                <div className="flex justify-around">
                    <img
                        src="/images/tangub.png"
                        alt="tangub.png"
                        className="w-32 h-32"
                    />
                    <div className=" text-center">
                        <p>Republic of the Philippines</p>
                        <p>CITY OF TANGUB</p>
                        <p>CITY ENGINEER'S OFFICE</p>
                        <p>CONTRUCTOR'S PROJECTS</p>
                        <p className="uppercase text-lg py-4">
                            Project Update Performance Graph
                        </p>
                    </div>
                    <img
                        src="/images/tcepms.png"
                        alt="tcepms.png"
                        className="w-32 h-32"
                    />
                </div>
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
                                <td className="p-2">{project?.project_code}</td>
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
                                    {project?.contractual === 1 ? "Yes" : "No"}
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
            </div>
            <Line data={chartData} options={options} />
        </>
    );
}
