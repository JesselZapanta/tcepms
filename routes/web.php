<?php

use App\Http\Controllers\Admin\AdminContructorController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffOne\PlasterFinishController;
use App\Http\Controllers\StaffOne\ProjectController;
use App\Http\Controllers\StaffOne\StaffOneDashboardController;
use App\Http\Controllers\StaffOne\ConcreteController;
use App\Http\Controllers\StaffOne\EquipmentController;
use App\Http\Controllers\StaffOne\ExcavationController;
use App\Http\Controllers\StaffOne\StaffOneMaterialController;
use App\Http\Controllers\StaffOne\WaterController;
use App\Http\Controllers\StaffTwo\MaterialController;
use App\Http\Controllers\StaffOne\MetalController;
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
    
    Route::get('/staffone/materials/index/{id}', [StaffOneMaterialController::class, 'index'])->name('staffone.material');

    Route::get('/staffone/materials/excavation/getdata', [ExcavationController::class, 'getdata']);
    Route::post('/staffone/materials/excavation/store', [ExcavationController::class, 'store']);
    Route::put('/staffone/materials/excavation/updata/{id}', [ExcavationController::class, 'update']);
    Route::delete('/staffone/materials/excavation/destroy/{id}', [ExcavationController::class, 'destroy']);

    Route::get('/staffone/materials/concrete/getdata', [ConcreteController::class, 'getdata']);
    Route::post('/staffone/materials/concrete/store', [ConcreteController::class, 'store']);
    Route::put('/staffone/materials/concrete/updata/{id}', [ConcreteController::class, 'update']);
    Route::delete('/staffone/materials/concrete/destroy/{id}', [ConcreteController::class, 'destroy']);

    Route::get('/staffone/materials/metal/getdata', [MetalController::class, 'getdata']);
    Route::post('/staffone/materials/metal/store', [MetalController::class, 'store']);
    Route::put('/staffone/materials/metal/updata/{id}', [MetalController::class, 'update']);
    Route::delete('/staffone/materials/metal/destroy/{id}', [MetalController::class, 'destroy']);

    Route::get('/staffone/materials/equipment/getdata', [EquipmentController::class, 'getdata']);
    Route::post('/staffone/materials/equipment/store', [EquipmentController::class, 'store']);
    Route::put('/staffone/materials/equipment/updata/{id}', [EquipmentController::class, 'update']);
    Route::delete('/staffone/materials/equipment/destroy/{id}', [EquipmentController::class, 'destroy']);

    Route::get('/staffone/materials/water/getdata', [WaterController::class, 'getdata']);
    Route::post('/staffone/materials/water/store', [WaterController::class, 'store']);
    Route::put('/staffone/materials/water/updata/{id}', [WaterController::class, 'update']);
    Route::delete('/staffone/materials/water/destroy/{id}', [WaterController::class, 'destroy']);

    Route::get('/staffone/materials/plaster-finish/getdata', [PlasterFinishController::class, 'getdata']);
    Route::post('/staffone/materials/plaster-finish/store', [PlasterFinishController::class, 'store']);
    Route::put('/staffone/materials/plaster-finish/updata/{id}', [PlasterFinishController::class, 'update']);
    Route::delete('/staffone/materials/plaster-finish/destroy/{id}', [PlasterFinishController::class, 'destroy']);
    
});

Route::middleware(['auth', 'stafftwo'])->group(function() {
    Route::get('/stafftwo/dashboard', [StaffTwoDashboardController::class, 'index'])->name('stafftwo.dashboard');

    Route::get('/stafftwo/project', [StaffTwoProjectController::class, 'index'])->name('stafftwo.project');
    Route::get('/stafftwo/project/getdata', [StaffTwoProjectController::class, 'getdata']);

    Route::get('/stafftwo/materials/index/{id}', [MaterialController::class, 'index'])->name('stafftwo.material');
    
    // Route::get('/stafftwo/materials/excavation/getdata', [ExcavationController::class, 'getdata']);
    // Route::post('/stafftwo/materials/excavation/store', [ExcavationController::class, 'store']);
    // Route::put('/stafftwo/materials/excavation/updata/{id}', [ExcavationController::class, 'update']);
    // Route::delete('/stafftwo/materials/excavation/destroy/{id}', [ExcavationController::class, 'destroy']);

    // Route::get('/stafftwo/materials/concrete/getdata', [ConcreteController::class, 'getdata']);
    // Route::post('/stafftwo/materials/concrete/store', [ConcreteController::class, 'store']);
    // Route::put('/stafftwo/materials/concrete/updata/{id}', [ConcreteController::class, 'update']);
    // Route::delete('/stafftwo/materials/concrete/destroy/{id}', [ConcreteController::class, 'destroy']);

    // Route::get('/stafftwo/materials/metal/getdata', [MetalController::class, 'getdata']);
    // Route::post('/stafftwo/materials/metal/store', [MetalController::class, 'store']);
    // Route::put('/stafftwo/materials/metal/updata/{id}', [MetalController::class, 'update']);
    // Route::delete('/stafftwo/materials/metal/destroy/{id}', [MetalController::class, 'destroy']);

    // Route::get('/stafftwo/materials/equipment/getdata', [EquipmentController::class, 'getdata']);
    // Route::post('/stafftwo/materials/equipment/store', [EquipmentController::class, 'store']);
    // Route::put('/stafftwo/materials/equipment/updata/{id}', [EquipmentController::class, 'update']);
    // Route::delete('/stafftwo/materials/equipment/destroy/{id}', [EquipmentController::class, 'destroy']);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
