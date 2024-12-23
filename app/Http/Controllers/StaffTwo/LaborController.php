<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class LaborController extends Controller
{
    public function index($id)
    {
        $project = Project::with([
            'excavation',
            'concrete',
            'water',
            'metal',
            'plasterFinish',
            'equipment'
        ])->findOrFail($id);

        return inertia('StaffTwo/Labor/Index', [
            'project' => $project,
        ]);
    }
    public function getCost($id)
    {
        $project = Project::with([
            'siteEngineer',
            'contructor',
            'excavation',
            'concrete', 
            'concreteLabor', 
            'water', 
            'metal', 
            'plasterFinish', 
            'equipment'
        ])->findOrFail($id);

        // Equipment-related calculations
        $ExcavationCost = $project->excavation->sum('cost');

        // Concrete-related calculations
        $ConcreteWorksCost = $project->concrete->sum('cost');
        $ConcreteLaborBudget = $ConcreteWorksCost * 0.4;
        $ActualConcreteLaborCost = $project->concreteLabor->sum('cost');
        $ConcreteEstimatedSubTotalCost = $ConcreteWorksCost + $ConcreteLaborBudget;
        $ConcreteSubTotalCost = $ConcreteWorksCost + $ActualConcreteLaborCost;

        // Water-related calculations
        $WaterWorksCost = $project->water->sum('cost');
        $WaterLaborBudget = $WaterWorksCost * 0.4;
        $ActualWaterLaborCost = $project->waterLabor->sum('cost');
        $WaterEstimatedSubTotalCost = $WaterWorksCost + $WaterLaborBudget;
        $WaterSubTotalCost = $WaterWorksCost + $ActualWaterLaborCost;

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
        'projectDetails' => $project,

        'ExcavationCost' => $ExcavationCost,
        
        // Concrete-related calculations
        'ConcreteWorksCost' => $ConcreteWorksCost,
        'ConcreteLaborBudget' => $ConcreteLaborBudget,
        'ActualConcreteLaborCost' => $ActualConcreteLaborCost,
        'ConcreteEstimatedSubTotalCost' => $ConcreteEstimatedSubTotalCost,
        'ConcreteSubTotalCost' => $ConcreteSubTotalCost,

       // Water-related calculations
        'WaterWorksCost' => $WaterWorksCost,
        'WaterLaborBudget' => $WaterLaborBudget,
        'ActualWaterLaborCost' => $ActualWaterLaborCost,
        'WaterEstimatedSubTotalCost' => $WaterEstimatedSubTotalCost,
        'WaterSubTotalCost' => $WaterSubTotalCost,

        'MetalCost' => $MetalCost,
        'MetalLabor' => $MetalLabor,
        'MetalSubTotal' => $MetalSubTotal,

        'PlasterFinishCost' => $PlasterFinishCost,
        'PlasterFinishLabor' => $PlasterFinishLabor,
        'PlasterFinishSubTotal' => $PlasterFinishSubTotal,

        'EquipmentCost' => $EquipmentCost,

        'EstimatedBudget' => $project->budget,

        'EstimatedTotalCost' => collect([
            'ExcavationCost' => $ExcavationCost,
            'ConcreteEstimatedSubTotalCost' => $ConcreteEstimatedSubTotalCost,
            'WaterEstimatedSubTotalCost' => $WaterEstimatedSubTotalCost,
            'MetalSubTotal' => $MetalSubTotal,
            'PlasterFinishSubTotal' => $PlasterFinishSubTotal,
            'EquipmentCost' => $EquipmentCost,
        ])->sum(),
    ];

        return response()->json($costs);
    }
    
}
