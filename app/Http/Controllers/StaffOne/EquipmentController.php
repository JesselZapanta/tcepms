<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffOne\EquipmentStoreRequest;
use App\Http\Requests\StaffOne\EquipmentUpdateRequest;
use App\Models\Equipment;
use App\Models\Project;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function getCost($id)
    {
        $project = Project::with(['excavation', 'concrete', 'water', 'metal', 'plasterFinish', 'equipment'])->findOrFail($id);

        $costs = $this->calculateProjectCosts($project);

        return $costs;
    }
    private function updateProjectCost($projectId)
    {
        $project = Project::with(['excavation', 'concrete', 'water', 'metal', 'plasterFinish', 'equipment'])->findOrFail($projectId);

        $costs = $this->calculateProjectCosts($project);

        // Update the project's cost column
        $project->update(['cost' => $costs['TotalCost']]);
    }

    private function calculateProjectCosts($project)
    {
        $ExcavationCost = $project->excavation->sum('cost');
        $ConcreteWorksCost = $project->concrete->sum('cost');
        $ConcreteLabor = $ConcreteWorksCost * 0.4;
        $ConcreteSubTotal = $ConcreteWorksCost + $ConcreteLabor;
        $WaterCost = $project->water->sum('cost');
        $WaterLabor = $WaterCost * 0.4;
        $WaterSubTotal = $WaterCost + $WaterLabor;
        $MetalCost = $project->metal->sum('cost');
        $MetalLabor = $MetalCost * 0.4;
        $MetalSubTotal = $MetalCost + $MetalLabor;
        $PlasterFinishCost = $project->plasterFinish->sum('cost');
        $PlasterFinishLabor = $PlasterFinishCost * 0.4;
        $PlasterFinishSubTotal = $PlasterFinishCost + $PlasterFinishLabor;
        $EquipmentCost = $project->equipment->sum('cost');

        $TotalCost = collect([
            'ExcavationCost' => $ExcavationCost,
            // 'ConcreteSubTotal' => $ConcreteSubTotal,//remove for now
            'ConcreteWorksCost' => $ConcreteWorksCost,
            // 'WaterSubTotal' => $WaterSubTotal,//remove for now
            'WaterCost' => $WaterCost,
            // 'MetalSubTotal' => $MetalSubTotal,//remove for now
            'MetalCost' => $MetalCost,
            // 'PlasterFinishSubTotal' => $PlasterFinishSubTotal,//remove for now
            'PlasterFinishCost' => $PlasterFinishCost,
            'EquipmentCost' => $EquipmentCost,
        ])->sum();

        return [
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
            'TotalCost' => $TotalCost,
        ];
    }

    public function getData(Request $request)
    {
        return Equipment::where('project' , $request->project)
                        ->where('equipment', 'like', "%{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function store (EquipmentStoreRequest $request)
    {
        $data = $request->validated();

        Equipment::create($data);

        // Update the project's cost
        $this->updateProjectCost($data['project']);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    public function update(EquipmentUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $equipment = Equipment::findOrFail($id);

        $equipment->update($data);

        // Update the project's cost
        $this->updateProjectCost($equipment->project);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
    

    public function destroy($id)
    {
        $equipment = Equipment::findOrFail($id);

        $equipment->delete();

        // Update the project's cost
        $this->updateProjectCost($equipment->project);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
