<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EngineerDashboardController extends Controller
{
    public function index()
    {
        return inertia('Engineer/Dashboard');
    }

    public function getData()
    {
        
        $projectCount = Project::where('engineer', Auth::user()->id)
                                ->whereIn('status', ['Ongoing', 'Completed'])
                                ->count();
        $pendingMaterials = Project::where('status', 'Material')->count();
        $pendingLabors = Project::where('status', 'Labor')->count();

        $OngoingProjectCount = Project::where('engineer', Auth::user()->id)
                                        ->where('status', 'Ongoing')
                                        ->count();

        $CompletedProjectCount = Project::where('engineer', Auth::user()->id)
                                        ->where('status', 'Completed')
                                        ->count();
        

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
