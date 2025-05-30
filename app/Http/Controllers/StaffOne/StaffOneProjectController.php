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

    //structural_plan

    public function structuralPlanTempUpload(Request $request){
        $request->validate([
            'structural_plan' => ['required','mimes:pdf']
        ]);
        
        $file = $request->structural_plan;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $fileName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('temp', $fileName, 'public');
        $name = explode('/', $filePath);
        return $name[1];
    }
    public function structuralPlanRemoveUpload($fileName){

        // return $fileName;
        if (Storage::disk('public')->exists('temp/' . $fileName)) {
            Storage::disk('public')->delete('temp/' . $fileName);

            return response()->json([
                'status' => 'remove'
            ], 200);
        }
    }
    public function structuralPlanReplaceUpload($id, $fileName){
        $data = Project::find($id);
        $oldFile = $data->structural_plan;

        // return $oldFile;
        $data->structural_plan = null;
        $data->save();

        if (Storage::disk('public')->exists('structural_plan/' . $oldFile)) {
            Storage::disk('public')->delete('structural_plan/' . $oldFile);

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

    //compliance_standards

    public function complianceStandardsTempUpload(Request $request){
        $request->validate([
            'compliance_standards' => ['required','mimes:pdf']
        ]);
        
        $file = $request->compliance_standards;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $fileName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('temp', $fileName, 'public');
        $name = explode('/', $filePath);
        return $name[1];
    }
    public function complianceStandardsRemoveUpload($fileName){

        // return $fileName;
        if (Storage::disk('public')->exists('temp/' . $fileName)) {
            Storage::disk('public')->delete('temp/' . $fileName);

            return response()->json([
                'status' => 'remove'
            ], 200);
        }
    }
    public function complianceStandardsReplaceUpload($id, $fileName){
        $data = Project::find($id);
        $oldFile = $data->compliance_standards;

        // return $oldFile;
        $data->compliance_standards = null;
        $data->save();

        if (Storage::disk('public')->exists('compliance_standards/' . $oldFile)) {
            Storage::disk('public')->delete('compliance_standards/' . $oldFile);

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
    //zoning

    public function zoningTempUpload(Request $request){
        $request->validate([
            'zoning_clearance' => ['required','mimes:pdf']
        ]);
        
        $file = $request->zoning_clearance;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $fileName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('temp', $fileName, 'public');
        $name = explode('/', $filePath);
        return $name[1];
    }
    public function zoningRemoveUpload($fileName){

        // return $fileName;
        if (Storage::disk('public')->exists('temp/' . $fileName)) {
            Storage::disk('public')->delete('temp/' . $fileName);

            return response()->json([
                'status' => 'remove'
            ], 200);
        }
    }
    public function zoningReplaceUpload($id, $fileName){
        $data = Project::find($id);
        $oldFile = $data->zoning_clearance;

        // return $oldFile;
        $data->zoning_clearance = null;
        $data->save();

        if (Storage::disk('public')->exists('zoning_clearance/' . $oldFile)) {
            Storage::disk('public')->delete('zoning_clearance/' . $oldFile);

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

    //contractor_accreditation

    public function accreditationempUpload(Request $request){
        $request->validate([
            'contractor_accreditation' => ['required','mimes:pdf']
        ]);
        
        $file = $request->contractor_accreditation;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $fileName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('temp', $fileName, 'public');
        $name = explode('/', $filePath);
        return $name[1];
    }
    public function accreditationRemoveUpload($fileName){

        // return $fileName;
        if (Storage::disk('public')->exists('temp/' . $fileName)) {
            Storage::disk('public')->delete('temp/' . $fileName);

            return response()->json([
                'status' => 'remove'
            ], 200);
        }
    }
    public function accreditationReplaceUpload($id, $fileName){
        $data = Project::find($id);
        $oldFile = $data->contractor_accreditation;

        // return $oldFile;
        $data->contractor_accreditation = null;
        $data->save();

        if (Storage::disk('public')->exists('contractor_accreditation/' . $oldFile)) {
            Storage::disk('public')->delete('contractor_accreditation/' . $oldFile);

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

        $data = $request->validated();

        // return $data;

        //structural_plan
        if(!empty($data['structural_plan']) && isset($request->structural_plan[0]['response'])){
            $fileName = $request->structural_plan[0]['response'];
            $data['structural_plan'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'structural_plan/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        }

        //compliance_standards
        if(!empty($data['compliance_standards']) && isset($request->compliance_standards[0]['response'])){
            $fileName = $request->compliance_standards[0]['response'];
            $data['compliance_standards'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'compliance_standards/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        }

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

        //zoning_clearance
        if(!empty($data['zoning_clearance']) && isset($request->zoning_clearance[0]['response'])){
            $fileName = $request->zoning_clearance[0]['response'];
            $data['zoning_clearance'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'zoning_clearance/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        }

        //contractor_accreditation
        if(!empty($data['contractor_accreditation']) && isset($request->contractor_accreditation[0]['response'])){
            $fileName = $request->contractor_accreditation[0]['response'];
            $data['contractor_accreditation'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'contractor_accreditation/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        }

        //using date range
        // if (isset($data['dates']) && is_array($data['dates']) && count($data['dates']) === 2) {
        //     $data['start_date'] = $data['dates'][0];
        //     $data['end_date'] = $data['dates'][1];
        //     unset($data['dates']); // Optional: remove if not needed anymore
        // }
    
        
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

        //structural_plan
        if(!empty($data['structural_plan']) && isset($request->structural_plan[0]['response'])){
            $fileName = $request->structural_plan[0]['response'];
            $data['structural_plan'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'structural_plan/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        } else {
            unset($data['structural_plan']); 
        }
        //compliance_standards
        if(!empty($data['compliance_standards']) && isset($request->compliance_standards[0]['response'])){
            $fileName = $request->compliance_standards[0]['response'];
            $data['compliance_standards'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'compliance_standards/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        } else {
            unset($data['compliance_standards']); 
        }
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
        //zoning_clearance
        if(!empty($data['zoning_clearance']) && isset($request->zoning_clearance[0]['response'])){
            $fileName = $request->zoning_clearance[0]['response'];
            $data['zoning_clearance'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'zoning_clearance/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        } else {
            unset($data['zoning_clearance']); 
        }
        //contractor_accreditation
        if(!empty($data['contractor_accreditation']) && isset($request->contractor_accreditation[0]['response'])){
            $fileName = $request->contractor_accreditation[0]['response'];
            $data['contractor_accreditation'] = $fileName;

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                // Move the file
                Storage::disk('public')->move('temp/' . $fileName, 'contractor_accreditation/' . $fileName); 
                Storage::disk('public')->delete('temp/' . $fileName);
            }
        } else {
            unset($data['contractor_accreditation']); 
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

        //structural_plan
        if (!empty($project->structural_plan)) {
            if (Storage::disk('public')->exists('structural_plan/' . $project->structural_plan)) {
                Storage::disk('public')->delete('structural_plan/' . $project->structural_plan);
            }
        }
        //compliance_standards
        if (!empty($project->compliance_standards)) {
            if (Storage::disk('public')->exists('compliance_standards/' . $project->compliance_standards)) {
                Storage::disk('public')->delete('compliance_standards/' . $project->compliance_standards);
            }
        }
        //building_permit
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
                Storage::disk('public')->delete('barangay_clearance/' . $project->barangay_clearance);
            }
        }
        //zoning_clearance
        if (!empty($project->zoning_clearance)) {
            if (Storage::disk('public')->exists('zoning_clearance/' . $project->zoning_clearance)) {
                Storage::disk('public')->delete('zoning_clearance/' . $project->zoning_clearance);
            }
        }
        //contractor_accreditation
        if (!empty($project->contractor_accreditation)) {
            if (Storage::disk('public')->exists('contractor_accreditation/' . $project->contractor_accreditation)) {
                Storage::disk('public')->delete('contractor_accreditation/' . $project->contractor_accreditation);
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
