import { Descriptions } from "antd";
import React from "react";

export default function Summary({ costs, formatPeso }) {
    const items = [
        {
            label: "Excavation Cost",
            span: 4,
            children: formatPeso(costs.ExcavationCost),
        },
        {
            label: "Concrete Works Cost",
            children: formatPeso(costs.ConcreteWorksCost),
        },
        {
            label: "Concrete Labor Cost",
            children: formatPeso(costs.ConcreteLabor),
        },
        {
            label: "Concrete Sub Total Cost",
            children: formatPeso(costs.ConcreteSubTotal),
        },
        {
            label: "Water Cost",
            children: formatPeso(costs.WaterCost),
        },
        {
            label: "Water Labor Cost",
            children: formatPeso(costs.WaterLabor),
        },
        {
            label: "Water Sub Total Cost",
            children: formatPeso(costs.WaterSubTotal),
        },
        {
            label: "Metal Cost",
            children: formatPeso(costs.MetalCost),
        },
        {
            label: "Metal Labor Cost",
            children: formatPeso(costs.MetalLabor),
        },
        {
            label: "Metal Sub Total Cost",
            children: formatPeso(costs.MetalSubTotal),
        },
        {
            label: "Plaster Finish Cost",
            children: formatPeso(costs.PlasterFinishCost),
        },
        {
            label: "Plaster Finish Labor Cost",
            children: formatPeso(costs.PlasterFinishLabor),
        },
        {
            label: "Plaster Finish SubTotal Cost",
            children: formatPeso(costs.PlasterFinishSubTotal),
        },
        {
            label: "Equipment Cost",
            span: 4,
            children: formatPeso(costs.EquipmentCost),
        },
        {
            label: "Estimated Budget",
            span: 2,
            children: formatPeso(costs.EstimatedBudget),
        },
        {
            label: "Total Cost",
            span: 2,
            children: formatPeso(costs.TotalCost),
        },
    ];

    // Determine the background color based on the condition
    const isBudgetExceeded = costs.EstimatedBudget <= costs.TotalCost;
    const backgroundColor = isBudgetExceeded ? "rgba(255, 204, 204, 0.3)" : "rgba(204, 255, 204, 0.3)";

    return (
        <div style={{ backgroundColor, padding: "16px", borderRadius: "8px" }}>
            <Descriptions
                title="Project Costs Summary"
                bordered
                items={items}
            />
        </div>
    );
}
