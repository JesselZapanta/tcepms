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
                                    {dayjs(item.update_date).format(
                                        "h:mm A"
                                    )}
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
            <div className="max-w-7xl mx-auto p-4 mt-4 rounded bg-white">
                <div className="py-2 text-lg font-bold uppercase">
                    Project Updates
                </div>
                {/* <div>{project.updates.update_date}</div> */}
                <div className="py-2">
                    {/* <pre>{JSON.stringify(project, null, 2)}</pre> */}
                    <div className="overflow-x-auto">
                        <Calendar
                            className="p-4"
                            dateCellRender={dateCellRender}
                        />
                    </div>

                    {/* Modal for update progress */}
                    <Modal
                        // title={"Update Progress"}
                        open={modalVisible}
                        onCancel={() => setModalVisible(false)}
                        footer={null}
                    >
                        {selectedUpdate && (
                            <div className="my-4">
                                <Flex wrap="wrap" vertical gap="small">
                                    <div className="font-bold text-lg text-justify">
                                        {selectedUpdate?.name}
                                    </div>
                                    <div className="text-justify">
                                        {selectedUpdate?.description}
                                    </div>
                                    <Tooltip
                                        title={`Progress is at ${selectedUpdate.excavation_progress}%`}
                                    >
                                        <div className="font-bold text-md">
                                            Excavation Progress
                                        </div>
                                        <Progress
                                            percent={
                                                selectedUpdate.excavation_progress
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        title={`Progress is at ${selectedUpdate.concrete_works_progress}%`}
                                    >
                                        <div className="font-bold text-md">
                                            Concrete Works Progress
                                        </div>
                                        <Progress
                                            percent={
                                                selectedUpdate.concrete_works_progress
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        title={`Progress is at ${selectedUpdate.water_works_progress}%`}
                                    >
                                        <div className="font-bold text-md">
                                            Water Works Progress
                                        </div>
                                        <Progress
                                            percent={
                                                selectedUpdate.water_works_progress
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        title={`Progress is at ${selectedUpdate.metal_works_progress}%`}
                                    >
                                        <div className="font-bold text-md">
                                            Metal Works Progress
                                        </div>
                                        <Progress
                                            percent={
                                                selectedUpdate.metal_works_progress
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        title={`Progress is at ${selectedUpdate.cement_plaster_and_finishes_progress}%`}
                                    >
                                        <div className="font-bold text-md">
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
            </div>
        </AuthenticatedLayout>
    );
}
