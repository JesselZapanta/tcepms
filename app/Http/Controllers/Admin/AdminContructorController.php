<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ContructorStoreRequest;
use App\Http\Requests\Admin\ContructorUpdateRequest;
use App\Models\Contructor;
use App\Models\Project;
use Illuminate\Http\Request;

class AdminContructorController extends Controller
{
    public function index()
    {
        return inertia('Admin/Contructor/Index');
    }

    public function getData(Request $request)
    {
        return Contructor::where('company_name', 'like', "%{$request->search}%")
                            ->orderBy($request->sortField, $request->sortOrder)
                            ->paginate(10);
    }

    public function store(ContructorStoreRequest $request)
    {
        $data = $request->validated();

        Contructor::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    public function update(ContructorUpdateRequest $request, $id)
    {
        $user = Contructor::findOrFail($id);
        
        $data = $request->validated();

        // return $data;
    
        $user->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    //project under contructor

    public function project($id)
    {
        $contructor = Contructor::findOrFail($id);

        return inertia('Admin/Contructor/Project/Index',[
            'contructor' => $contructor,
        ]);
    }
    
    // public function getprojects(Request $request)
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
    //     ->where('name', 'like', "{$request->search}%")
    //     ->where('contructor','like', "{$request->id}%" )
    //     ->orderBy('id', 'desc')
    //     ->paginate(10);
    // }

    public function getprojects(Request $request)
{
    $month = $request->month;
    $year = $request->year;

    $query = Project::with([
            'siteEngineer:id,name', 
            'updates' => function ($query) {
                $query->with(['images' => function ($query) {
                    $query->orderBy('created_at', 'desc')
                        ->limit(5);
                }])
                ->latest('created_at')
                ->limit(1);
            }
        ])
        ->where('name', 'like', "%{$request->search}%")
        ->where('contructor', 'like', "{$request->id}%");

    // Apply month filter if not 0
    if ($month != 0) {
        $query->whereMonth('created_at', $month);
    }

    // Apply year filter if not 0
    if ($year != 0) {
        $query->whereYear('created_at', $year);
    }

    return $query->orderBy('id', 'desc')
                ->paginate(10);
}

    public function destroy($id)
    {
        Contructor::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
