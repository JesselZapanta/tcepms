<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EngineerProjectMonitoringController extends Controller
{
    public function index()
    {
        return inertia('Engineer/Project/Index');
    }

    public function getData(Request $request)
    {
        return Project::with([
            'siteEngineer:id,name', // Fetch only the necessary fields from siteEngineer
            'updates' => function ($query) {
                $query->with(['images' => function ($query) {
                    $query->orderBy('created_at', 'desc')
                        ->limit(5); // Fetch the latest image per update
                }])
                ->latest('created_at') // Fetch updates in descending order of creation
                ->limit(1); // Fetch only the latest update per project
            }
        ])
        ->where('engineer', Auth::user()->id)
        ->where('name', 'like', "{$request->search}%")
        ->orderBy('id', 'desc')
        ->paginate(10); // Paginate the projects
    }


}
