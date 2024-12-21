<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffTwo\ConcreteStoreRequest;
use App\Http\Requests\StaffTwo\ConcreteUpdateRequest;
use App\Models\Concrete;
use Illuminate\Http\Request;

class ConcreteController extends Controller
{
    public function store (ConcreteStoreRequest $request)
    {
        $data = $request->validated();

        Concrete::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }
    public function getData(Request $request)
    {
        return Concrete::where('project' , $request->project)
                        ->where('material', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function update(ConcreteUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $project = Concrete::findOrFail($id);

        $project->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
    
    public function destroy($id)
    {
        Concrete::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
