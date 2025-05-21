<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\RequestDateExtension;
use App\Models\User;
use App\Notifications\ProjectExtensionRequestedStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class AdminProjectExtensionController extends Controller
{
    public function index()
    {
        return inertia('Admin/ExtensionRequest/Index');
    }

    public function getdata(Request $request)
    {
        return RequestDateExtension::with('project:id,name')
                            ->where('reason', 'like', "%{$request->search}%")
                            ->latest()
                            ->paginate(10);
    }
    
    public function update(Request $request, $id)
    {
        $req = RequestDateExtension::findOrFail($id);

        $project = Project::findOrFail($req->project);
        
        $request->validate([
            'remarks' => 'required|string',
            'status' => 'required',
        ]);

        $req->update([
            'remarks' => $request->remarks,
            'status' => $request->status,
        ]);

        $siteEngineer = $project->siteEngineer;

        $request->requested_end_date = Carbon::parse($request->requested_end_date, 'UTC')
        ->setTimezone('Asia/Manila')
        ->format('Y-m-d H:i:s');

        $request->current_end_date = Carbon::parse($request->current_end_date, 'UTC')
        ->setTimezone('Asia/Manila')
        ->format('Y-m-d H:i:s');

        if($request->status === 1){
            //approved
            $project->update([
                'end_date' => $request->requested_end_date
            ]);
            
            $data = [
                'name' => $project->name,
                'status' => 'Approved',
                'message' => 'Your request to extend the project end date has been approved.',
            ];
            
            Notification::send($siteEngineer, new ProjectExtensionRequestedStatus($data));
    
        } else if($request->status === 2){
            //rejected
            $project->update([
                'end_date' => $request->current_end_date
            ]);
            //send notif?
            $data = [
                'name' => $project->name,
                'status' => 'Rejected',
                'message' => 'Your request to extend the project end date has been rejected.',
            ];
            
            Notification::send($siteEngineer, new ProjectExtensionRequestedStatus($data));
        } else if($request->status === 0){
            //back to pending
            $project->update([
                'end_date' => $request->current_end_date
            ]);
        }

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
}
