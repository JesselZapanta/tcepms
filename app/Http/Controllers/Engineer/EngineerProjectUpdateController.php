<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Engineer\EngineerProjectStoreRequest;
use App\Models\ImageUpdate;
use App\Models\Project;
use App\Models\ProjectUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EngineerProjectUpdateController extends Controller
{
    public function index($id)
    {
        // Fetch the project details
        $projectDetails = Project::with(['updates' => function($query) {
            $query->orderBy('update_date', 'desc');
        }])->findOrFail($id);

        // Retrieve the latest update
        $latestUpdate = $projectDetails->updates()->latest('created_at')->first();

        // Extract the progress values if a latest update exists
        $progressValues = $latestUpdate ? [
            'excavation_progress' => $latestUpdate->excavation_progress,
            'concrete_works_progress' => $latestUpdate->concrete_works_progress,
            'water_works_progress' => $latestUpdate->water_works_progress,
            'metal_works_progress' => $latestUpdate->metal_works_progress,
            'cement_plaster_and_finishes_progress' => $latestUpdate->cement_plaster_and_finishes_progress,
        ] : null;

        return inertia('Engineer/Update/Index', [
            'projectDetails' => $projectDetails, // All project details
            'latestProgress' => $progressValues  // Only the latest progress
        ]);
    }



    public function getData(Request $request)
    {
        return Project::with('siteEngineer:id,name')
                        ->where('name', 'like', "{$request->search}%")
                        ->paginate(10);
    }

    public function tempUpload(Request $request){
        $request->validate([
            'project_images' => ['required','mimes:jpg,jpeg,png']
        ]);
        
        $file = $request->project_images;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $imageName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $imagePath = $file->storeAs('temp', $imageName, 'public');
        $name = explode('/', $imagePath);
        return $name[1];
    }

    public function removeUpload($fileName){

        // return $fileName;
        if (Storage::disk('public')->exists('temp/' . $fileName)) {
            Storage::disk('public')->delete('temp/' . $fileName);

            return response()->json([
                'status' => 'remove'
            ], 200);
        }
    }

    public function store(EngineerProjectStoreRequest $request)
    {
        $data = $request->validated();

        $data['engineer'] = Auth::user()->id;
        $data['update_date'] = now('Asia/Manila');

        $project = ProjectUpdate::create($data);

        $imageResponses = $request->input('project_images'); // Array of images

        foreach ($imageResponses as $image) {
            $imgFilename = $image['response'] ?? null;

            if ($imgFilename) {
                // Save each image in the database
                ImageUpdate::create([
                    'project_update' => $project->id,
                    'file_path' => $imgFilename,
                ]);

                // Move each image from 'temp' to 'project_images'
                if (Storage::disk('public')->exists('temp/' . $imgFilename)) {
                    Storage::disk('public')->move('temp/' . $imgFilename, 'project_images/' . $imgFilename);
                }
            }
        }


        return response()->json([
            'status' => 'created'
        ], 200);
    }

    //for images
    
}
