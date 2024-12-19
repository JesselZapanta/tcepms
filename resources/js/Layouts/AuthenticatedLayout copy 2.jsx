import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";
import { Footer, Header } from "antd/es/layout/layout";
import { Link } from "@inertiajs/react";

const { Sider, Content } = Layout;



export default function AuthenticatedLayout({ auth, header, children }) {
    const currentRoute = route().current();

    // Define the menu items
    const items = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "dashboard",
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link href={route("admin.user")}>User</Link>,
            key: "admin.user",
            icon: <UserOutlined />,
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Header */}
            <Header style={{ background: "#001529", padding: "0 16px" }}>
                <div
                    style={{
                        height: 64,
                        textAlign: "center",
                        lineHeight: "64px",
                        color: "white",
                    }}
                    className="w-full flex justify-between"
                >
                    <div className="font-bold text-xl flex items-center">
                        TCEMPS
                    </div>
                    <div>{auth?.user?.name}</div>
                </div>
            </Header>
            <Layout>
                {/* Sidebar */}
                <Sider theme="dark" collapsible>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        selectedKeys={[currentRoute]}
                        items={items}
                    />
                </Sider>
                {/* Main Content */}
                <Layout>
                    {/* Breadcrumb */}
                    <div style={{ padding: "16px" }}>
                        <Breadcrumb>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>{header}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <Content
                        style={{
                            margin: "16px",
                            padding: 24,
                            background: "#fff",
                        }}
                    >
                        <div style={{ minHeight: "85vh" }}>{children}</div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Ant Design ©{new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};
