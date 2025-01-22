import { Descriptions, Tag } from "antd";
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
        {
            label: "Status",
            span: 1,
            children:
                costs?.projectDetails?.status === "Material" ? (
                    <Tag color="orange">Pending Materials</Tag>
                ) : costs?.projectDetails?.status === "Labor" ? (
                    <Tag color="purple">Pending Labor</Tag>
                ) : costs?.projectDetails?.status === "Ongoing" ? (
                    <Tag color="blue">Ongoing</Tag>
                ) : costs?.projectDetails?.status === "Completed" ? (
                    <Tag color="green">Completed</Tag>
                ) : (
                    <Tag color="gray">Unknown</Tag>
                ),
        },

        {
            label: "Priority",
            span: 1,
            children:
                costs?.projectDetails?.priority === "High" ? (
                    <Tag color="red">High</Tag>
                ) : costs?.projectDetails?.priority === "Medium" ? (
                    <Tag color="orange">Medium</Tag>
                ) : costs?.projectDetails?.priority === "Low" ? (
                    <Tag color="green">Low</Tag>
                ) : (
                    <Tag color="gray">Unknown</Tag>
                ),
        },
        {
            label: "Contractual",
            span: 1,
            children:
                costs?.projectDetails?.contractual === 0 ? (
                    <Tag color="orange">No</Tag>
                ) : costs?.projectDetails?.contractual === 1 ? (
                    <Tag color="purple">Yes</Tag>
                ) : (
                    <Tag color="gray">Unknown</Tag>
                ),
        },
    ];

    return <Descriptions bordered items={items} />;
}
