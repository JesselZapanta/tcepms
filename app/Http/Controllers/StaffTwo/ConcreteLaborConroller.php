<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffTwo\ConcreteLaborStoreRequest;
use App\Http\Requests\StaffTwo\ConcreteLaborUpdateRequest;
use App\Models\ConcreteLabor;
use App\Models\Project;
use Illuminate\Http\Request;

class ConcreteLaborConroller extends Controller
{
    public function getData(Request $request)
    {
        return ConcreteLabor::where('project' , $request->project)
                        ->where('position', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }
    public function store(ConcreteLaborStoreRequest $request)
    {
        $data = $request->validated();

        $project = Project::with(['concrete', 'concreteLabor'])->findOrFail($data['project']);

        // Calculate the budget and current labor cost
        $concreteLaborBudget = $project->concrete->sum('cost') * 0.4;
        $currentLaborCost = $project->concreteLabor->sum('cost') + $data['cost'];

        if ($currentLaborCost > $concreteLaborBudget) {
            return response()->json([
                'status' => 'over'
            ], 422);
        }

        $project->concreteLabor()->create($data);

        return response()->json([
            'status' => 'created',
        ], 201);
    }

    public function update(ConcreteLaborUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $concreteLabor = ConcreteLabor::findOrFail($id);

        $project = Project::with(['concrete', 'concreteLabor'])->findOrFail($concreteLabor->project);

        $concreteLaborBudget = $project->concrete->sum('cost') * 0.4;
        $currentLaborCost = $project->concreteLabor->sum('cost') - $concreteLabor->cost + $data['cost'];

        // Calculate the budget and current labor cost
        if ($currentLaborCost > $concreteLaborBudget) {
            return response()->json([
                'status' => 'over'
            ], 422);
        }

        // Update the record with new data
        $concreteLabor->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        $concreteLabor = ConcreteLabor::findOrFail($id);

        $concreteLabor->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
