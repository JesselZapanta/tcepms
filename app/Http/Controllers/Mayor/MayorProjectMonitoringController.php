<?php

namespace App\Http\Controllers\Mayor;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Project;
use Illuminate\Http\Request;

class MayorProjectMonitoringController extends Controller
{
    public function index()
    {
        $categories = Category::where('status', 1)->get();
        
        return inertia('Mayor/Monitoring/Index', [
            'categories' => $categories
        ]);
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
        ->where('category', 'like', "{$request->filter}%")
        ->whereIn('status', ['Ongoing', 'Completed'])
        ->where('name', 'like', "%{$request->search}%")
        ->orderBy('id', 'desc')
        ->paginate(10);
    }
}
