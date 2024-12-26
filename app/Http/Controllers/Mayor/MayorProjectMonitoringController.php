<?php

namespace App\Http\Controllers\Mayor;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class MayorProjectMonitoringController extends Controller
{
    public function index()
    {
        return inertia('Mayor/Monitoring/Index');
    }

    public function getData(Request $request)
    {
        return Project::with([
            'siteEngineer:id,name', 
            'updates' => function ($query) {
                $query->with(['images' => function ($query) {
                    $query->orderBy('created_at', 'desc')
                        ->limit(5); // Fetch the latest image per update
                }])
                ->latest('created_at')
                ->limit(1); // Fetch only the latest update per project
            }
        ])
        // ->where('engineer', Auth::user()->id)
        ->whereIn('status', ['Ongoing', 'Completed'])
        ->where('name', 'like', "{$request->search}%")
        ->orderBy('id', 'desc')
        ->paginate(10);
    }
}
