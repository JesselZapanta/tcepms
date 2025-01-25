<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class AdminProjectUpdateController extends Controller
{
    public function index($id)
    {
        $currentProject = Project::whereIn('status', ['Ongoing', 'Completed'])->findOrFail($id);

        return inertia('Admin/Monitoring/Update/Index', [
            'currentProject' => $currentProject, 
        ]);
    }


    // public function getData($id, Request $request)
    // {
    //     // return $id;
    //     // where $request->month === created_at
    //     $projectDetails = Project::with(['siteEngineer','contructor','updates' => function($query) {
    //         $query->orderBy('update_date', 'desc')
    //             ->with(['siteEngineer','images']); 
    //     }])->findOrFail($id);


    //     // Retrieve the latest update
    //     $latestUpdate = $projectDetails->updates()->latest('created_at')->first();

    //     // Extract the progress values if a latest update exists
    //     $latestUpdate = $latestUpdate ? [
    //         'latestUpdateId' => $latestUpdate->id,
    //         'excavation_progress' => $latestUpdate->excavation_progress,
    //         'concrete_works_progress' => $latestUpdate->concrete_works_progress,
    //         'water_works_progress' => $latestUpdate->water_works_progress,
    //         'metal_works_progress' => $latestUpdate->metal_works_progress,
    //         'cement_plaster_and_finishes_progress' => $latestUpdate->cement_plaster_and_finishes_progress,
    //     ] : null;

    //     return response()->json([
    //         'projectDetails' => $projectDetails,
    //         'latestUpdate' => $latestUpdate,
    //     ], 200);
    // }

    public function getData($id, Request $request)
    {
        // Validate the month parameter
        $month = $request->month;

        $projectDetails = Project::with(['siteEngineer', 'contructor', 'updates' => function ($query) use ($month) {
            // Filter updates based on the month if it's between 1 and 12
            if ($month > 0 && $month <= 12) {
                $query->whereMonth('update_date', $month);
            }
            $query->orderBy('update_date', 'desc')
                ->with(['siteEngineer', 'images']);
        }])->findOrFail($id);

        // Retrieve the latest update (filtered by the month if applicable)
        $latestUpdateQuery = $projectDetails->updates();
        if ($month > 0 && $month <= 12) {
            $latestUpdateQuery->whereMonth('update_date', $month);
        }
        $latestUpdate = $latestUpdateQuery->latest('created_at')->first();

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
