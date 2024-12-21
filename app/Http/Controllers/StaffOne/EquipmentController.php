<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffOne\EquipmentStoreRequest;
use App\Http\Requests\StaffOne\EquipmentUpdateRequest;
use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function store (EquipmentStoreRequest $request)
    {
        $data = $request->validated();

        Equipment::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }
    public function getData(Request $request)
    {
        return Equipment::where('project' , $request->project)
                        ->where('equipment', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function update(EquipmentUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $project = Equipment::findOrFail($id);

        $project->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
    
    public function destroy($id)
    {
        Equipment::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
