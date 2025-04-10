<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard()
    {
        if(Auth::check()){
            $role = Auth::user()->role;

            if($role === 0){
                return redirect()->route('admin.dashboard');
            }else if($role === 1){
                return redirect()->route('staffone.dashboard');
            }else if($role === 2){
                return redirect()->route('stafftwo.dashboard');
            }else if($role === 3){
                return redirect()->route('engineer.dashboard');
            }else if($role === 4){
                return redirect()->route('mayor.dashboard');
            }
        }
    }
}
