import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Collapse } from "antd";
import { useEffect, useState } from "react";
import Details from "../Panel/Details";
import ConcreteLabor from "../Panel/ConcreteLabor";
import Summary from "../Panel/Summary";
import WaterLabor from "../Panel/WaterLabor";
import MetalLabor from "../Panel/MetalLabor";
import PlasterFinishLabor from "../Panel/PlasterFinishLabor";

export default function Index({ auth, project }) {
    const formatPeso = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "₱0.00";
        return `₱${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    };

    const [CostChange, setCostChange] = useState(true);
    const [costs, setCosts] = useState([]);

    const getCost = async () => {
        try {
            const res = await axios.get(
                `/stafftwo/labor/getcost/${project.id}`
            );
            setCosts(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setCostChange(false);
        }
    };

    useEffect(() => {
        getCost();
    }, [CostChange]);

    // Define items for Collapse
    const collapseItems1 = [
        {
            key: "1",
            label: "Project Details",
            children: <Details costs={costs} formatPeso={formatPeso} />,
        },
        {
            key: "2",
            label: "Labors Details",
            children: (
                <div className="text-center">
                    No labors details for contructual projects.
                </div>
            ),
        },
    ];
    const collapseItems2 = [
        {
            key: "1",
            label: "Project Details",
            children: <Details costs={costs} formatPeso={formatPeso} />,
        },
        {
            key: "2",
            label: "Concrete Labor Details",
            children: (
                <ConcreteLabor
                    costs={costs}
                    formatPeso={formatPeso}
                    project={project}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "3",
            label: "Water Labor Details",
            children: (
                <WaterLabor
                    costs={costs}
                    formatPeso={formatPeso}
                    project={project}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "4",
            label: "Metal Labor Details",
            children: (
                <MetalLabor
                    costs={costs}
                    formatPeso={formatPeso}
                    project={project}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "5",
            label: "Cement Plaster and Finishes Labor Details",
            children: (
                <PlasterFinishLabor
                    costs={costs}
                    formatPeso={formatPeso}
                    project={project}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "7",
            label: "Cost",
            children: (
                <Summary
                    costs={costs}
                    formatPeso={formatPeso}
                    setCostChange={setCostChange}
                />
            ),
        },
    ];

    return (
        <AuthenticatedLayout header="Labors" auth={auth}>
            <Head title="Labors" />
            {/* <pre className="text-gray-900">
                {JSON.stringify(costs, null, 2)}
            </pre> */}
            {/* <div className="py-2">
                <Collapse defaultActiveKey={["1","7"]} items={collapseItems} />
            </div> */}
            <div className="max-w-7xl p-4 mt-4 rounded bg-white mx-auto">
                <div className="py-2 text-lg font-bold uppercase">
                    Project Labor
                </div>
                {costs.projectDetails?.contractual === 1 ? (
                    <Collapse defaultActiveKey={["2"]} items={collapseItems1} />
                ) : (
                    <Collapse defaultActiveKey={["7"]} items={collapseItems2} />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
