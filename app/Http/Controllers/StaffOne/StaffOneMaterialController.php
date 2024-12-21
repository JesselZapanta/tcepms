<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class StaffOneMaterialController extends Controller
{
    public function index($id)
    {
        $project = Project::with(['excavation', 'concrete', 'water', 'metal', 'plasterFinish', 'equipment'])->findOrFail($id);

        return inertia('StaffOne/Material/Index',[
            'project' => $project
        ]);
    }
}
