import { Button, Descriptions, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";

import { SettingOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export default function Summary({ costs, formatPeso, setCostChange }) {

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
        {
            label: "Excavation Cost",
            span: 4,
            children: (
                <>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ExcavationCost)}
                    </div>
                </>
            ),
        },

        {
            label: "Concrete Works Cost",
            children: (
                <>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ConcreteWorksCost)}
                    </div>
                </>
            ),
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
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ConcreteLaborBudget)}
                    </div>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ActualConcreteLaborCost)}
                    </div>
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
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ConcreteEstimatedSubTotalCost)}
                    </div>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ConcreteSubTotalCost)}
                    </div>
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
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.WaterLaborBudget)}
                    </div>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ActualWaterLaborCost)}
                    </div>
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
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.WaterEstimatedSubTotalCost)}
                    </div>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.WaterSubTotalCost)}
                    </div>
                </>
            ),
        },
        //
        {
            label: "Metal Works Cost",
            children: (
                <>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.MetalWorksCost)}
                    </div>
                </>
            ),
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
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.MetalLaborBudget)}
                    </div>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ActualMetalLaborCost)}
                    </div>
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
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.MetalEstimatedSubTotalCost)}
                    </div>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.MetalSubTotalCost)}
                    </div>
                </>
            ),
        },
        //
        {
            label: "Plaster and Finish Works Cost",
            children: (
                <>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.PlasterFinishWorksCost)}
                    </div>
                </>
            ),
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
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.PlasterFinishLaborBudget)}
                    </div>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ActualPlasterFinishLaborCost)}
                    </div>
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
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.PlasterFinishEstimatedSubTotalCost)}
                    </div>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.PlasterFinishSubTotalCost)}
                    </div>
                </>
            ),
        },
        //
        {
            label: "Equipment Cost",
            span: 4,
            children: (
                <>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.EquipmentCost)}
                    </div>
                </>
            ),
        },
        {
            label: "Project Estimated Budget",
            span: 2,
            children: (
                <>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.EstimatedBudget)}
                    </div>
                </>
            ),
        },
        {
            label: (
                <>
                    <div>Project Estimated Total Cost</div>
                    <div>Project Actual Total Cost</div>
                </>
            ),
            span: 2,
            children: (
                <>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.EstimatedTotalCost)}
                    </div>
                    <div className="whitespace-nowrap">
                        {formatPeso(costs.ActualTotalCost)}
                    </div>
                </>
            ),
        },
    ];


    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, placement, title, msg) => {
        api[type]({
            message: title,
            description: msg,
            placement: placement,
        });
    };

    // Determine the background color based on the condition
    const isBudgetExceeded = costs.EstimatedBudget <= costs.EstimatedTotalCost;
    const backgroundColor = isBudgetExceeded
        ? "rgba(255, 204, 204, 0.3)"
        : "rgba(204, 255, 204, 0.3)";

    const handleCompile = async (status, id) => {
        const values = { status };

        try {
            const res = await axios.put(
                `/stafftwo/materials/compile/${id}`,
                values
            );

            if (res.data.status === "compiled") {
                setCostChange();
                openNotification(
                    "success",
                    "bottomRight",
                    "Status Changed!",
                    "The status has been updated successfully. The project status is now Ongoing"
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ backgroundColor, padding: "16px", borderRadius: "8px" }}>
            {contextHolder}

            <Descriptions
                title={
                    <div className="flex justify-between md:flex-row flex-col">
                        <div>Project Costs Summary</div>
                        {costs?.projectDetails?.status === "Labor" && (
                            <Button
                                icon={<SettingOutlined />}
                                type="primary"
                                onClick={() =>
                                    Modal.confirm({
                                        title: "Compile Materials?",
                                        icon: <QuestionCircleOutlined />,
                                        content:
                                            "Are you sure you want to compile all the materials?",
                                        okText: "Yes",
                                        cancelText: "No",
                                        onOk() {
                                            handleCompile(
                                                "Ongoing",
                                                costs.projectDetails.id
                                            );
                                        },
                                    })
                                }
                            >
                                Compile
                            </Button>
                        )}
                        {costs?.projectDetails?.status === "Ongoing" && (
                            <Button
                                icon={<SettingOutlined />}
                                danger
                                type="primary"
                                onClick={() =>
                                    Modal.confirm({
                                        title: "Cancel Compilation?",
                                        icon: <QuestionCircleOutlined />,
                                        content:
                                            "Are you sure you want to cancel the materials compilation?",
                                        okText: "Yes",
                                        cancelText: "No",
                                        onOk() {
                                            handleCompile(
                                                "Labor",
                                                costs.projectDetails.id
                                            );
                                        },
                                    })
                                }
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                }
                layout={isSmallScreen ? "vertical" : "horizontal"}
                bordered
                items={items}
            />
        </div>
    );
}
