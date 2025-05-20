<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\RequestDateExtension;
use App\Models\User;
use App\Notifications\ProjectExtensionRequested;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class EngineerProjectRequestExtension extends Controller
{
    public function index($id)
    {
        $project = Project::with(['siteEngineer','contructor' ])->findOrFail($id);

        return inertia('Engineer/ExtensionRequest/Index',[
            'project' => $project
        ]);
    }


    public function getdata(Request $request, $id)
    {
        return RequestDateExtension::where('project', $id)
                            ->where('reason', 'like', "%{$request->search}%")
                            ->latest()
                            ->paginate(10);
    }

    public function store(Request $request, $id)
    {
        $project = Project::with('siteEngineer')->findOrFail($id);

        //check if there is a status===0 in under same project RequestDateExtension

        $exist = RequestDateExtension::where('project', $project->id)
                                    ->where('status', 0)
                                    ->exists();

        if($exist){
            return response()->json([
                'status' => 'exist'
            ], 422);
        }

        // return $request->name;

        $data = $request->validate([
            'requested_end_date' => 'required|date',
            'reason' => 'required',
        ]);

        $data['project'] = $project->id;
        $data['requested_by'] = $project->siteEngineer->name;
        $data['current_end_date'] = $project->end_date;

        $req = RequestDateExtension::create($data);

        $data = [
            'name' => $request->name,
            'reason' => $req->reason,
            'requested_by' => $req->requested_by,
            'status' => 'Pending'
        ];

        $user = User::where('role',0)->get(); //0 === admin
        
        Notification::send($user, new ProjectExtensionRequested($data));


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
