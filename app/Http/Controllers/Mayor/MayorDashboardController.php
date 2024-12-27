<?php

namespace App\Http\Controllers\Mayor;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class MayorDashboardController extends Controller
{
    
    public function index()
    {
        return inertia('Mayor/Dashboard');
    }
    public function getData()
    {
        
        $projectCount = Project::count();
        $OngoingProjectCount = Project::where('status', 'Ongoing')->count();
        $CompletedProjectCount = Project::where('status', 'Completed')->count();
        

        $data = [
            'projectCount' => $projectCount,
            'OngoingProjectCount' => $OngoingProjectCount,
            'CompletedProjectCount' => $CompletedProjectCount,
        ];
        return $data;
    }
}
