import { Avatar, Divider, Space, Table, Typography } from "antd";
import Column from "antd/es/table/Column";

const { Text } = Typography;

export default function Report({ contructor, projects }) {
    return (
        <>
            {/* <pre className="text-gray-900">
                {JSON.stringify(projects, null, 2)}
            </pre> */}
            <div className="print-container mx-auto bg-white">
                <div className="p-2 font-times">
                    <div className="flex justify-around">
                        <img
                            src="/images/tangub.png"
                            alt="tangub.png"
                            className="w-32"
                        />
                        <div className="mt-4 text-center">
                            <p>Republic of the Philippines</p>
                            <p>CITY OF TANGUB</p>
                            <p>CITY OF ENGINEER'S OFFICE</p>
                            <p>CONTRUCTOR'S PROJECTS</p>
                            <p className="mt-2 uppercase text-lg">
                                {contructor}
                            </p>
                        </div>
                        <img
                            src="/images/tcepms.png"
                            alt="tcepms.png"
                            className="w-32"
                        />
                    </div>
                    {/* <Space className="mt-4" direction="vertical">
                        <Text>Project Name: {project.name}</Text>
                        <Text>Project Description: {project.description}</Text>
                    </Space> */}

                    <Divider />
                    <div className="p-4 space-y-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="border p-4 rounded-lg shadow"
                            >
                                <Space direction="vertical">
                                    <Text>Project Name: {project.name}</Text>
                                    <Text>
                                        Project Description:{" "}
                                        {project.description}
                                    </Text>
                                    <Text>Category: {project.category}</Text>
                                    <Text>Status: {project.status}</Text>
                                    <Text>Priority: {project.priority}</Text>
                                    <Text>Budget: ${project.budget}</Text>
                                    <Text>
                                        Cost:{" "}
                                        {project.cost
                                            ? `$${project.cost}`
                                            : "N/A"}
                                    </Text>
                                    <Text>Location: {project.location}</Text>
                                    <Text>
                                        Engineer: {project.site_engineer.name}
                                    </Text>
                                </Space>

                                <div className="mt-4">
                                    <Text className="font-bold">
                                        Project Progress
                                    </Text>

                                    {project.updates.length > 0 ? (
                                        <div className="space-y-2">
                                            {project.updates.map((update) => (
                                                <div
                                                    key={update.id}
                                                    className="border p-2 rounded"
                                                >
                                                    <div className="table-container">
                                                        <Table
                                                            className="mt-2"
                                                            dataSource={[
                                                                {
                                                                    key: "1",
                                                                    description:
                                                                        "Excavation Progress",
                                                                    progress: `${update.excavation_progress}%`,
                                                                },
                                                                {
                                                                    key: "2",
                                                                    description:
                                                                        "Concrete Works Progress",
                                                                    progress: `${update.concrete_works_progress}%`,
                                                                },
                                                                {
                                                                    key: "3",
                                                                    description:
                                                                        "Water Works Progress",
                                                                    progress: `${update.water_works_progress}%`,
                                                                },
                                                                {
                                                                    key: "4",
                                                                    description:
                                                                        "Metal Works Progress",
                                                                    progress: `${update.metal_works_progress}%`,
                                                                },
                                                                {
                                                                    key: "5",
                                                                    description:
                                                                        "Cement Plaster and Finishes Progress",
                                                                    progress: `${update.cement_plaster_and_finishes_progress}%`,
                                                                },
                                                            ]}
                                                            rowKey={(record) =>
                                                                record.key
                                                            }
                                                            pagination={false}
                                                        >
                                                            <Column
                                                                title="Description"
                                                                dataIndex="description"
                                                                key="description"
                                                            />
                                                            <Column
                                                                title="Progress"
                                                                dataIndex="progress"
                                                                key="progress"
                                                            />
                                                        </Table>
                                                    </div>
                                                    {/* <Text className="font-bold">
                                                        Update Images
                                                    </Text>
                                                    <div className="flex space-x-2 mt-2">
                                                        {update.images.map(
                                                            (image) => (
                                                                <img
                                                                    key={
                                                                        image.id
                                                                    }
                                                                    src={`/storage/project_images//${image.file_path}`}
                                                                    alt="Project Update"
                                                                    className="w-16 h-16 object-cover rounded"
                                                                />
                                                            )
                                                        )}
                                                    </div> */}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">
                                            No updates available.
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
