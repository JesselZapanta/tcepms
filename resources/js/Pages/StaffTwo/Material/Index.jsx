import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Descriptions, Collapse,  } from "antd";
import ExcavationPanel from './ExcavationPanel';
import ConcretePanel from './ConcretePanel';

const { Panel } = Collapse;

export default function Index({ auth, project }) {

    return (
        <AuthenticatedLayout header="Material" auth={auth}>
            <Head title="Material" />
            <div className="py-2">
                {/* <pre className="text-gray-900">
                    {JSON.stringify(project, null, 2)}
                </pre> */}
                <Collapse defaultActiveKey={["1"]}>
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
                    <Panel header="Metal Structure" key="4"></Panel>
                    <Panel header="Equipment " key="5"></Panel>
                </Collapse>
            </div>
        </AuthenticatedLayout>
    );
}
