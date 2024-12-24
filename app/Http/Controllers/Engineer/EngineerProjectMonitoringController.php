<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class EngineerProjectMonitoringController extends Controller
{
    public function index()
    {
        return inertia('Engineer/Project/Index');
    }

    public function getData(Request $request)
    {
        return Project::with('siteEngineer:id,name')
                        ->where('name', 'like', "{$request->search}%")
                        ->paginate(10);
    }
}
