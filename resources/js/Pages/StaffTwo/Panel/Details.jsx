import { Descriptions, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function Details({ costs, formatPeso }) {
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
        // {
        //     label: "Actual Start Date",
        //     span: 2,
        //     children: costs?.projectDetails?.actual_start_date
        //         ? dayjs(costs?.projectDetails?.actual_start_date).format(
        //               "YYYY-MM-DD"
        //           )
        //         : "N/A",
        // },
        // {
        //     label: "Actual End Date",
        //     span: 1,
        //     children: costs?.projectDetails?.actual_end_date
        //         ? dayjs(costs?.projectDetails?.actual_end_date).format(
        //               "YYYY-MM-DD"
        //           )
        //         : "N/A",
        // },
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
            label: "Building Permit",
            span: 2,
            children: costs?.projectDetails?.building_permit ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/building_permit/${costs.projectDetails.building_permit}`}
                >
                    View File
                </a>
            ) : (
                <p className="italic text-gray-500">NO FILE FOUND</p>
            ),
        },

        {
            label: "Environmental Compliance Certificate",
            span: 2,
            children: costs?.projectDetails
                ?.environmental_compliance_certificate ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/environmental_compliance_certificate/${costs.projectDetails.environmental_compliance_certificate}`}
                >
                    View File
                </a>
            ) : (
                <p className="italic text-gray-500">NO FILE FOUND</p>
            ),
        },

        {
            label: "Barangay Clearance",
            span: 2,
            children: costs?.projectDetails?.barangay_clearance ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/barangay_clearance/${costs.projectDetails.barangay_clearance}`}
                >
                    View File
                </a>
            ) : (
                <p className="italic text-gray-500">NO FILE FOUND</p>
            ),
        },

        {
            label: "Zoning Clearance",
            span: 2,
            children: costs?.projectDetails?.zoning_clearance ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/zoning_clearance/${costs.projectDetails.zoning_clearance}`}
                >
                    View File
                </a>
            ) : (
                <p className="italic text-gray-500">NO FILE FOUND</p>
            ),
        },

        {
            label: "Contractor Accreditation",
            span: 3,
            children: costs?.projectDetails?.contractor_accreditation ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/contractor_accreditation/${costs.projectDetails.contractor_accreditation}`}
                >
                    View File
                </a>
            ) : (
                <p className="italic text-gray-500">NO FILE FOUND</p>
            ),
        },

        {
            label: "Engineer",
            span: 2,
            children: costs?.projectDetails?.site_engineer?.name,
        },
        {
            label: "Constructor",
            span: 1,
            children: costs?.projectDetails?.contractual
                ? costs?.projectDetails?.contructor?.company_name
                : "Not Contructual",
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

    return (
        <Descriptions
            layout={isSmallScreen ? "vertical" : "horizontal"}
            bordered
            items={items}
        />
    );
}
