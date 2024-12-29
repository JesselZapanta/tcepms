import { Avatar, Divider, Space, Table, Typography } from "antd";
import Column from "antd/es/table/Column";

const { Text } = Typography;

export default function Report({ formatDate, project }) {
    return (
        <>
            <div className="print-container mx-auto bg-white">
                <div className="p-2 font-times">
                    <div className="flex justify-around">
                        <img
                            src="/storage/images/tangub.png"
                            alt="tangub.png"
                            className="w-32"
                        />
                        <div className="mt-4 text-center">
                            <p>Republic of the Philippines</p>
                            <p>CITY OF TANGUB</p>
                            <p>CITY OF ENGINEER'S OFFICE</p>
                            <p>PROJECT UPDATE</p>
                        </div>
                        <img
                            src="/storage/images/tcepms.png"
                            alt="tcepms.png"
                            className="w-32"
                        />
                    </div>
                    <Space className="mt-4" direction="vertical">
                        <Text>Project Name: {project.name}</Text>
                        <Text>Project Description: {project.description}</Text>
                    </Space>

                    <Divider />

                    {project?.updates?.length > 0 ? (
                        project.updates.map((update) => (
                            <div key={update.id}>
                                <Space direction="vertical">
                                    <Text>
                                        Update Date:{" "}
                                        {formatDate(update.update_date)}
                                    </Text>
                                    <Text>
                                        Site Engineer:{" "}
                                        {update.site_engineer?.name}
                                    </Text>
                                    <Text>Update Name: {update.name}</Text>
                                    <Text>
                                        Update Description: {update.description}
                                    </Text>
                                </Space>

                                <div className="mt-4">
                                    <Text className="font-bold">
                                        Project Progress
                                    </Text>

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
                                            rowKey={(record) => record.key}
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
                                </div>

                                <div className="page-break"></div>

                                <div className="mt-4">
                                    <Text className="font-bold">
                                        Project Progress Images
                                    </Text>
                                    <div className="flex mt-2 flex-wrap gap-4">
                                        {update.images.map((img) => (
                                            <div key={img.id}>
                                                <Avatar
                                                    shape="square"
                                                    size={190}
                                                    src={`/storage/project_images/${img.file_path}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Divider />
                            </div>
                        ))
                    ) : (
                        <Text>No updates found</Text>
                    )}
                </div>
            </div>
        </>
    );
}


