import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Descriptions, Collapse } from "antd";
import ExcavationPanel from "./Panel/ExcavationPanel";
import ConcretePanel from "./Panel/ConcretePanel";
import MetalPanel from "./Panel/MetalPanel";
import EquipmentPanel from "./Panel/EquipmentPanel";
import WaterPanel from "./Panel/WaterPanel";
import PlasterFinishPanel from "./Panel/PlasterFinishPanel";
import { useEffect, useState } from "react";
import Details from "./Panel/Details";
import Summary from "./Panel/Summary";

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
                `/staffone/materials/getcost/${project.id}`
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
    const collapseItems = [
        {
            key: "1",
            label: "Project Details",
            children: <Details costs={costs} formatPeso={formatPeso} />,
        },
        {
            key: "2",
            label: "Excavation",
            children: (
                <ExcavationPanel
                    project={project}
                    costs={costs}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "3",
            label: "Concrete Works",
            children: (
                <ConcretePanel
                    project={project}
                    costs={costs}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "4",
            label: "Water Works",
            children: (
                <WaterPanel
                    project={project}
                    costs={costs}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "5",
            label: "Metal Structure",
            children: (
                <MetalPanel
                    project={project}
                    costs={costs}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "6",
            label: "Cement Plaster and Finishes",
            children: (
                <PlasterFinishPanel
                    project={project}
                    costs={costs}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "7",
            label: "Equipment",
            children: (
                <EquipmentPanel
                    project={project}
                    costs={costs}
                    setCostChange={setCostChange}
                />
            ),
        },
        {
            key: "8",
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
        <AuthenticatedLayout header="Material" auth={auth}>
            <Head title="Material" />
            {/* <pre className="text-gray-900">
                {JSON.stringify(costs, null, 2)}
            </pre> */}
            <div className="py-2">
                <Collapse defaultActiveKey={["1", "8"]} items={collapseItems} />
            </div>
        </AuthenticatedLayout>
    );
}
