<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffOne\WaterStoreRequest;
use App\Http\Requests\StaffOne\WaterUpdateRequest;
use App\Models\Water;
use Illuminate\Http\Request;

class WaterController extends Controller
{
    public function store (WaterStoreRequest $request)
    {
        $data = $request->validated();

        Water::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }
    public function getData(Request $request)
    {
        return Water::where('project' , $request->project)
                        ->where('material', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function update(WaterUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $project = Water::findOrFail($id);

        $project->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
    
    public function destroy($id)
    {
        Water::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
