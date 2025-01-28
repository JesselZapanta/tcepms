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


    public function getData($id, Request $request)
{
    $month = $request->month;
    $year = $request->year;

    $projectDetails = Project::with(['siteEngineer', 'contructor', 'updates' => function ($query) use ($month, $year) {
        // Apply filters only if year or month is not 0
        if ($year != 0) {
            $query->whereYear('update_date', $year);
        }
        if ($month != 0) {
            $query->whereMonth('update_date', $month);
        }
        $query->orderBy('update_date', 'desc')
                ->with(['siteEngineer', 'images']);
    }])->findOrFail($id);

    // Retrieve the latest update
    $latestUpdate = $projectDetails->updates()
                                    ->when($year != 0, function ($query) use ($year) {
                                        $query->whereYear('update_date', $year);
                                    })
                                    ->when($month != 0, function ($query) use ($month) {
                                        $query->whereMonth('update_date', $month);
                                    })
                                    ->latest('created_at')
                                    ->first();

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
