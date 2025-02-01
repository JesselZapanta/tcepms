import { Avatar, Divider, Space, Table, Typography } from "antd";
import Column from "antd/es/table/Column";

const { Text } = Typography;

export default function Report({ contructor, projects, month, year }) {
    return (
        <>
            <pre className="text-gray-900">
                {JSON.stringify(projects, null, 2)}
            </pre>
            <div className="mx-auto bg-white">
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
                                <h2 className="text-lg font-semibold">
                                    {project.name}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {project.description}
                                </p>
                                <div className="mt-2">
                                    <p>
                                        <strong>Category:</strong>{" "}
                                        {project.category}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {project.status}
                                    </p>
                                    <p>
                                        <strong>Priority:</strong>{" "}
                                        {project.priority}
                                    </p>
                                    <p>
                                        <strong>Budget:</strong> $
                                        {project.budget}
                                    </p>
                                    <p>
                                        <strong>Cost:</strong>{" "}
                                        {project.cost
                                            ? `$${project.cost}`
                                            : "N/A"}
                                    </p>
                                    <p>
                                        <strong>Location:</strong>{" "}
                                        {project.location}
                                    </p>
                                    <p>
                                        <strong>Engineer:</strong>{" "}
                                        {project.site_engineer.name}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-semibold">Updates:</h3>
                                    {project.updates.length > 0 ? (
                                        <div className="space-y-2">
                                            {project.updates.map((update) => (
                                                <div
                                                    key={update.id}
                                                    className="border p-2 rounded"
                                                >
                                                    <p>
                                                        <strong>
                                                            {update.name}
                                                        </strong>
                                                    </p>
                                                    <p>{update.description}</p>
                                                    <p>
                                                        <strong>Date:</strong>{" "}
                                                        {update.update_date}
                                                    </p>
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
                                                    </div>
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
