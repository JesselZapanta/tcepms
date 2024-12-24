import { Collapse, Descriptions } from "antd";
const { Panel } = Collapse;
import dayjs from "dayjs";
import React from "react";

export default function Details({ projectDetails }) {
    const formatPeso = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "₱0.00";
        return `₱${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    };

    const items = [
        { label: "Name", span: 3, children: projectDetails.name },
        {
            label: "Description",
            span: 3,
            children: projectDetails.description,
        },
        {
            label: "Start Date",
            span: 2,
            children: projectDetails.start_date
                ? dayjs(projectDetails.start_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "End Date",
            span: 1,
            children: projectDetails.end_date
                ? dayjs(projectDetails.end_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "Actual Start Date",
            span: 2,
            children: projectDetails.actual_start_date
                ? dayjs(projectDetails.actual_start_date).format(
                      "YYYY-MM-DD"
                  )
                : "N/A",
        },
        {
            label: "Actual End Date",
            span: 1,
            children: projectDetails.actual_end_date
                ? dayjs(projectDetails.actual_end_date).format(
                      "YYYY-MM-DD"
                  )
                : "N/A",
        },
        {
            label: "Budget",
            span: 3,
            children: formatPeso(projectDetails.budget),
        },
        {
            label: "Cost",
            span: 3,
            children: formatPeso(projectDetails.cost),
        },
        {
            label: "Source",
            span: 3,
            children: projectDetails.source || "N/A",
        },
        {
            label: "Location",
            span: 3,
            children: projectDetails.location,
        },
        {
            label: "Latitude",
            span: 2,
            children: projectDetails.latitude || "N/A",
        },
        {
            label: "Longitude",
            span: 1,
            children: projectDetails.longitude || "N/A",
        },
        {
            label: "Engineer",
            span: 2,
            children: projectDetails.site_engineer?.name,
        },
        {
            label: "Constructor",
            span: 1,
            children: projectDetails.contructor?.company_name,
        },
        { label: "Status", span: 2, children: projectDetails.status },
        {
            label: "Priority",
            span: 2,
            children: projectDetails.priority,
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
