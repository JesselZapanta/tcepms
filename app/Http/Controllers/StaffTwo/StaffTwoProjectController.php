<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class StaffTwoProjectController extends Controller
{
    public function index()
    {
        $engineers = User::where('role', 3)
                        ->where('status', 1)
                        ->get(['id','name']);
        return inertia('StaffTwo/Project/Index',[
            'engineers' => $engineers
        ]);
    }
    public function getData(Request $request)
    {
        return Project::with(['siteEngineer:id,name'])
                        ->where('name', 'like', "{$request->search}%")
                        ->whereIn('status', ['Labor', 'Ongoing', 'Completed'])
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }
}
