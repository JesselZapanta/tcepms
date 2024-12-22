import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Descriptions, Collapse } from "antd";
import ExcavationPanel from "./ExcavationPanel";
import ConcretePanel from "./ConcretePanel";
import MetalPanel from "./MetalPanel";
import EquipmentPanel from "./EquipmentPanel";
import WaterPanel from "./WaterPanel";
import PlasterFinishPanel from "./PlasterFinishPanel";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Panel } = Collapse;

export default function Index({ auth, project }) {

    const formatPeso = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "₱0.00";
        return `₱${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    };

    const [CostChange, setCostChange] = useState(true);
    const[costs, setCosts] =useState([]);

    const getCost = async() => {
        console.log(project.id);
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
    }

    useEffect(() => {
        getCost();
    }, [CostChange]);

    return (
        <AuthenticatedLayout header="Material" auth={auth}>
            <Head title="Material" />
            <div className="py-2">
                {/* <pre className="text-gray-900">
                    {JSON.stringify(costs, null, 2)}
                </pre> */}
                <Collapse defaultActiveKey={["1", "8"]}>
                    <Panel header="Project Details" key="1">
                        <Descriptions bordered>
                            <Descriptions.Item label="Name" span={4}>
                                {project.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Description" span={4}>
                                {project.description}
                            </Descriptions.Item>
                            <Descriptions.Item label="Start Date" span={2}>
                                {project.start_date ? dayjs(project.start_date).format("YYYY-MM-DD"): "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="End Date" span={2}>
                                {project.end_date ? dayjs(project.end_date).format("YYYY-MM-DD"): "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="Actual Start Date"
                                span={2}
                            >
                                {project.actual_start_date ? dayjs(project.actual_start_date).format("YYYY-MM-DD"): "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Actual End Date" span={2}>
                                {project.actual_end_date ? dayjs(project.actual_end_date).format("YYYY-MM-DD"): "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Budget" span={4}>
                                {formatPeso(project.budget)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Cost" span={2}>
                                {formatPeso(project.cost)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Source" span={2}>
                                {project.source || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Location" span={4}>
                                {project.location}
                            </Descriptions.Item>
                            <Descriptions.Item label="Latitude" span={2}>
                                {project.latitude || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Longitude" span={2}>
                                {project.longitude || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Engineer" span={2}>
                                {project.engineer}
                            </Descriptions.Item>
                            <Descriptions.Item label="Constructor" span={2}>
                                {project.contructor}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status" span={2}>
                                {project.status}
                            </Descriptions.Item>
                            <Descriptions.Item label="Priority" span={2}>
                                {project.priority}
                            </Descriptions.Item>
                        </Descriptions>
                    </Panel>
                    <Panel header="Excavation" key="2">
                        <ExcavationPanel
                            project={project}
                            setCostChange={setCostChange}
                        />
                    </Panel>
                    <Panel header="Concrete Works" key="3">
                        <ConcretePanel
                            project={project}
                            setCostChange={setCostChange}
                        />
                    </Panel>
                    <Panel header="Water Works" key="4">
                        <WaterPanel project={project} />
                    </Panel>
                    <Panel header="Metal Structure" key="5">
                        <MetalPanel
                            project={project}
                            setCostChange={setCostChange}
                        />
                    </Panel>
                    <Panel header="Cement Plaster and Finishes" key="6">
                        <PlasterFinishPanel
                            project={project}
                            setCostChange={setCostChange}
                        />
                    </Panel>
                    <Panel header="Equipment" key="7">
                        <EquipmentPanel
                            project={project}
                            setCostChange={setCostChange}
                        />
                    </Panel>
                    <Panel header="Cost " key="8">
                        <Descriptions title="Project Costs Summary" bordered>
                            <Descriptions.Item label="Excavation Cost" span={4}>
                                {formatPeso(costs.ExcavationCost)}
                            </Descriptions.Item>

                            <Descriptions.Item label="Concrete Works Cost">
                                {formatPeso(costs.ConcreteWorksCost)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Concrete Labor Cost">
                                {formatPeso(costs.ConcreteLabor)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Concrete Sub Total Cost">
                                {formatPeso(costs.ConcreteSubTotal)}
                            </Descriptions.Item>

                            <Descriptions.Item label="Water Cost">
                                {formatPeso(costs.WaterCost)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Water Labor Cost">
                                {formatPeso(costs.WaterLabor)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Water Sub Total Cost">
                                {formatPeso(costs.WaterSubTotal)}
                            </Descriptions.Item>

                            <Descriptions.Item label="Metal Cost">
                                {formatPeso(costs.MetalCost)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Metal Labor Cost">
                                {formatPeso(costs.MetalLabor)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Metal Sub Total Cost">
                                {formatPeso(costs.MetalSubTotal)}
                            </Descriptions.Item>

                            <Descriptions.Item label="Plaster Finish Cost">
                                {formatPeso(costs.PlasterFinishCost)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Plaster Finish Labor Cost">
                                {formatPeso(costs.PlasterFinishLabor)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Plaster Finish SubTotal Cost">
                                {formatPeso(costs.PlasterFinishSubTotal)}
                            </Descriptions.Item>

                            <Descriptions.Item label="Equipment Cost" span={4}>
                                {formatPeso(costs.EquipmentCost)}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="Estimated Budget"
                                span={2}
                            >
                                {formatPeso(costs.EstimatedBudget)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Total Cost" span={2}>
                                {formatPeso(costs.TotalCost)}
                            </Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
            </div>
        </AuthenticatedLayout>
    );
}
