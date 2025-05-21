<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contructor;
use App\Models\Project;
use App\Models\RequestDateExtension;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return inertia('Admin/Dashboard');
    }
    public function getData()
    {
        $activeUserCount = User::where('status', 1)->count();
        
        $activeContructorCount = Contructor::where('status', 1)->count();
        
        $projectCount = Project::count();
        $pendingMaterials = Project::where('status', 'Material')->count();
        $pendingLabors = Project::where('status', 'Labor')->count();
        $OngoingProjectCount = Project::where('status', 'Ongoing')->count();
        $CompletedProjectCount = Project::where('status', 'Completed')->count();
        $pendingRequest = RequestDateExtension::where('status', 0)->count();
        

        $data = [
            'activeUserCount' => $activeUserCount,
            'activeContructorCount' => $activeContructorCount,
            'projectCount' => $projectCount,
            'pendingMaterials' => $pendingMaterials,
            'pendingLabors' => $pendingLabors,
            'OngoingProjectCount' => $OngoingProjectCount,
            'CompletedProjectCount' => $CompletedProjectCount,
            'pendingRequest' => $pendingRequest,
        ];
        return $data;
    }
}

