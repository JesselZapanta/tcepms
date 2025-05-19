<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffOne\ProjectStoreRequest;
use App\Http\Requests\StaffOne\ProjectUpdateRequest;
use App\Models\Category;
use App\Models\Contructor;
use App\Models\Fund;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StaffOneProjectController extends Controller
{
    public function index()
    {
        $contructors = Contructor::where('status', 1)->get(['id','company_name']);
        $engineers = User::where('role', 3)
                        ->where('status', 1)
                        ->get(['id','name']);
        $categories = Category::where('status', 1)->get();
        $funds = Fund::where('status', 1)->get();
        return inertia('StaffOne/Project/Index',[
            'contructors' => $contructors,
            'engineers' => $engineers,
            'categories' => $categories,
            'funds' => $funds,
        ]);
    }

    public function getData(Request $request)
    {
        return Project::with(['siteEngineer:id,name'])
                        // ->where('category', $request->filter)
                        ->where('category', 'like', "%{$request->filter}%")
                        ->where('name', 'like', "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function store(ProjectStoreRequest $request)
    {
        $data = $request->validated();

        if($data['contractual'] === 0){
            $data['contructor'] = null;
            $data['status'] = 'Material';
        }else{
            $data['status'] = 'Ongoing';
            $data['actual_start_date'] = $data['start_date'] ?? null;
        }

        $project = Project::create($data);

        return response()->json([
            'status' => 'created',
            'project' => $project,
        ], 200);
    }

    public function update(ProjectUpdateRequest $request, $id)
    {
        $data = $request->validated();

        if($data['contractual'] === 0){
            $data['status'] = 'Material';
            $data['contructor'] = null;
            $data['actual_start_date'] = null;
        }else{
            $data['status'] = 'Ongoing';
            $data['actual_start_date'] = $data['start_date'] ?? null;
        }

        // unset($data['status']);

        $project = Project::findOrFail($id);

        $project->update($data);

        return response()->json([
            'status' => 'updated',
            'project' => $project,
        ], 200);
    }

    public function destroy($id)
    {
        Project::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
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

            // 'updates',
        ])
        ->findOrFail($id);

        

        // $data = [
        //     'project' => $project,
        // ];

        return inertia('StaffOne/Project/Report',[
            'data' => $data,
        ]);
    }
}
