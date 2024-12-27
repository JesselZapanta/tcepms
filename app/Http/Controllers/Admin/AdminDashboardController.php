<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contructor;
use App\Models\Project;
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
        $OngoingProjectCount = Project::where('status', 'Ongoing')->count();
        $CompletedProjectCount = Project::where('status', 'Completed')->count();
        

        $data = [
            'activeUserCount' => $activeUserCount,
            'activeContructorCount' => $activeContructorCount,
            'projectCount' => $projectCount,
            'OngoingProjectCount' => $OngoingProjectCount,
            'CompletedProjectCount' => $CompletedProjectCount,
        ];

        return $data;
    }
}
