import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Descriptions, Collapse } from "antd";
import ExcavationPanel from "./ExcavationPanel";
import ConcretePanel from "./ConcretePanel";
import MetalPanel from "./MetalPanel";
import EquipmentPanel from "./EquipmentPanel";
import WaterPanel from "./WaterPanel";
import PlasterFinishPanel from "./PlasterFinishPanel";
import { useState } from "react";

const { Panel } = Collapse;

export default function Index({ auth, project, costs }) {

    const formatPeso = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "₱0.00";
        return `₱${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    };

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
                            <Descriptions.Item label="Name">
                                {project.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Description">
                                {project.description}
                            </Descriptions.Item>
                            <Descriptions.Item label="Start Date">
                                {project.start_date}
                            </Descriptions.Item>
                            <Descriptions.Item label="End Date">
                                {project.end_date}
                            </Descriptions.Item>
                            <Descriptions.Item label="Actual Start Date">
                                {project.actual_start_date || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Actual End Date">
                                {project.actual_end_date || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Budget">
                                {project.budget}
                            </Descriptions.Item>
                            <Descriptions.Item label="Cost">
                                {project.cost}
                            </Descriptions.Item>
                            <Descriptions.Item label="Source">
                                {project.source || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Location">
                                {project.location}
                            </Descriptions.Item>
                            <Descriptions.Item label="Latitude">
                                {project.latitude || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Longitude">
                                {project.longitude || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Engineer">
                                {project.engineer}
                            </Descriptions.Item>
                            <Descriptions.Item label="Constructor">
                                {project.contructor}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {project.status}
                            </Descriptions.Item>
                            <Descriptions.Item label="Priority">
                                {project.priority}
                            </Descriptions.Item>
                        </Descriptions>
                    </Panel>
                    <Panel header="Excavation" key="2">
                        <ExcavationPanel project={project} />
                    </Panel>
                    <Panel header="Concrete Works" key="3">
                        <ConcretePanel project={project} />
                    </Panel>
                    <Panel header="Water Works" key="4">
                        <WaterPanel project={project} />
                    </Panel>
                    <Panel header="Metal Structure" key="5">
                        <MetalPanel project={project} />
                    </Panel>
                    <Panel header="Cement Plaster and Finishes" key="6">
                        <PlasterFinishPanel project={project} />
                    </Panel>
                    <Panel header="Equipment" key="7">
                        <EquipmentPanel project={project}/>
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
