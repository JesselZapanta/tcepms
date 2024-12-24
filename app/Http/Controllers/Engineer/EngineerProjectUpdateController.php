<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Engineer\EngineerProjectStoreRequest;
use App\Models\Project;
use App\Models\ProjectUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EngineerProjectUpdateController extends Controller
{
    public function index($id)
    {
        // Fetch the project details
        $projectDetails = Project::with(['updates' => function($query) {
            $query->orderBy('update_date', 'desc');
        }])->findOrFail($id);

        // Retrieve the latest update
        $latestUpdate = $projectDetails->updates()->latest('created_at')->first();

        // Extract the progress values if a latest update exists
        $progressValues = $latestUpdate ? [
            'excavation_progress' => $latestUpdate->excavation_progress,
            'concrete_works_progress' => $latestUpdate->concrete_works_progress,
            'water_works_progress' => $latestUpdate->water_works_progress,
            'metal_works_progress' => $latestUpdate->metal_works_progress,
            'cement_plaster_and_finishes_progress' => $latestUpdate->cement_plaster_and_finishes_progress,
        ] : null;

        return inertia('Engineer/Update/Index', [
            'projectDetails' => $projectDetails, // All project details
            'latestProgress' => $progressValues  // Only the latest progress
        ]);
    }



    public function getData(Request $request)
    {
        return Project::with('siteEngineer:id,name')
                        ->where('name', 'like', "{$request->search}%")
                        ->paginate(10);
    }

    public function store(EngineerProjectStoreRequest $request)
    {
        $data = $request->validated();

        $data['engineer'] = Auth::user()->id;
        $data['update_date'] = now('Asia/Manila');

        ProjectUpdate::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    //for images
    
}
