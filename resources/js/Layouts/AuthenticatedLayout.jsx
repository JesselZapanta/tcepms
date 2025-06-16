import React, { useState } from "react";
import {
    AppstoreOutlined,
    BankOutlined,
    CalendarOutlined,
    DashboardOutlined,
    DollarCircleOutlined,
    DownOutlined,
    LineChartOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoneyCollectOutlined,
    ProjectOutlined,
    TagsOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Dropdown,
    Layout,
    Menu,
    Space,
    theme,
} from "antd";
import { Link } from "@inertiajs/react";
import { Footer } from "antd/es/layout/layout";
const { Header, Sider, Content } = Layout;
export default function AuthenticatedLayout({ auth, header, children, badge }) {
    const [collapsed, setCollapsed] = useState(true);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const currentRoute = route().current();

    // Admin
    const adminLinks = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "admin.dashboard",
            icon: <DashboardOutlined />,
        },
        {
            label: <Link href={route("admin.user")}>User</Link>,
            key: "admin.user",
            icon: <TeamOutlined />,
        },
        {
            label: <Link href={route("admin.contructor")}>Contructor</Link>,
            key: "admin.contructor",
            icon: <BankOutlined />,
        },
        {
            label: <Link href={route("admin.category")}>Category</Link>,
            key: "admin.category",
            icon: <TagsOutlined />,
        },
        {
            label: <Link href={route("admin.fund")}>Fund Source</Link>,
            key: "admin.fund",
            icon: <DollarCircleOutlined />,
        },
        {
            label: (
                <Link href={route("admin.project")}>
                    <div className="flex justify-between items-center gap-2">
                        Project
                        {/* <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.ongoingProject ? badge?.ongoingProject : 0}
                        </span> */}
                    </div>
                </Link>
            ),
            key: "admin.project",
            icon: <ProjectOutlined />,
        },

        {
            label: (
                <Link href={route("admin.project-request-extension")}>
                    <div className="flex justify-between items-center gap-2">
                        Request Extention
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.requestExtension
                                ? badge?.requestExtension
                                : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "admin.project-request-extension",
            icon: <CalendarOutlined />,
        },
        {
            label: (
                <Link href={route("admin.project-monitoring")}>
                    <div className="flex justify-between items-center gap-2">
                        Project Monitoring
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.ongoingProject ? badge?.ongoingProject : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "admin.project-monitoring",
            icon: <LineChartOutlined />,
        },
    ];

    const staffOneLinks = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "staffone.dashboard",
            icon: <DashboardOutlined />,
        },
        {
            label: (
                <Link href={route("staffone.project")}>
                    <div className="flex justify-between items-center gap-2">
                        Project
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.pendingMaterials
                                ? badge?.pendingMaterials
                                : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "staffone.project",
            icon: <ProjectOutlined />,
        },
        {
            label: (
                <Link href={route("staffone.project-monitoring")}>
                    <div className="flex justify-between items-center gap-2">
                        Project Monitoring
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.ongoingProject ? badge?.ongoingProject : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "staffone.project-monitoring",
            icon: <LineChartOutlined />,
        },
    ];

    const staffTwoLinks = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "stafftwo.dashboard",
            icon: <DashboardOutlined />,
        },
        {
            label: (
                <Link href={route("stafftwo.project")}>
                    <div className="flex justify-between items-center gap-2">
                        Project
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.pendingLabor
                                ? badge?.pendingLabor
                                : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "stafftwo.project",
            icon: <ProjectOutlined />,
        },
        {
            label: (
                <Link href={route("stafftwo.project-monitoring")}>
                    <div className="flex justify-between items-center gap-2">
                        Project Monitoring
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.ongoingProject ? badge?.ongoingProject : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "stafftwo.project-monitoring",
            icon: <LineChartOutlined />,
        },
    ];

    const engineerLinks = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "engineer.dashboard",
            icon: <DashboardOutlined />,
        },
        {
            label: (
                <Link href={route("engineer.project")}>
                    <div className="flex justify-between items-center gap-2">
                        Project
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.assingedOngoingProject
                                ? badge?.assingedOngoingProject
                                : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "engineer.project",
            icon: <ProjectOutlined />,
        },
        {
            label: (
                <Link href={route("engineer.project-monitoring")}>
                    <div className="flex justify-between items-center gap-2">
                        Project Monitoring
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.assingedOngoingProject
                                ? badge?.assingedOngoingProject
                                : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "engineer.project-monitoring",
            icon: <LineChartOutlined />,
        },
    ];

    const mayorLinks = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "mayor.dashboard",
            icon: <DashboardOutlined />,
        },
        {
            label: (
                <Link href={route("mayor.project")}>
                    <div className="flex justify-between items-center gap-2">
                        Project
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.ongoingProject ? badge?.ongoingProject : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "mayor.project",
            icon: <ProjectOutlined />,
        },
        {
            label: (
                <Link href={route("mayor.project-monitoring")}>
                    <div className="flex justify-between items-center gap-2">
                        Project Monitoring
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {badge?.ongoingProject ? badge?.ongoingProject : 0}
                        </span>
                    </div>
                </Link>
            ),
            key: "mayor.project-monitoring",
            icon: <LineChartOutlined />,
        },
    ];

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                breakpoint="lg"
                collapsed={collapsed}
                onCollapse={(collapsedValue) => setCollapsed(collapsedValue)}
                // style={{ minHeight: "100vh" }}
                className="min-h-screen p-4 bg-orange-200"
                width="300"
            >
                <div className="w-full flex justify-center gap-2 mb-4">
                    <Avatar
                        className={collapsed ? "w-6 h-6" : "w-32 h-32"}
                        shape="circle"
                        src="/images/tangub.jpg"
                        alt="Tangub City Logo"
                    />
                    <Avatar
                        className={collapsed ? "w-6 h-6" : "w-32 h-32"}
                        shape="circle"
                        src="/images/tcepms.png"
                        alt="Tangub City Engineering Office Logo"
                    />
                    {/* <div className="font-bold text-lg text-gray-50 hidden lg:block">
                        TCEMPS
                    </div> */}
                </div>

                {auth.user.role === 0 && (
                    <Menu
                        // theme="dark"
                        className="custom-menu bg-orange-200"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        selectedKeys={[currentRoute]}
                        items={adminLinks}
                    />
                )}
                {auth.user.role === 1 && (
                    <Menu
                        // theme="dark"
                        className="custom-menu bg-orange-200"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        selectedKeys={[currentRoute]}
                        items={staffOneLinks}
                    />
                )}
                {auth.user.role === 2 && (
                    <Menu
                        // theme="dark"
                        className="custom-menu bg-orange-200"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        selectedKeys={[currentRoute]}
                        items={staffTwoLinks}
                    />
                )}
                {auth.user.role === 3 && (
                    <Menu
                        // theme="dark"
                        className="custom-menu bg-orange-200"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        selectedKeys={[currentRoute]}
                        items={engineerLinks}
                    />
                )}
                {auth.user.role === 4 && (
                    <Menu
                        // theme="dark"
                        className="custom-menu bg-orange-200"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        selectedKeys={[currentRoute]}
                        items={mayorLinks}
                    />
                )}
            </Sider>
            <Layout>
                <Header className="w-full bg-white px-0">
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
                        <div className="px-8">
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
                                            icon: <UserOutlined />,
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
                                            icon: <LogoutOutlined />,
                                        },
                                    ],
                                }}
                                trigger={["click"]}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    {/* <Space>
                                        {auth?.user?.name}
                                        <DownOutlined />
                                    </Space> */}
                                    <Avatar
                                        className="border-orange-500"
                                        size="large"
                                        icon={<UserOutlined />}
                                    />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                {/* <div className="p-4">
                    <p className="text-gray-400">
                        Home / <span className="text-gray-700">{header}</span>{" "}
                    </p>
                </div> */}
                <Content
                    className="bg-orange-50"
                    // style={{
                    //     margin: "0 16px",
                    //     padding: "2px",
                    //     minHeight: "80vh",
                    //     borderRadius: borderRadiusLG,
                    //     // background: `url('/images/bgg.png')`,
                    //     // backgroundSize: "cover",
                    //     // backgroundPosition: "center",
                    // }}
                >
                    {children}
                </Content>

                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    TCEMPS ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
}
