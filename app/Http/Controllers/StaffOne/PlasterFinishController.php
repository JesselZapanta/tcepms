<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffOne\PlasterFinishStoreRequest;
use App\Http\Requests\StaffOne\PlasterFinishUpdateRequest;
use App\Models\PlasterFinish;
use Illuminate\Http\Request;

class PlasterFinishController extends Controller
{
    public function store (PlasterFinishStoreRequest $request)
    {
        $data = $request->validated();

        PlasterFinish::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }
    public function getData(Request $request)
    {
        return PlasterFinish::where('project' , $request->project)
                        ->where('material', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function update(PlasterFinishUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $project = PlasterFinish::findOrFail($id);

        $project->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
    
    public function destroy($id)
    {
        PlasterFinish::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
