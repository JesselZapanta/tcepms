<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffTwo\PlasterFinishLaborStoreRequest;
use App\Http\Requests\StaffTwo\PlasterFinishLaborUpdateRequest;
use App\Models\PlasterFinishLabor;
use App\Models\Project;
use Illuminate\Http\Request;

class PlasterFinishLaborController extends Controller
{
    public function getData(Request $request)
    {
        return PlasterFinishLabor::where('project' , $request->project)
                        ->where('position', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }
    public function store(PlasterFinishLaborStoreRequest $request)
    {
        $data = $request->validated();

        // return $data;

        $project = Project::with(['plasterFinish', 'plasterFinishLabor'])->findOrFail($data['project']);

        // Calculate the budget and current labor cost
        $plasterFinishLaborBudget = $project->plasterFinish->sum('cost') * 0.4;
        $currentLaborCost = $project->plasterFinishLabor->sum('cost') + $data['cost'];

        if ($currentLaborCost > $plasterFinishLaborBudget) {
            return response()->json([
                'status' => 'over'
            ], 422);
        }

        $project->plasterFinishLabor()->create($data);

        return response()->json([
            'status' => 'created',
        ], 201);
    }

    public function update(PlasterFinishLaborUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $plasterFinishLabor = PlasterFinishLabor::findOrFail($id);

        $project = Project::with(['plasterFinish', 'plasterFinishLabor'])->findOrFail($plasterFinishLabor->project);

        $plasterFinishLaborBudget = $project->plasterFinish->sum('cost') * 0.4;
        $currentLaborCost = $project->plasterFinishLabor->sum('cost') - $plasterFinishLabor->cost + $data['cost'];

        // Calculate the budget and current labor cost
        if ($currentLaborCost > $plasterFinishLaborBudget) {
            return response()->json([
                'status' => 'over'
            ], 422);
        }

        // Update the record with new data
        $plasterFinishLabor->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        $plasterFinishLabor = PlasterFinishLabor::findOrFail($id);

        $plasterFinishLabor->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
