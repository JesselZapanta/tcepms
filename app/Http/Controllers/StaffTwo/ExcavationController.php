<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffTwo\ExcavationStoreRequest;
use App\Http\Requests\StaffTwo\ExcavationUpdateRequest;
use App\Models\Excavation;
use Illuminate\Http\Request;

class ExcavationController extends Controller
{
    public function store (ExcavationStoreRequest $request)
    {
        $data = $request->validated();

        Excavation::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }
    public function getData(Request $request)
    {
        return Excavation::where('project' , $request->project)
                        ->where('material', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function update(ExcavationUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $project = Excavation::findOrFail($id);

        $project->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
    
    public function destroy($id)
    {
        Excavation::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
