import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DetailedReport({ data }) {

    const currency = (amount) =>
        Number(amount).toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
        });

    const renderMaterialsTable = (title, items, headers, columns) => {
        const hasItems = items?.length > 0;
        const total = hasItems
            ? items.reduce((sum, item) => sum + parseFloat(item?.cost || 0), 0)
            : 0;

        return (
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <table className="min-w-full border border-gray-100 mb-1">
                    <thead className="bg-gray-100">
                        <tr>
                            {headers.map((header, idx) => (
                                <th
                                    key={idx}
                                    className="border px-4 py-2 text-left"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hasItems ? (
                            items.map((item, idx) => (
                                <tr key={idx}>
                                    {columns.map((key, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className="border px-4 py-2"
                                        >
                                            {key === "cost"
                                                ? currency(item[key])
                                                : item[key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={headers.length}
                                    className="border px-4 py-2 text-center text-gray-500 italic"
                                >
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="text-right font-medium">
                    Total: {currency(total)}
                </div>
            </div>
        );
    };

    const getTotal = (items) =>
        items?.reduce((sum, item) => sum + parseFloat(item?.cost || 0), 0) || 0;

    const materialCategories = [
        { name: "Excavation", data: data?.excavation },
        { name: "Concrete", data: data?.concrete },
        { name: "Water Works", data: data?.water },
        { name: "Metal Works", data: data?.metal },
        { name: "Plaster & Finish", data: data?.plaster_finish },
        { name: "Equipment", data: data?.equipment },
    ];

    const laborCategories = [
        { name: "Concrete Labor", data: data?.concrete_labor },
        { name: "Water Labor", data: data?.water_labor },
        { name: "Metal Labor", data: data?.metal_labor },
        { name: "Plaster & Finish Labor", data: data?.plaster_finish_labor },
    ];

    const totalMaterialCost = materialCategories.reduce(
        (sum, cat) => sum + getTotal(cat.data),
        0
    );
    const totalLaborCost = laborCategories.reduce(
        (sum, cat) => sum + getTotal(cat.data),
        0
    );

    return (
        <>
            <div className="max-w-3xl mx-auto bg-white">
                <div className="p-2 font-times">
                    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                    <div className="flex justify-around">
                        <img
                            src="/images/tangub.png"
                            alt="tangub.png"
                            className="w-32"
                        />
                        <div className="mt-4 text-center font-bold text-lg">
                            <p>Republic of the Philippines</p>
                            <p>CITY OF TANGUB</p>
                            <p>CITY ENGINEER'S OFFICE</p>
                            {/* <p>PROJECT UPDATE</p> */}
                        </div>
                        <img
                            src="/images/tcepms.png"
                            alt="tcepms.png"
                            className="w-32"
                        />
                    </div>

                    <h2 className="text-2xl text-center font-bold py-8">
                        PROJECT DETAILED REPORT
                    </h2>

                    <div className="border">
                        <table className="w-full nb table-auto border-collapse">
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r w-1/3">
                                        Project Name:
                                    </td>
                                    <td className="p-2">{data?.name}</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Project Code:
                                    </td>
                                    <td className="p-2">
                                        {data?.project_code}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Project Category:
                                    </td>
                                    <td className="p-2">{data?.category}</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Project Description:
                                    </td>
                                    <td className="p-2 text-justify">
                                        {data?.description}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Start Date:
                                    </td>
                                    <td className="p-2">
                                        {data?.start_date?.slice(0, 10)}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        End Date:
                                    </td>
                                    <td className="p-2">
                                        {data?.end_date?.slice(0, 10)}
                                    </td>
                                </tr>
                                {data?.contractual === 1 && (
                                    <tr className="border-t">
                                        <td className="p-2 font-bold bg-gray-100 border-r">
                                            Budget:
                                        </td>
                                        <td className="p-2">
                                            {currency(data?.budget)}
                                        </td>
                                    </tr>
                                )}
                                {data?.contractual === 0 && (
                                    <tr className="border-t">
                                        <td className="p-2 font-bold bg-gray-100 border-r">
                                            Cost:
                                        </td>
                                        <td className="p-2">
                                            {currency(data?.cost)}
                                        </td>
                                    </tr>
                                )}
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Source:
                                    </td>
                                    <td className="p-2">{data?.source}</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Location:
                                    </td>
                                    <td className="p-2">{data?.location}</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        On-Site Engineer:
                                    </td>
                                    <td className="p-2">
                                        {data?.site_engineer?.name}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Contractual:
                                    </td>
                                    <td className="p-2">
                                        {data?.contractual === 1 ? "Yes" : "No"}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Contractor:
                                    </td>
                                    <td className="p-2">
                                        {data?.contractual === 1
                                            ? data?.contructor?.company_name
                                            : "Not Contractual"}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Priority:
                                    </td>
                                    <td className="p-2">{data?.priority}</td>
                                </tr>
                                <tr className="border-t border-b">
                                    <td className="p-2 font-bold bg-gray-100 border-r">
                                        Status:
                                    </td>
                                    <td className="p-2">{data?.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {data?.contractual === 0 && (
                        <div>
                            {/* Materials */}
                            <p className="text-lg text-center font-bold py-8">
                                PROJECT MATERIAL DETAILS
                            </p>

                            {renderMaterialsTable(
                                "Excavation Materials",
                                data?.excavation,
                                [
                                    "Material",
                                    "Quantity",
                                    "No. of Days",
                                    "Rate",
                                    "Cost",
                                ],
                                [
                                    "material",
                                    "quantity",
                                    "no_of_days",
                                    "rate",
                                    "cost",
                                ]
                            )}
                            {renderMaterialsTable(
                                "Concrete Works Materials",
                                data?.concrete,
                                [
                                    "Material",
                                    "Unit",
                                    "Quantity",
                                    "Unit Cost",
                                    "Cost",
                                ],
                                [
                                    "material",
                                    "unit",
                                    "quantity",
                                    "unit_cost",
                                    "cost",
                                ]
                            )}
                            {renderMaterialsTable(
                                "Water Works Materials",
                                data?.water,
                                [
                                    "Material",
                                    "Unit",
                                    "Quantity",
                                    "Unit Cost",
                                    "Cost",
                                ],
                                [
                                    "material",
                                    "unit",
                                    "quantity",
                                    "unit_cost",
                                    "cost",
                                ]
                            )}
                            {renderMaterialsTable(
                                "Metal Works Materials",
                                data?.metal,
                                [
                                    "Material",
                                    "Unit",
                                    "Quantity",
                                    "Unit Cost",
                                    "Cost",
                                ],
                                [
                                    "material",
                                    "unit",
                                    "quantity",
                                    "unit_cost",
                                    "cost",
                                ]
                            )}
                            {renderMaterialsTable(
                                "Plaster & Finish Works Materials",
                                data?.plaster_finish,
                                [
                                    "Material",
                                    "Unit",
                                    "Quantity",
                                    "Unit Cost",
                                    "Cost",
                                ],
                                [
                                    "material",
                                    "unit",
                                    "quantity",
                                    "unit_cost",
                                    "cost",
                                ]
                            )}
                            {renderMaterialsTable(
                                "Equipment",
                                data?.equipment,
                                [
                                    "Equipment",
                                    "Quantity",
                                    "No. of Days",
                                    "Rate",
                                    "Cost",
                                ],
                                [
                                    "equipment",
                                    "quantity",
                                    "no_of_days",
                                    "rate",
                                    "cost",
                                ]
                            )}

                            {/* Labor */}
                            <p className="text-lg text-center font-bold py-8">
                                PROJECT LABOR DETAILS
                            </p>
                            {renderMaterialsTable(
                                "Concrete Labor",
                                data?.concrete_labor,
                                [
                                    "Position",
                                    "Quantity",
                                    "No. of Days",
                                    "Rate",
                                    "Cost",
                                ],
                                [
                                    "position",
                                    "quantity",
                                    "no_of_days",
                                    "rate",
                                    "cost",
                                ]
                            )}
                            {renderMaterialsTable(
                                "Water Labor",
                                data?.water_labor,
                                [
                                    "Position",
                                    "Quantity",
                                    "No. of Days",
                                    "Rate",
                                    "Cost",
                                ],
                                [
                                    "position",
                                    "quantity",
                                    "no_of_days",
                                    "rate",
                                    "cost",
                                ]
                            )}
                            {renderMaterialsTable(
                                "Metal Labor",
                                data?.metal_labor,
                                [
                                    "Position",
                                    "Quantity",
                                    "No. of Days",
                                    "Rate",
                                    "Cost",
                                ],
                                [
                                    "position",
                                    "quantity",
                                    "no_of_days",
                                    "rate",
                                    "cost",
                                ]
                            )}
                            {renderMaterialsTable(
                                "Plaster & Finish Labor",
                                data?.plaster_finish_labor,
                                [
                                    "Position",
                                    "Quantity",
                                    "No. of Days",
                                    "Rate",
                                    "Cost",
                                ],
                                [
                                    "position",
                                    "quantity",
                                    "no_of_days",
                                    "rate",
                                    "cost",
                                ]
                            )}

                            {/* Cost Summary */}
                            <p className="text-lg text-center font-bold py-8">
                                PROJECT COST SUMMARY
                            </p>
                            <table className="min-w-full border border-gray-100 mb-6">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">
                                            Category
                                        </th>
                                        <th className="border px-4 py-2 text-right">
                                            Cost
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materialCategories.map((cat, idx) => (
                                        <tr key={idx}>
                                            <td className="border px-4 py-2">
                                                {cat.name} Materials
                                            </td>
                                            <td className="border px-4 py-2 text-right">
                                                {currency(getTotal(cat.data))}
                                            </td>
                                        </tr>
                                    ))}
                                    {laborCategories.map((cat, idx) => (
                                        <tr key={`labor-${idx}`}>
                                            <td className="border px-4 py-2">
                                                {cat.name}
                                            </td>
                                            <td className="border px-4 py-2 text-right">
                                                {currency(getTotal(cat.data))}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="font-semibold bg-gray-50">
                                        <td className="border px-4 py-2">
                                            Total Materials Cost
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {currency(totalMaterialCost)}
                                        </td>
                                    </tr>
                                    <tr className="font-semibold bg-gray-50">
                                        <td className="border px-4 py-2">
                                            Total Labor Cost
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {currency(totalLaborCost)}
                                        </td>
                                    </tr>
                                    <tr className="font-bold bg-gray-200">
                                        <td className="border px-4 py-2">
                                            Grand Total
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {currency(
                                                totalMaterialCost +
                                                    totalLaborCost
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Project Progress by Category */}
                    <p className="text-lg text-center font-bold py-8">
                        PROJECT PROGRESS
                    </p>

                    {data?.updates?.length > 1 ? (
                        data?.updates.map((update) => (
                            <table className="min-w-full border border-gray-100 mb-6">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th
                                            className="border px-4 py-2 text-left"
                                            // colSpan={2}
                                        >
                                            {update?.name}
                                        </th>
                                        <th className="border px-4 py-2 text-right">
                                            {update?.update_date.slice(0, 10)}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th
                                            className="border px-4 py-2 font-light text-md text-justify"
                                            colSpan={2}
                                        >
                                            {update?.description}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="border px-4 py-2 text-left">
                                            Category
                                        </th>
                                        <th className="border px-4 py-2 text-right">
                                            Progress (%)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2">
                                            Excavation
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {update?.excavation_progress ?? 0}%
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">
                                            Concrete Works
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {update?.concrete_works_progress ??
                                                0}
                                            %
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">
                                            Water Works
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {update?.water_works_progress ?? 0}%
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">
                                            Metal Works
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {update?.metal_works_progress ?? 0}%
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">
                                            Cement Plaster & Finishes
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {update?.cement_plaster_and_finishes_progress ??
                                                0}
                                            %
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                    ) : (
                        <div className="mx-auto border px-4 py-2 text-center text-gray-500 italic">
                            No updates found.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
