<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffOne\WaterStoreRequest;
use App\Http\Requests\StaffOne\WaterUpdateRequest;
use App\Models\Water;
use App\Models\Project;
use Illuminate\Http\Request;

class WaterController extends Controller
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
            'ConcreteSubTotal' => $ConcreteSubTotal,
            'WaterSubTotal' => $WaterSubTotal,
            'MetalSubTotal' => $MetalSubTotal,
            'PlasterFinishSubTotal' => $PlasterFinishSubTotal,
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
        return Water::where('project' , $request->project)
                        ->where('material', 'like', "%{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function store (WaterStoreRequest $request)
    {
        $data = $request->validated();

        Water::create($data);

        // Update the project's cost
        $this->updateProjectCost($data['project']);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    public function update(WaterUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $water = Water::findOrFail($id);

        $water->update($data);

        // Update the project's cost
        $this->updateProjectCost($water->project);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
    

    public function destroy($id)
    {
        $water = Water::findOrFail($id);

        $water->delete();

        // Update the project's cost
        $this->updateProjectCost($water->project);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
