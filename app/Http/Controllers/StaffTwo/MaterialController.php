<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use App\Models\Contructor;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function index($id)
    {
        $project = Project::findOrFail($id);

        return inertia('StaffTwo/Material/Index',[
            'project' => $project
        ]);
    }
}
