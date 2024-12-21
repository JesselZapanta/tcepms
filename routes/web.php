<?php

use App\Http\Controllers\Admin\AdminContructorController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffOne\ProjectController;
use App\Http\Controllers\StaffOne\StaffOneDashboardController;
use App\Http\Controllers\StaffTwo\ConcreteController;
use App\Http\Controllers\StaffTwo\ExcavationController;
use App\Http\Controllers\StaffTwo\MaterialController;
use App\Http\Controllers\StaffTwo\StaffTwoDashboardController;
use App\Http\Controllers\StaffTwo\StaffTwoProjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

Route::middleware(['auth','admin'])->group(function() {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/user', [AdminUserController::class, 'index'])->name('admin.user');
    Route::get('/admin/user/getdata', [AdminUserController::class, 'getData']);
    Route::post('/admin/user/store', [AdminUserController::class, 'store']);
    Route::put('/admin/user/update/{id}', [AdminUserController::class, 'update']);
    Route::delete('/admin/user/destroy/{id}', [AdminUserController::class, 'destroy']);

    Route::get('/admin/contructor', [AdminContructorController::class, 'index'])->name('admin.contructor');
    Route::get('/admin/contructor/getdata', [AdminContructorController::class, 'getData']);
    Route::post('/admin/contructor/store', [AdminContructorController::class, 'store']);
    Route::put('/admin/contructor/update/{id}', [AdminContructorController::class, 'update']);
    Route::delete('/admin/contructor/destroy/{id}', [AdminContructorController::class, 'destroy']);
});

Route::middleware(['auth', 'staffone'])->group(function() {
    Route::get('/staffone/dashboard', [StaffOneDashboardController::class, 'index'])->name('staffone.dashboard');

    Route::get('/staffone/project', [ProjectController::class, 'index'])->name('staffone.project');
    Route::get('/staffone/project/getdata', [ProjectController::class, 'getData']);
    Route::post('/staffone/project/store', [ProjectController::class, 'store']);
    Route::put('/staffone/project/updata/{id}', [ProjectController::class, 'update']);
    Route::delete('/staffone/project/destroy/{id}', [ProjectController::class, 'destroy']);
});

Route::middleware(['auth', 'stafftwo'])->group(function() {
    Route::get('/stafftwo/dashboard', [StaffTwoDashboardController::class, 'index'])->name('stafftwo.dashboard');

    Route::get('/stafftwo/project', [StaffTwoProjectController::class, 'index'])->name('stafftwo.project');
    Route::get('/stafftwo/project/getdata', [StaffTwoProjectController::class, 'getdata']);

    Route::get('/stafftwo/materials/index/{id}', [MaterialController::class, 'index'])->name('stafftwo.material');
    
    Route::get('/stafftwo/materials/excavation/getdata', [ExcavationController::class, 'getdata']);
    Route::post('/stafftwo/materials/excavation/store', [ExcavationController::class, 'store']);
    Route::put('/stafftwo/materials/excavation/updata/{id}', [ExcavationController::class, 'update']);
    Route::delete('/stafftwo/materials/excavation/destroy/{id}', [ExcavationController::class, 'destroy']);

    Route::get('/stafftwo/materials/concrete/getdata', [ConcreteController::class, 'getdata']);
    Route::post('/stafftwo/materials/concrete/store', [ConcreteController::class, 'store']);
    Route::put('/stafftwo/materials/concrete/updata/{id}', [ConcreteController::class, 'update']);
    Route::delete('/stafftwo/materials/concrete/destroy/{id}', [ConcreteController::class, 'destroy']);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
