import { Collapse, Descriptions, Tag } from "antd";
const { Panel } = Collapse;
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function Details({ data }) {

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 639px)"); // Tailwind 'sm' max

        const handleChange = (e) => {
            setIsSmallScreen(e.matches);
        };

        // Set the initial value
        setIsSmallScreen(mediaQuery.matches);

        // Listen for changes
        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    const formatPeso = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "₱0.00";
        return `₱${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    };
    
    const items = [
        { label: "Name", span: 3, children: data.name },
        {
            label: "Description",
            span: 3,
            children: data.description,
        },
        {
            label: "Start Date",
            span: 2,
            children: data.start_date
                ? dayjs(data.start_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "End Date",
            span: 1,
            children: data.end_date
                ? dayjs(data.end_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "Actual Start Date",
            span: 2,
            children: data.actual_start_date
                ? dayjs(data.actual_start_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "Actual End Date",
            span: 1,
            children: data.actual_end_date
                ? dayjs(data.actual_end_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "Budget",
            span: 3,
            children: formatPeso(data.budget),
        },
        {
            label: "Cost",
            span: 3,
            children: formatPeso(data.cost),
        },
        {
            label: "Source",
            span: 3,
            children: data.source || "N/A",
        },
        {
            label: "Location",
            span: 3,
            children: data.location,
        },
        {
            label: "Engineer",
            span: 2,
            children: data.site_engineer?.name,
        },
        {
            label: "Constructor",
            span: 1,
            children: data.contructor?.contractual
                ? data.contructor?.company_name
                : "Not Contructual",
        },
        {
            label: "Status",
            span: 1,
            children:
                data?.status === "Material" ? (
                    <Tag color="orange">Pending Materials</Tag>
                ) : data?.status === "Labor" ? (
                    <Tag color="purple">Pending Labor</Tag>
                ) : data?.status === "Ongoing" ? (
                    <Tag color="blue">Ongoing</Tag>
                ) : data?.status === "Completed" ? (
                    <Tag color="green">Completed</Tag>
                ) : (
                    <Tag color="gray">Unknown</Tag>
                ),
        },

        {
            label: "Priority",
            span: 1,
            children:
                data?.priority === "High" ? (
                    <Tag color="red">High</Tag>
                ) : data?.priority === "Medium" ? (
                    <Tag color="orange">Medium</Tag>
                ) : data?.priority === "Low" ? (
                    <Tag color="green">Low</Tag>
                ) : (
                    <Tag color="gray">Unknown</Tag>
                ),
        },

        {
            label: "Contractual",
            span: 1,
            children:
                data?.contractual === 0 ? (
                    <Tag color="orange">No</Tag>
                ) : data?.contractual === 1 ? (
                    <Tag color="purple">Yes</Tag>
                ) : (
                    <Tag color="gray">Unknown</Tag>
                ),
        },
    ];

    return (
        <Collapse label="Details">
            <Panel header="View Project Details" key="1">
                <Descriptions
                    layout={isSmallScreen ? "vertical" : "horizontal"}
                    bordered
                    items={items}
                />
            </Panel>
        </Collapse>
        // <Collapse>
        //     <Panel header="View Project Details" key="1">
        //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        //             {items.map((item, id) => (
        //                 <div key={id} className="border rounded-md p-2">
        //                     <div className="font-semibold">{item.label}</div>
        //                     <div>{item.children}</div>
        //                 </div>
        //             ))}
        //         </div>
        //     </Panel>
        // </Collapse>
    );
}
