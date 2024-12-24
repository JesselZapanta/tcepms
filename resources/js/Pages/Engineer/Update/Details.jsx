import { Collapse, Descriptions } from "antd";
const { Panel } = Collapse;
import dayjs from "dayjs";
import React from "react";

export default function Details({ data }) {
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
                ? dayjs(data.actual_start_date).format(
                      "YYYY-MM-DD"
                  )
                : "N/A",
        },
        {
            label: "Actual End Date",
            span: 1,
            children: data.actual_end_date
                ? dayjs(data.actual_end_date).format(
                      "YYYY-MM-DD"
                  )
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
            label: "Latitude",
            span: 2,
            children: data.latitude || "N/A",
        },
        {
            label: "Longitude",
            span: 1,
            children: data.longitude || "N/A",
        },
        {
            label: "Engineer",
            span: 2,
            children: data.site_engineer?.name,
        },
        {
            label: "Constructor",
            span: 1,
            children: data.contructor?.company_name,
        },
        { label: "Status", span: 2, children: data.status },
        {
            label: "Priority",
            span: 2,
            children: data.priority,
        },
    ];

    return (
        <Collapse label="Excavation" >
            <Panel header="View Project Details" key="1">
                <Descriptions bordered items={items} />
            </Panel>
        </Collapse>
    );
    
    
}
