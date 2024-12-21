<?php

namespace App\Http\Controllers\StaffTwo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StaffTwoDashboardController extends Controller
{
    public function index ()
    {
        return inertia('StaffTwo/Dashboard');
    }
}
