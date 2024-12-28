<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Engineer\EngineerProjectStoreRequest;
use App\Http\Requests\Engineer\EngineerProjectUpdateRequest;
use App\Models\ImageUpdate;
use App\Models\Project;
use App\Models\ProjectUpdate;
use App\Models\User;
use App\Notifications\ProjectUpdateNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EngineerProjectUpdateController extends Controller
{
    public function index($id)
    {
        $currentProject = Project::whereIn('status', ['Ongoing', 'Completed'])->findOrFail($id);

        return inertia('Engineer/Update/Index', [
            'currentProject' => $currentProject, 
        ]);
    }


    public function getData($id)
    {
        $projectDetails = Project::with(['siteEngineer','contructor','updates' => function($query) {
            $query->orderBy('update_date', 'desc')
                ->with(['siteEngineer','images']); // Include the images relationship of updates
        }])->findOrFail($id);


        // Retrieve the latest update
        $latestUpdate = $projectDetails->updates()->latest('created_at')->first();

        // Extract the progress values if a latest update exists
        $latestUpdate = $latestUpdate ? [
            'latestUpdateId' => $latestUpdate->id,
            'excavation_progress' => $latestUpdate->excavation_progress,
            'concrete_works_progress' => $latestUpdate->concrete_works_progress,
            'water_works_progress' => $latestUpdate->water_works_progress,
            'metal_works_progress' => $latestUpdate->metal_works_progress,
            'cement_plaster_and_finishes_progress' => $latestUpdate->cement_plaster_and_finishes_progress,
        ] : null;

        return response()->json([
            'projectDetails' => $projectDetails,
            'latestUpdate' => $latestUpdate,
        ], 200);
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

    public function deleteUpload($id)
    {
        $image =  ImageUpdate::findOrFail($id);

        $projectUpdate = $image->projectUpdate;
        $imageCount = $projectUpdate->images()->count(); 

        if ($imageCount === 1) {
            return response()->json([
                'status' => 'limit'
            ], 422);
        }

        if (Storage::disk('public')->exists('project_images/' . $image->file_path)) {
                Storage::disk('public')->delete('project_images/' . $image->file_path);
            }

        $image->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
    public function store(EngineerProjectStoreRequest $request)
    {
        $data = $request->validated();

        $data['engineer'] = Auth::user()->id;
        $data['update_date'] = now('Asia/Manila');

        $projectId = Project::findOrFail($data['project']);

        // Check progress and update project status
        $excavation_progress = $data['excavation_progress'];
        $concrete_works_progress = $data['excavation_progress'];
        $water_works_progress = $data['water_works_progress'];
        $metal_works_progress = $data['metal_works_progress'];
        $cement_plaster_and_finishes_progress = $data['cement_plaster_and_finishes_progress'];

        if (
            $excavation_progress === 100 &&
            $concrete_works_progress === 100 &&
            $water_works_progress === 100 &&
            $metal_works_progress === 100 &&
            $cement_plaster_and_finishes_progress === 100
        ) {
            $projectId->status = 'Completed';
        } else {
            $projectId->status = 'Ongoing';
        }

        $projectId->save();

        $project = ProjectUpdate::create($data);

        $imageResponses = $request->input('project_images'); // Array of images

        foreach ($imageResponses as $image) {
            $imgFilename = $image['response'] ?? null;

            if ($imgFilename) {
                ImageUpdate::create([
                    'project_update' => $project->id,
                    'file_path' => $imgFilename,
                ]);

                if (Storage::disk('public')->exists('temp/' . $imgFilename)) {
                    Storage::disk('public')->move('temp/' . $imgFilename, 'project_images/' . $imgFilename);
                }
            }
        }


        // Notify all users
        $allUsers = User::all();
        Notification::send($allUsers, new ProjectUpdateNotification($projectId->name ?? 'Project'));

        return response()->json([
                'status' => 'created'
            ], 200);
        }

    public function update(EngineerProjectUpdateRequest $request, $id)
    {
        // Validate the request
        $data = $request->validated();

        // Find the project update by ID
        $project = ProjectUpdate::findOrFail($id);
        
        $projectId = Project::findOrFail($project->project);

        //if all progress === 100
        //update the projectId->status === Completed otherwise status === ongoing
        $excavation_progress = $data['excavation_progress'];
        $concrete_works_progress = $data['excavation_progress'];
        $water_works_progress = $data['water_works_progress'];
        $metal_works_progress = $data['metal_works_progress'];
        $cement_plaster_and_finishes_progress = $data['cement_plaster_and_finishes_progress'];

        // Check if all progress values are 100%
        if (
            $excavation_progress === 100 &&
            $concrete_works_progress === 100 &&
            $water_works_progress === 100 &&
            $metal_works_progress === 100 &&
            $cement_plaster_and_finishes_progress === 100
        ) {
            $projectId->status = 'Completed';
        } else {
            $projectId->status = 'Ongoing';
        }

        // Save the updated project status
        $projectId->save();

        // Update the project update fields
        $data['update_date'] = now('Asia/Manila');
        $project->update($data);

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
        
        // Notify all users
        // $allUsers = User::all();
        // Notification::send($allUsers, new ProjectUpdateNotification($projectId->name ?? 'Project'));

        return response()->json([
            'status' => 'updated'
        ], 200);
    }


    public function destroy($id)
    {
        $projectUpdate = ProjectUpdate::findOrFail($id);

        $images = $projectUpdate->images;

        // Remove all associated images
        foreach ($images as $image) {
            // Delete the physical file from storage
            if (Storage::disk('public')->exists('project_images/' . $image->file_path)) {
                Storage::disk('public')->delete('project_images/' . $image->file_path);
            }
        }

        $projectUpdate->delete();

        $updatedProject = Project::findOrFail($projectUpdate->project);

        $excavation_progress = $updatedProject->excavation_progress;
        $concrete_works_progress = $updatedProject->concrete_works_progress;
        $water_works_progress = $updatedProject->water_works_progress;
        $metal_works_progress = $updatedProject->metal_works_progress;
        $cement_plaster_and_finishes_progress = $updatedProject->cement_plaster_and_finishes_progress;

        // Check if all progress values are 100%
        if (
            $excavation_progress === 100 &&
            $concrete_works_progress === 100 &&
            $water_works_progress === 100 &&
            $metal_works_progress === 100 &&
            $cement_plaster_and_finishes_progress === 100
        ) {
            $updatedProject->status = 'Completed';
        } else {
            $updatedProject->status = 'Ongoing';
        }

        // Save the updated project status
        $updatedProject->save();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }

}
