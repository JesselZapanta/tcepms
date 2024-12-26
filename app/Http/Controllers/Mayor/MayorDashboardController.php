<?php

namespace App\Http\Controllers\Mayor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MayorDashboardController extends Controller
{
    
    public function index()
    {
        return inertia('Mayor/Dashboard');
    }
}
