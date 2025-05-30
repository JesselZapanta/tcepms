<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class StaffOneDashboardController extends Controller
{
    public function index()
    {
        return inertia('StaffOne/Dashboard');
    }

    public function getData()
    {
        
        $projectCount = Project::count();
        $pendingMaterials = Project::where('status', 'Material')->count();
        $pendingLabors = Project::where('status', 'Labor')->count();
        $OngoingProjectCount = Project::where('status', 'Ongoing')->count();
        $CompletedProjectCount = Project::where('status', 'Completed')->count();
        

        $data = [
            'projectCount' => $projectCount,
            'pendingMaterials' => $pendingMaterials,
            'pendingLabors' => $pendingLabors,
            'OngoingProjectCount' => $OngoingProjectCount,
            'CompletedProjectCount' => $CompletedProjectCount,
        ];
        return $data;
    }
}
