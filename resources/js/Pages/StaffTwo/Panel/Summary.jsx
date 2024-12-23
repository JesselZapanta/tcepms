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
            label: (
                <>
                    <div>Concrete Labor Budget</div>
                    <div>Concrete Actual Concrete Labor Cost</div>
                </>
            ),
            children: (
                <>
                    <div>{formatPeso(costs.ConcreteLaborBudget)}</div>
                    <div>{formatPeso(costs.ActualConcreteLaborCost)}</div>
                </>
            ),
        },
        {
            label: (
                <>
                    <div>Concrete Estimated Subtotal Cost</div>
                    <div>Concrete Actual Subtotal Cost</div>
                </>
            ),
            children: (
                <>
                    <div>{formatPeso(costs.ConcreteEstimatedSubTotalCost)}</div>
                    <div>{formatPeso(costs.ConcreteSubTotalCost)}</div>
                </>
            ),
        },
        //
        {
            label: "Water Works Cost",
            children: formatPeso(costs.WaterWorksCost),
        },
        {
            label: (
                <>
                    <div>Water Labor Budget</div>
                    <div>Water Actual Water Labor Cost</div>
                </>
            ),
            children: (
                <>
                    <div>{formatPeso(costs.WaterLaborBudget)}</div>
                    <div>{formatPeso(costs.ActualWaterLaborCost)}</div>
                </>
            ),
        },
        {
            label: (
                <>
                    <div>Water Estimated Subtotal Cost</div>
                    <div>Water Actual Subtotal Cost</div>
                </>
            ),
            children: (
                <>
                    <div>{formatPeso(costs.WaterEstimatedSubTotalCost)}</div>
                    <div>{formatPeso(costs.WaterSubTotalCost)}</div>
                </>
            ),
        },
        //
        {
            label: "Metal Works Cost",
            children: formatPeso(costs.MetalWorksCost),
        },
        {
            label: (
                <>
                    <div>Metal Labor Budget</div>
                    <div>Metal Actual Metal Labor Cost</div>
                </>
            ),
            children: (
                <>
                    <div>{formatPeso(costs.MetalLaborBudget)}</div>
                    <div>{formatPeso(costs.ActualMetalLaborCost)}</div>
                </>
            ),
        },
        {
            label: (
                <>
                    <div>Metal Estimated Subtotal Cost</div>
                    <div>Metal Actual Subtotal Cost</div>
                </>
            ),
            children: (
                <>
                    <div>{formatPeso(costs.MetalEstimatedSubTotalCost)}</div>
                    <div>{formatPeso(costs.MetalSubTotalCost)}</div>
                </>
            ),
        },
        //
        {
            label: "Plaster and Finish Works Cost",
            children: formatPeso(costs.PlasterFinishWorksCost),
        },
        {
            label: (
                <>
                    <div>Plaster and Finish Labor Budget</div>
                    <div>
                        Plaster and Finish Actual PlasterFinish Labor Cost
                    </div>
                </>
            ),
            children: (
                <>
                    <div>{formatPeso(costs.PlasterFinishLaborBudget)}</div>
                    <div>{formatPeso(costs.ActualPlasterFinishLaborCost)}</div>
                </>
            ),
        },
        {
            label: (
                <>
                    <div>Plaster and Finish Estimated Subtotal Cost</div>
                    <div>Plaster and Finish Actual Subtotal Cost</div>
                </>
            ),
            children: (
                <>
                    <div>
                        {formatPeso(costs.PlasterFinishEstimatedSubTotalCost)}
                    </div>
                    <div>{formatPeso(costs.PlasterFinishSubTotalCost)}</div>
                </>
            ),
        },
        //
        {
            label: "Equipment Cost",
            span: 4,
            children: formatPeso(costs.EquipmentCost),
        },
        {
            label: "Project Estimated Budget",
            span: 2,
            children: formatPeso(costs.EstimatedBudget),
        },
        {
            // label: "Project Estimated Total Cost",
            label: (
                <>
                    <div>Project Estimated Total Cost</div>
                    <div>Project Actual Total Cost</div>
                </>
            ),
            span: 2,
            children: (
                <>
                    <div>{formatPeso(costs.EstimatedTotalCost)}</div>
                    <div>{formatPeso(costs.ActualTotalCost)}</div>
                </>
            ),
        },
    ];

    // Determine the background color based on the condition
    const isBudgetExceeded = costs.EstimatedBudget <= costs.EstimatedTotalCost;
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
