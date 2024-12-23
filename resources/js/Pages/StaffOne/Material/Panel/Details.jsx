import { Descriptions } from "antd";
import dayjs from "dayjs";
import React from "react";

export default function Details({ costs, formatPeso }) {
    const items = [
        { label: "Name", span: 3, children: costs?.projectDetails?.name },
        {
            label: "Description",
            span: 3,
            children: costs?.projectDetails?.description,
        },
        {
            label: "Start Date",
            span: 2,
            children: costs?.projectDetails?.start_date
                ? dayjs(costs?.projectDetails?.start_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "End Date",
            span: 1,
            children: costs?.projectDetails?.end_date
                ? dayjs(costs?.projectDetails?.end_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "Actual Start Date",
            span: 2,
            children: costs?.projectDetails?.actual_start_date
                ? dayjs(costs?.projectDetails?.actual_start_date).format(
                      "YYYY-MM-DD"
                  )
                : "N/A",
        },
        {
            label: "Actual End Date",
            span: 1,
            children: costs?.projectDetails?.actual_end_date
                ? dayjs(costs?.projectDetails?.actual_end_date).format(
                      "YYYY-MM-DD"
                  )
                : "N/A",
        },
        {
            label: "Budget",
            span: 3,
            children: formatPeso(costs?.projectDetails?.budget),
        },
        {
            label: "Cost",
            span: 3,
            children: formatPeso(costs?.projectDetails?.cost),
        },
        {
            label: "Source",
            span: 3,
            children: costs?.projectDetails?.source || "N/A",
        },
        {
            label: "Location",
            span: 3,
            children: costs?.projectDetails?.location,
        },
        {
            label: "Latitude",
            span: 2,
            children: costs?.projectDetails?.latitude || "N/A",
        },
        {
            label: "Longitude",
            span: 1,
            children: costs?.projectDetails?.longitude || "N/A",
        },
        {
            label: "Engineer",
            span: 2,
            children: costs?.projectDetails?.site_engineer?.name,
        },
        {
            label: "Constructor",
            span: 1,
            children: costs?.projectDetails?.contructor?.company_name,
        },
        { label: "Status", span: 2, children: costs?.projectDetails?.status },
        {
            label: "Priority",
            span: 2,
            children: costs?.projectDetails?.priority,
        },
    ];

    return <Descriptions bordered items={items} />;
}
