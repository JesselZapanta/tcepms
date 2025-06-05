<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Project;
use App\Models\ProjectUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class AdminProjectMonitoringController extends Controller
{
    public function index()
    {
        $categories = Category::where('status', 1)->get();
        return inertia('Admin/Monitoring/Index', [
            'categories' => $categories
        ]);
    }

    // public function getData(Request $request)
    // {
    //     return Project::with([
    //         'siteEngineer:id,name', 
    //         'updates' => function ($query) {
    //             $query->with(['images' => function ($query) {
    //                 $query->orderBy('created_at', 'desc')
    //                     ->limit(5); // Fetch the latest image per update
    //             }])
    //             ->latest('created_at')
    //             ->limit(1); // Fetch only the latest update per project
    //         }
    //     ])
    //     ->where('category', 'like', "%{$request->category}%")
    //     ->where('status', 'like', "%{$request->status}%")
    //     // ->whereIn('status', ['Ongoing', 'Completed'])
    //     ->where('name', 'like', "%{$request->search}%")
    //     ->orderBy('id', $request->order)
    //     ->paginate(10);
    // }

    public function getData(Request $request)
    {
        $latestUpdateSub = DB::table('project_updates')
            ->select('project', DB::raw('MAX(update_date) as latest_update'))
            ->groupBy('project');

        return Project::with([
                'siteEngineer:id,name', 
                'updates' => function ($query) {
                    $query->with(['images' => function ($query) {
                        $query->orderBy('created_at', 'desc')->limit(5);
                    }])
                    ->latest('created_at')
                    ->limit(1);
                }
            ])
            ->leftJoinSub($latestUpdateSub, 'latest_updates', function ($join) {
                $join->on('projects.id', '=', 'latest_updates.project');
            })
            ->where('projects.category', 'like', "%{$request->category}%")
            ->where('projects.status', 'like', "%{$request->status}%")
            ->where('projects.name', 'like', "%{$request->search}%")
            ->orderBy('latest_updates.latest_update', $request->order ?? 'desc') // 'asc' or 'desc'
            ->select('projects.*')
            ->paginate(10);
    }

    public function graph($id)
    {
        $updates = ProjectUpdate::where('project', $id)
            ->orderBy('update_date')
            ->get([
                'update_date',
                'excavation_progress',
                'concrete_works_progress',
                'water_works_progress',
                'metal_works_progress',
                'cement_plaster_and_finishes_progress',
            ]);

        $project = Project::with([
                'siteEngineer:id,name', 
                'contructor:id,company_name', 
        ])->findOrFail($id);


        return inertia('Admin/Monitoring/Graph', [
            'rawData' => [
                'dates' => $updates->pluck('update_date')->map(fn($date) => \Carbon\Carbon::parse($date)->toDateString())->all(),
                'excavation' => $updates->pluck('excavation_progress')->all(),
                'concrete' => $updates->pluck('concrete_works_progress')->all(),
                'water' => $updates->pluck('water_works_progress')->all(),
                'metal' => $updates->pluck('metal_works_progress')->all(),
                'plaster' => $updates->pluck('cement_plaster_and_finishes_progress')->all(),
            ], 
            'project' => $project
        ]);
    }

}
