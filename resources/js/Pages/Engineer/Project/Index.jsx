import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Avatar,
    Button,
    Card,
    Carousel
} from "antd";
import Search from "antd/es/input/Search";
import {
    PlusOutlined,
    EditOutlined,
    SettingOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useState } from "react";

const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

export default function Index({ auth }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);

        try{

            const res = await axios.get('');

            setData(res.data.data);

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    return (
        <AuthenticatedLayout header="Project Monitoring" auth={auth}>
            <Head title="Project Monitoring" />
            <div className="py-2">
                <div className="py-2">List of Project</div>
                <div className="flex gap-2 mb-2">
                    <Search
                        placeholder="Input project name"
                        allowClear
                        enterButton="Search"
                        // loading={searching}
                        // onChange={(e) => setSearch(e.target.value)}
                        // onSearch={() => getData(true)}
                    />
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <Card
                        style={{
                            // width: 300,
                            overflow: "hidden",
                        }}
                        cover={
                            <>
                                <Carousel arrows infinite={true}>
                                    <div>
                                        <h3 style={contentStyle}>1</h3>
                                    </div>
                                    <div>
                                        <h3 style={contentStyle}>2</h3>
                                    </div>
                                    <div>
                                        <h3 style={contentStyle}>3</h3>
                                    </div>
                                    <div>
                                        <h3 style={contentStyle}>4</h3>
                                    </div>
                                </Carousel>
                            </>
                        }
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>

                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
