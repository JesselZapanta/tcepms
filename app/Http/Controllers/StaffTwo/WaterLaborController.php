<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffTwo\WaterLaborStoreRequest;
use App\Http\Requests\StaffTwo\WaterLaborUpdateRequest;
use App\Models\Project;
use App\Models\WaterLabor;
use Illuminate\Http\Request;

class WaterLaborController extends Controller
{
    public function getData(Request $request)
    {
        return WaterLabor::where('project' , $request->project)
                        ->where('position', 'like', "%{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }
    public function store(WaterLaborStoreRequest $request)
    {
        $data = $request->validated();

        // return $data;

        $project = Project::with(['water', 'waterLabor'])->findOrFail($data['project']);

        // Calculate the budget and current labor cost
        $waterLaborBudget = $project->water->sum('cost') * 0.4;
        $currentLaborCost = $project->waterLabor->sum('cost') + $data['cost'];

        if ($currentLaborCost > $waterLaborBudget) {
            return response()->json([
                'status' => 'over'
            ], 422);
        }

        $project->waterLabor()->create($data);

        return response()->json([
            'status' => 'created',
        ], 201);
    }

    public function update(WaterLaborUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $waterLabor = WaterLabor::findOrFail($id);

        $project = Project::with(['water', 'waterLabor'])->findOrFail($waterLabor->project);

        $waterLaborBudget = $project->water->sum('cost') * 0.4;
        $currentLaborCost = $project->waterLabor->sum('cost') - $waterLabor->cost + $data['cost'];

        // Calculate the budget and current labor cost
        if ($currentLaborCost > $waterLaborBudget) {
            return response()->json([
                'status' => 'over'
            ], 422);
        }

        // Update the record with new data
        $waterLabor->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        $waterLabor = WaterLabor::findOrFail($id);

        $waterLabor->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
