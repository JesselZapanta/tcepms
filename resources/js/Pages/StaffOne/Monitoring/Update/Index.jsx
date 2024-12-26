import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Flex,
    Progress,
    Tooltip,
    Timeline,
    Space,
    Spin,
    Empty,
    Avatar,
    Divider,
    Typography,
} from "antd";

import Details from "./Details";
import { useEffect, useState } from "react";
const { Text } = Typography;
import axios from "axios";

export default function Index({ auth, currentProject }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/staffone/project-monitoring/project/getData/${currentProject.id}`
            );
            setData(res.data.projectDetails);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    function formatDate(updateDate) {
        const date = new Date(updateDate);

        return date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    return (
        <AuthenticatedLayout header="Project Update and Timeline" auth={auth}>
            <Head title="Project Update and Timeline" />

            <div className="py-2">
                <Details data={data} />
            </div>
            {/* <pre className="text-gray-900">{JSON.stringify(data, null, 2)}</pre> */}
            <div className="py-2">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spin />
                    </div>
                ) : !data || !data.updates ? (
                    <div className="flex justify-center items-center h-64">
                        <Empty description="No Project found" />
                    </div>
                ) : data.updates.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <Empty description="No updates available for this project" />
                    </div>
                ) : (
                    <Timeline mode="left">
                        {data.updates.map((update) => (
                            <Timeline.Item key={update.id}>
                                <div className="p-4 bg-gray-100 rounded">
                                    <div className="flex justify-between">
                                        <Space direction="vertical">
                                            <Text>
                                                {formatDate(update.update_date)}
                                            </Text>
                                            <Text>{update.name}</Text>
                                        </Space>
                                    </div>
                                    <Divider />

                                    <div>{update.description}</div>
                                    <Divider />
                                    <div className="my-4 max-w-96">
                                        <Flex wrap="wrap" vertical gap="small">
                                            <Tooltip
                                                title={`Progress is at ${update.excavation_progress}`}
                                            >
                                                <div>Excavation Progress</div>
                                                <Progress
                                                    percent={
                                                        update.excavation_progress
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={`Progress is at ${update.concrete_works_progress}`}
                                            >
                                                <div>
                                                    Concrete Works Progress
                                                </div>
                                                <Progress
                                                    percent={
                                                        update.concrete_works_progress
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={`Progress is at ${update.water_works_progress}`}
                                            >
                                                <div>Water Works Progress</div>
                                                <Progress
                                                    percent={
                                                        update.water_works_progress
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={`Progress is at ${update.metal_works_progress}`}
                                            >
                                                <div>Metal Works Progress</div>
                                                <Progress
                                                    percent={
                                                        update.metal_works_progress
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={`Progress is at ${update.cement_plaster_and_finishes_progress}`}
                                            >
                                                <div>
                                                    Cement Plaster and Finishes
                                                    Progress
                                                </div>
                                                <Progress
                                                    percent={
                                                        update.cement_plaster_and_finishes_progress
                                                    }
                                                />
                                            </Tooltip>
                                        </Flex>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        {update.images.map((image) => (
                                            <a
                                                key={image.id}
                                                href={`/storage/project_images/${image.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Avatar
                                                    shape="square"
                                                    size={92}
                                                    src={`/storage/project_images/${image.file_path}`}
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
