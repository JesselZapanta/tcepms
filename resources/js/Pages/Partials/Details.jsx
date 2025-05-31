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
        { label: "Name", span: 3, children: data?.name },
        {
            label: "Description",
            span: 3,
            children: data?.description,
        },
        {
            label: "Start Date",
            span: 1,
            children: data?.start_date
                ? dayjs(data?.start_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "End Date",
            span: 1,
            children: data?.end_date
                ? dayjs(data?.end_date).format("YYYY-MM-DD")
                : "N/A",
        },
        {
            label: "duration",
            span: 1,
            children: `${data?.duration} days`,
        },
        // {
        //     label: "Actual Start Date",
        //     span: 2,
        //     children: data?.actual_start_date
        //         ? dayjs(data?.actual_start_date).format("YYYY-MM-DD")
        //         : "N/A",
        // },
        // {
        //     label: "Actual End Date",
        //     span: 1,
        //     children: data?.actual_end_date
        //         ? dayjs(data?.actual_end_date).format("YYYY-MM-DD")
        //         : "N/A",
        // },
        {
            label: "Budget",
            span: 3,
            children: formatPeso(data?.budget),
        },
        {
            label: "Cost",
            span: 3,
            children: formatPeso(data?.cost),
        },
        {
            label: "Source",
            span: 3,
            children: data?.source || "N/A",
        },
        {
            label: "Location",
            span: 3,
            children: data?.location,
        },
        {
            label: "Lot Size (Sqaure meter)",
            span: 3,
            children: data?.lot_size,
        },
        {
            label: "Structural Plan",
            span: 2,
            children: data?.structural_plan ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/structural_plan/${data?.structural_plan}`}
                >
                    View File
                </a>
            ) : (
                <p className="italic text-gray-500">NO FILE FOUND</p>
            ),
        },
        {
            label: "Compliance Standards",
            span: 1,
            children: data?.compliance_standards ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/compliance_standards/${data?.compliance_standards}`}
                >
                    View File
                </a>
            ) : (
                <p className="italic text-gray-500">NO FILE FOUND</p>
            ),
        },
        // {
        //     label: "Latitude",
        //     span: 2,
        //     children: data?.latitude || "N/A",
        // },
        // {
        //     label: "Longitude",
        //     span: 1,
        //     children: data?.longitude || "N/A",
        // },

        {
            label: "Building Permit",
            span: 2,
            children: data?.building_permit ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/building_permit/${data?.building_permit}`}
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
            children: data?.environmental_compliance_certificate ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/environmental_compliance_certificate/${data?.environmental_compliance_certificate}`}
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
            children: data?.barangay_clearance ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/barangay_clearance/${data?.barangay_clearance}`}
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
            children: data?.zoning_clearance ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/zoning_clearance/${data?.zoning_clearance}`}
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
            children: data?.contractor_accreditation ? (
                <a
                    className="underline font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/storage/contractor_accreditation/${data?.contractor_accreditation}`}
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
            children: data?.site_engineer?.name,
        },
        {
            label: "Constructor",
            span: 1,
            children: data?.contractual
                ? data?.contructor?.company_name
                : "Not Contructual",
        },
        {
            label: "Status",
            span: 2,
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
            span: 2,
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
    ];

    return (
        <Collapse label="Excavation">
            <Panel header="View Project Details" key="1">
                <Descriptions
                    layout={isSmallScreen ? "vertical" : "horizontal"}
                    bordered
                    items={items}
                />
            </Panel>
        </Collapse>
    );
}
