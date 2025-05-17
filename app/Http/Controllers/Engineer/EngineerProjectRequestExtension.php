<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\RequestDateExtension;
use Illuminate\Http\Request;

class EngineerProjectRequestExtension extends Controller
{
    public function index($id)
    {
        $project = Project::with(['siteEngineer','contructor' ])->findOrFail($id);

        return inertia('Engineer/ExtensionRequest/Index',[
            'project' => $project
        ]);
    }

    public function getData(Request $request)
    {
        return RequestDateExtension::where('reason', 'like', "%{$request->search}%")
                            ->latest()
                            ->paginate(10);
    }

    public function store(Request $request, $id)
    {
        $project = Project::with('siteEngineer')->findOrFail($id);

        // return $request;

        $data = $request->validate([
            'requested_end_date' => 'required|date',
            'reason' => 'required',
        ]);

        $data['project'] = $project->id;
        $data['requested_by'] = $project->siteEngineer->name;
        $data['current_end_date'] = $project->end_date;

        RequestDateExtension::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    
    public function update(Request $request, $id)
    {
        $req = RequestDateExtension::findOrFail($id);

        // return $request;

        $request->validate([
            'requested_end_date' => 'required|date',
            'reason' => 'required',
        ]);

        $req->update([
            'requested_end_date' => $request->requested_end_date,
            'reason' => $request->reason,
        ]);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        $request = RequestDateExtension::findOrFail($id);

        $request->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
