<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class LaborController extends Controller
{
    public function index($id)
    {
        $project = Project::findOrFail($id);

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
        $MetalWorksCost = $project->metal->sum('cost');
        $MetalLaborBudget = $MetalWorksCost * 0.4;
        $ActualMetalLaborCost = $project->metalLabor->sum('cost');
        $MetalEstimatedSubTotalCost = $MetalWorksCost + $MetalLaborBudget;
        $MetalSubTotalCost = $MetalWorksCost + $ActualMetalLaborCost;

        // PlasterFinish-related calculations
        $PlasterFinishWorksCost = $project->plasterFinish->sum('cost');
        $PlasterFinishLaborBudget = $PlasterFinishWorksCost * 0.4;
        $ActualPlasterFinishLaborCost = $project->plasterFinishLabor->sum('cost');
        $PlasterFinishEstimatedSubTotalCost = $PlasterFinishWorksCost + $PlasterFinishLaborBudget;
        $PlasterFinishSubTotalCost = $PlasterFinishWorksCost + $ActualPlasterFinishLaborCost;

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

         // Metal-related calculations
        'MetalWorksCost' => $MetalWorksCost,
        'MetalLaborBudget' => $MetalLaborBudget,
        'ActualMetalLaborCost' => $ActualMetalLaborCost,
        'MetalEstimatedSubTotalCost' => $MetalEstimatedSubTotalCost,
        'MetalSubTotalCost' => $MetalSubTotalCost,

         // PlasterFinish-related calculations
        'PlasterFinishWorksCost' => $PlasterFinishWorksCost,
        'PlasterFinishLaborBudget' => $PlasterFinishLaborBudget,
        'ActualPlasterFinishLaborCost' => $ActualPlasterFinishLaborCost,
        'PlasterFinishEstimatedSubTotalCost' => $PlasterFinishEstimatedSubTotalCost,
        'PlasterFinishSubTotalCost' => $PlasterFinishSubTotalCost,

        'EquipmentCost' => $EquipmentCost,

        'EstimatedBudget' => $project->budget,

        'EstimatedTotalCost' => collect([
            'ExcavationCost' => $ExcavationCost,
            'ConcreteEstimatedSubTotalCost' => $ConcreteEstimatedSubTotalCost,
            'WaterEstimatedSubTotalCost' => $WaterEstimatedSubTotalCost,
            'MetalEstimatedSubTotalCost' => $MetalEstimatedSubTotalCost,
            'PlasterFinishEstimatedSubTotalCost' => $PlasterFinishEstimatedSubTotalCost,
            'EquipmentCost' => $EquipmentCost,
        ])->sum(),

        'ActualTotalCost' => collect([
            'ExcavationCost' => $ExcavationCost,
            'ConcreteSubTotalCost' => $ConcreteSubTotalCost,
            'WaterSubTotalCost' => $WaterSubTotalCost,
            'MetalSubTotalCost' => $MetalSubTotalCost,
            'PlasterFinishSubTotalCost' => $PlasterFinishSubTotalCost,
            'EquipmentCost' => $EquipmentCost,
        ])->sum(),
    ];

        return response()->json($costs);
    }
    
    public function compile(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $request->validate([
            'status' => ['required','string','in:Ongoing,Labor'],
        ]);

        $status = $request->status;

        $data = ['status' => $status];

        if($status === 'Ongoing'){
            $data['actual_start_date']  = now('Asia/Manila');
        }else{
            $data['actual_start_date']  = null;
        }

        $project->update($data);

        return response()->json([
            'status' => 'compiled',
        ], 200);
    }
}
