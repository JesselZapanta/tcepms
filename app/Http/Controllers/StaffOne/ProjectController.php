<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffOne\ProjectStoreRequest;
use App\Http\Requests\StaffOne\ProjectUpdateRequest;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return inertia('StaffOne/Project/Index');
    }

    public function getData(Request $request)
    {
        return Project::where('name', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function store(ProjectStoreRequest $request)
    {
        $data = $request->validated();

        Project::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    public function update(ProjectUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $project = Project::findOrFail($id);

        $project->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        Project::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
