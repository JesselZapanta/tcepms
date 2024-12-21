<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class StaffOneMaterialController extends Controller
{
    public function index($id)
    {
        $project = Project::with(['excavation', 'concrete', 'water', 'metal', 'plasterFinish', 'equipment'])->findOrFail($id);

        // Equipment-related calculations
        $ExcavationCost = $project->excavation->sum('cost');

        // Concrete-related calculations
        $ConcreteWorksCost = $project->concrete->sum('cost');
        $ConcreteLabor = $ConcreteWorksCost * 0.4;
        $ConcreteSubTotal = $ConcreteWorksCost + $ConcreteLabor;

        // Water-related calculations
        $WaterCost = $project->water->sum('cost');
        $WaterLabor = $WaterCost * 0.4;
        $WaterSubTotal = $WaterCost + $WaterLabor;

        // Metal-related calculations
        $MetalCost = $project->metal->sum('cost');
        $MetalLabor = $MetalCost *  0.4;
        $MetalSubTotal = $MetalCost + $MetalLabor;

        // Plaster Finish-related calculations
        $PlasterFinishCost = $project->plasterFinish->sum('cost');
        $PlasterFinishLabor = $PlasterFinishCost *  0.4;
        $PlasterFinishSubTotal = $PlasterFinishCost + $PlasterFinishLabor;

        // Equipment-related calculations
        $EquipmentCost = $project->equipment->sum('cost');

        $costs = [
        'ExcavationCost' => $ExcavationCost,
        'ConcreteWorksCost' => $ConcreteWorksCost,
        'ConcreteLabor' => $ConcreteLabor,
        'ConcreteSubTotal' => $ConcreteSubTotal,
        'WaterCost' => $WaterCost,
        'WaterLabor' => $WaterLabor,
        'WaterSubTotal' => $WaterSubTotal,
        'MetalCost' => $MetalCost,
        'MetalLabor' => $MetalLabor,
        'MetalSubTotal' => $MetalSubTotal,
        'PlasterFinishCost' => $PlasterFinishCost,
        'PlasterFinishLabor' => $PlasterFinishLabor,
        'PlasterFinishSubTotal' => $PlasterFinishSubTotal,
        'EquipmentCost' => $EquipmentCost,

        'EstimatedBudget' => $project->budget,
        'TotalCost' => collect([
            'ExcavationCost' => $ExcavationCost,
            'ConcreteSubTotal' => $ConcreteSubTotal,
            'WaterSubTotal' => $WaterSubTotal,
            'MetalSubTotal' => $MetalSubTotal,
            'PlasterFinishSubTotal' => $PlasterFinishSubTotal,
            'EquipmentCost' => $EquipmentCost,
        ])->sum(),
    ];

        return inertia('StaffOne/Material/Index', [
            'project' => $project,
            'costs' => $costs,
        ]);
    }
}
