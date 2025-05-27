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
use Illuminate\Support\Facades\Storage;


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
        return Project::with(['siteEngineer:id,name', 'contructor:id,company_name'])
                        // ->where('category', $request->filter)
                        ->where('status', 'like', "%{$request->status}%")
                        ->where('category', 'like', "%{$request->category}%")
                        ->where('name', 'like', "%{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    // Uploads

    //buildingPermit

    public function buildingPermitTempUpload(Request $request){
        $request->validate([
            'building_permit' => ['required','mimes:pdf']
        ]);
        
        $file = $request->building_permit;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $fileName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('temp', $fileName, 'public');
        $name = explode('/', $filePath);
        return $name[1];
    }
    public function buildingPermitRemoveUpload($fileName){

        // return $fileName;
        if (Storage::disk('public')->exists('temp/' . $fileName)) {
            Storage::disk('public')->delete('temp/' . $fileName);

            return response()->json([
                'status' => 'remove'
            ], 200);
        }
    }
    public function buildingPermitReplaceUpload($id, $fileName){
        $data = Project::find($id);
        $oldFile = $data->building_permit;

        // return $oldFile;
        $data->building_permit = null;
        $data->save();

        if (Storage::disk('public')->exists('building_permit/' . $oldFile)) {
            Storage::disk('public')->delete('building_permit/' . $oldFile);

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                Storage::disk('public')->delete('temp/' . $fileName);
            }

            return response()->json([
                'status' => 'replace'
            ], 200);
        }

        return response()->json([
            'status' => 'error'
        ], 200);
    }

    //environmental_compliance_certificate

    public function environmentalTempUpload(Request $request){
        $request->validate([
            'environmental_compliance_certificate' => ['required','mimes:pdf']
        ]);
        
        $file = $request->environmental_compliance_certificate;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $fileName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('temp', $fileName, 'public');
        $name = explode('/', $filePath);
        return $name[1];
    }
    public function environmentalRemoveUpload($fileName){

        // return $fileName;
        if (Storage::disk('public')->exists('temp/' . $fileName)) {
            Storage::disk('public')->delete('temp/' . $fileName);

            return response()->json([
                'status' => 'remove'
            ], 200);
        }
    }
    public function environmentalReplaceUpload($id, $fileName){
        $data = Project::find($id);
        $oldFile = $data->environmental_compliance_certificate;

        // return $oldFile;
        $data->environmental_compliance_certificate = null;
        $data->save();

        if (Storage::disk('public')->exists('environmental_compliance_certificate/' . $oldFile)) {
            Storage::disk('public')->delete('environmental_compliance_certificate/' . $oldFile);

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                Storage::disk('public')->delete('temp/' . $fileName);
            }

            return response()->json([
                'status' => 'replace'
            ], 200);
        }

        return response()->json([
            'status' => 'error'
        ], 200);
    }

    //barangay_clearance

    public function barangayTempUpload(Request $request){
        $request->validate([
            'barangay_clearance' => ['required','mimes:pdf']
        ]);
        
        $file = $request->barangay_clearance;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $fileName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('temp', $fileName, 'public');
        $name = explode('/', $filePath);
        return $name[1];
    }
    public function barangayRemoveUpload($fileName){

        // return $fileName;
        if (Storage::disk('public')->exists('temp/' . $fileName)) {
            Storage::disk('public')->delete('temp/' . $fileName);

            return response()->json([
                'status' => 'remove'
            ], 200);
        }
    }
    public function barangayReplaceUpload($id, $fileName){
        $data = Project::find($id);
        $oldFile = $data->barangay_clearance;

        // return $oldFile;
        $data->barangay_clearance = null;
        $data->save();

        if (Storage::disk('public')->exists('barangay_clearance/' . $oldFile)) {
            Storage::disk('public')->delete('barangay_clearance/' . $oldFile);

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                Storage::disk('public')->delete('temp/' . $fileName);
            }

            return response()->json([
                'status' => 'replace'
            ], 200);
        }

        return response()->json([
            'status' => 'error'
        ], 200);
    }

    
    public function store(ProjectStoreRequest $request)
    {
        // return $request;

        $data = $request->validated();

        //building_permit
        if(!empty($data['building_permit']) && isset($request->building_permit[0]['response'])){
            $fileName = $request->building_permit[0]['response'];
            $data['building_permit'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'building_permit/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        }

        //environmental_compliance_certificate
        if(!empty($data['environmental_compliance_certificate']) && isset($request->environmental_compliance_certificate[0]['response'])){
            $fileName = $request->environmental_compliance_certificate[0]['response'];
            $data['environmental_compliance_certificate'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'environmental_compliance_certificate/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        }

        //barangay_clearance
        if(!empty($data['barangay_clearance']) && isset($request->barangay_clearance[0]['response'])){
            $fileName = $request->barangay_clearance[0]['response'];
            $data['barangay_clearance'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'barangay_clearance/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        }
        
        
        if($data['contractual'] === 0){
            $data['contructor'] = null;
            $data['status'] = 'Material';
        }else{
            $data['status'] = 'Ongoing';
            $data['actual_start_date'] = $data['start_date'] ?? null;
        }

        if ($request->hasFile('building_permit')) {
            $data['building_permit'] = $request->file('building_permit')->store('documents');
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

        //building_permit
        if(!empty($data['building_permit']) && isset($request->building_permit[0]['response'])){
            $fileName = $request->building_permit[0]['response'];
            $data['building_permit'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'building_permit/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        } else {
            unset($data['building_permit']); 
        }
        //environmental_compliance_certificate
        if(!empty($data['environmental_compliance_certificate']) && isset($request->environmental_compliance_certificate[0]['response'])){
            $fileName = $request->environmental_compliance_certificate[0]['response'];
            $data['environmental_compliance_certificate'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'environmental_compliance_certificate/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        } else {
            unset($data['environmental_compliance_certificate']); 
        }
        //barangay_clearance
        if(!empty($data['barangay_clearance']) && isset($request->barangay_clearance[0]['response'])){
            $fileName = $request->barangay_clearance[0]['response'];
            $data['barangay_clearance'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'barangay_clearance/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        } else {
            unset($data['barangay_clearance']); 
        }

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
        $project = Project::findOrFail($id);

        if (!empty($project->building_permit)) {
            if (Storage::disk('public')->exists('building_permit/' . $project->building_permit)) {
                Storage::disk('public')->delete('building_permit/' . $project->building_permit);
            }
        }
        //environmental_compliance_certificate
        if (!empty($project->environmental_compliance_certificate)) {
            if (Storage::disk('public')->exists('environmental_compliance_certificate/' . $project->environmental_compliance_certificate)) {
                Storage::disk('public')->delete('environmental_compliance_certificate/' . $project->environmental_compliance_certificate);
            }
        }
        //barangay_clearance
        if (!empty($project->barangay_clearance)) {
            if (Storage::disk('public')->exists('barangay_clearance/' . $project->barangay_clearance)) {
                Storage::disk('public')->delete('environmental_compliance_certificate/' . $project->environmental_compliance_certificate);
            }
        }

        $project->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }

    public function report($id)
    {
        $project = Project::with([
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
        ])->findOrFail($id);

        // signatories
        $signatories = [
            'admin' => User::where('role', 0)->latest()->get(['name']),
            'staffone' => User::where('role', 1)->latest()->get(['name']),
            'stafftwo' => User::where('role', 2)->latest()->get(['name']),
            'engineer' => $project->siteEngineer->name,
            'mayor' => User::where('role', 4)->latest()->get(['name']),
        ];

        return response()->json([
            'data' => [
                'project' => $project,
                'signatories' => $signatories,
            ]
        ], 200);
    }
}
