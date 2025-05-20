<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class EngineerProjectController extends Controller
{
    public function index()
    {
        $engineers = User::where('role', 3)
                        ->where('status', 1)
                        ->get(['id','name']);
                        
        $categories = Category::where('status', 1)->get();
        
        return inertia('Engineer/Project/Index',[
            'engineers' => $engineers,
            'categories' => $categories,
        ]);
    }

    public function getdata(Request $request)
    {
        return Project::with(['siteEngineer:id,name'])
                        // ->where('category', $request->filter)
                        ->where('category', 'like', "%{$request->filter}%")
                        ->where('name', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function report($id)
    {
        $data =  Project::with([
            'siteEngineer:id,name', 
            'contructor:id,company_name', 

            'excavation',
            'concrete',
            'water',
            'metal',
            'plasterFinish',
            'equipment',

            'concreteLabor',
            'waterLabor',
            'metalLabor',
            'plasterFinishLabor',

            'updates',
        ])
        ->findOrFail($id);

        return response()->json([
            'data' => $data
        ], 200);
    }
}
