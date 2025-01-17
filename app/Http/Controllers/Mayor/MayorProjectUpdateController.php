<?php

namespace App\Http\Controllers\Mayor;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class MayorProjectUpdateController extends Controller
{
    public function index($id)
    {
        $currentProject = Project::whereIn('status', ['Ongoing', 'Completed'])->findOrFail($id);

        return inertia('Mayor/Monitoring/Update/Index', [
            'currentProject' => $currentProject, 
        ]);
    }


    public function getData($id)
    {
        $projectDetails = Project::with(['siteEngineer','contructor','updates' => function($query) {
            $query->orderBy('update_date', 'desc')
                ->with(['siteEngineer','images']); 
        }])->findOrFail($id);


        // Retrieve the latest update
        $latestUpdate = $projectDetails->updates()->latest('created_at')->first();

        // Extract the progress values if a latest update exists
        $latestUpdate = $latestUpdate ? [
            'latestUpdateId' => $latestUpdate->id,
            'excavation_progress' => $latestUpdate->excavation_progress,
            'concrete_works_progress' => $latestUpdate->concrete_works_progress,
            'water_works_progress' => $latestUpdate->water_works_progress,
            'metal_works_progress' => $latestUpdate->metal_works_progress,
            'cement_plaster_and_finishes_progress' => $latestUpdate->cement_plaster_and_finishes_progress,
        ] : null;

        return response()->json([
            'projectDetails' => $projectDetails,
            'latestUpdate' => $latestUpdate,
        ], 200);
    }

}
