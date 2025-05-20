<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffTwo\MetalLaborStoreRequest;
use App\Http\Requests\StaffTwo\MetalLaborUpdateRequest;
use App\Models\MetalLabor;
use App\Models\Project;
use Illuminate\Http\Request;

class MetalLaborController extends Controller
{
    public function getData(Request $request)
    {
        return MetalLabor::where('project' , $request->project)
                        ->where('position', 'like', "%{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }
    public function store(MetalLaborStoreRequest $request)
    {
        $data = $request->validated();

        // return $data;

        $project = Project::with(['metal', 'metalLabor'])->findOrFail($data['project']);

        // Calculate the budget and current labor cost
        $metalLaborBudget = $project->metal->sum('cost') * 0.4;
        $currentLaborCost = $project->metalLabor->sum('cost') + $data['cost'];

        if ($currentLaborCost > $metalLaborBudget) {
            return response()->json([
                'status' => 'over'
            ], 422);
        }

        $project->metalLabor()->create($data);

        //update the project cost
        $project->update([
            'cost' => $project->cost + $data['cost'], 
        ]);

        return response()->json([
            'status' => 'created',
        ], 201);
    }

    public function update(MetalLaborUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $metalLabor = MetalLabor::findOrFail($id);

        $prevCost = $metalLabor->cost;

        $project = Project::with(['metal', 'metalLabor'])->findOrFail($metalLabor->project);

        $metalLaborBudget = $project->metal->sum('cost') * 0.4;
        $currentLaborCost = $project->metalLabor->sum('cost') - $metalLabor->cost + $data['cost'];

        // Calculate the budget and current labor cost
        if ($currentLaborCost > $metalLaborBudget) {
            return response()->json([
                'status' => 'over'
            ], 422);
        }

        // Update the record with new data
        $metalLabor->update($data);

        //update the project cost
        $project->update([
            'cost' => $project->cost - $prevCost + $data['cost'],
        ]);


        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        $metalLabor = MetalLabor::findOrFail($id);

        $laborCost = $metalLabor->cost; // Store cost before deletion

        $project = Project::findOrFail($metalLabor->project);

        $metalLabor->delete();

        // Update the project cost
        $project->update([
            'cost' => $project->cost - $laborCost,
        ]);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
