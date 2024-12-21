<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffTwo\MetalStoreRequest;
use App\Http\Requests\StaffTwo\MetalUpdateRequest;
use App\Models\Metal;
use Illuminate\Http\Request;

class MetalController extends Controller
{
    public function store (MetalStoreRequest $request)
    {
        $data = $request->validated();

        Metal::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }
    public function getData(Request $request)
    {
        return Metal::where('project' , $request->project)
                        ->where('material', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function update(MetalUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $project = Metal::findOrFail($id);

        $project->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
    
    public function destroy($id)
    {
        Metal::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
