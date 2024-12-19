import React, { useState } from "react";
import {
    AppstoreOutlined,
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Link } from "@inertiajs/react";
import { Footer } from "antd/es/layout/layout";
const { Header, Sider, Content } = Layout;
export default function AuthenticatedLayout({ auth, header, children }) {
    const [collapsed, setCollapsed] = useState(false);
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


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
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ minHeight: "100vh" }}
            >
                <div className="w-full h-16 flex items-center justify-center">
                    <div className="font-bold text-lg text-gray-50">TCEMPS</div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    selectedKeys={[currentRoute]}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header className="w-full bg-gray-50 px-0">
                    <div className="w-full flex items-center justify-between">
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                        {/* <div className="px-4">{auth?.user?.name}</div> */}
                        <div className="px-4">
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            label: (
                                                <Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Link>
                                            ),
                                            key: "dashboard",
                                            icon: <AppstoreOutlined />,
                                        },
                                        {
                                            label: (
                                                <Link
                                                    href={route("logout")}
                                                    method="post"
                                                >
                                                    Log out
                                                </Link>
                                            ),
                                            key: "logout",
                                            icon: <AppstoreOutlined />,
                                        },
                                    ],
                                }}
                                trigger={["click"]}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {auth?.user?.name}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <div className="p-4">
                    <p className="text-gray-400">
                        Home / <span className="text-gray-700">{header}</span>{" "}
                    </p>
                </div>
                <Content
                    style={{
                        margin: "0 16px",
                        padding: 24,
                        minHeight: "80vh",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
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
    );
};
