<?php

namespace App\Http\Controllers\StaffOne;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StaffOneDashboardController extends Controller
{
    public function index()
    {
        return inertia('StaffOne/Dashboard');
    }
}
