import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Badge, Calendar, Modal, Progress, Tooltip, Flex } from "antd";
import dayjs from "dayjs";
import { Head } from "@inertiajs/react";

export default function UpdateCalendar({ auth, project }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUpdate, setSelectedUpdate] = useState(null);

    const updatesByDate = {};

    // Group updates by date
    project.updates.forEach((update) => {
        const date = dayjs(update.update_date).format("YYYY-MM-DD");
        if (!updatesByDate[date]) {
            updatesByDate[date] = [];
        }
        updatesByDate[date].push(update);
    });

    const showModal = (update) => {
        setSelectedUpdate(update);
        setModalVisible(true);
    };

    const dateCellRender = (value) => {
        const dateStr = value.format("YYYY-MM-DD");
        const updates = updatesByDate[dateStr] || [];

        return (
            <ul className="events">
                {updates.map((item) => (
                    <li key={item.id}>
                        <Badge
                            status="success"
                            text={
                                <button
                                    onClick={() => showModal(item)}
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    {item.name || "Update"}
                                </button>
                            }
                        />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <AuthenticatedLayout header="Project update calendar" auth={auth}>
            <Head title="Project update calendar" />
            <div className="py-2">
                <Calendar className="p-4" dateCellRender={dateCellRender} />

                {/* Modal for update progress */}
                <Modal
                    title={selectedUpdate?.name || "Update Progress"}
                    open={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                >
                    {selectedUpdate && (
                        <div className="my-4 max-w-96">
                            <Flex wrap="wrap" vertical gap="small">
                                <div>{selectedUpdate?.description}</div>
                                <Tooltip
                                    title={`Progress is at ${selectedUpdate.excavation_progress}%`}
                                >
                                    <div>Excavation Progress</div>
                                    <Progress
                                        percent={
                                            selectedUpdate.excavation_progress
                                        }
                                    />
                                </Tooltip>
                                <Tooltip
                                    title={`Progress is at ${selectedUpdate.concrete_works_progress}%`}
                                >
                                    <div>Concrete Works Progress</div>
                                    <Progress
                                        percent={
                                            selectedUpdate.concrete_works_progress
                                        }
                                    />
                                </Tooltip>
                                <Tooltip
                                    title={`Progress is at ${selectedUpdate.water_works_progress}%`}
                                >
                                    <div>Water Works Progress</div>
                                    <Progress
                                        percent={
                                            selectedUpdate.water_works_progress
                                        }
                                    />
                                </Tooltip>
                                <Tooltip
                                    title={`Progress is at ${selectedUpdate.metal_works_progress}%`}
                                >
                                    <div>Metal Works Progress</div>
                                    <Progress
                                        percent={
                                            selectedUpdate.metal_works_progress
                                        }
                                    />
                                </Tooltip>
                                <Tooltip
                                    title={`Progress is at ${selectedUpdate.cement_plaster_and_finishes_progress}%`}
                                >
                                    <div>
                                        Cement Plaster and Finishes Progress
                                    </div>
                                    <Progress
                                        percent={
                                            selectedUpdate.cement_plaster_and_finishes_progress
                                        }
                                    />
                                </Tooltip>
                            </Flex>
                        </div>
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
