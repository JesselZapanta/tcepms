<?php

use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminContructorController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminFundController;
use App\Http\Controllers\Admin\AdminProjectController;
use App\Http\Controllers\Admin\AdminProjectExtensionController;
use App\Http\Controllers\Admin\AdminProjectMonitoringController;
use App\Http\Controllers\Admin\AdminProjectUpdateController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Engineer\EngineerDashboardController;
use App\Http\Controllers\Engineer\EngineerProjectController;
use App\Http\Controllers\Engineer\EngineerProjectMonitoringController;
use App\Http\Controllers\Engineer\EngineerProjectRequestExtension;
use App\Http\Controllers\Engineer\EngineerProjectUpdateController;
use App\Http\Controllers\Mayor\MayorDashboardController;
use App\Http\Controllers\Mayor\MayorProjectController;
use App\Http\Controllers\Mayor\MayorProjectMonitoringController;
use App\Http\Controllers\Mayor\MayorProjectUpdateController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffOne\PlasterFinishController;
use App\Http\Controllers\StaffOne\StaffOneProjectController;//
use App\Http\Controllers\StaffOne\StaffOneDashboardController;
use App\Http\Controllers\StaffOne\ConcreteController;
use App\Http\Controllers\StaffOne\EquipmentController;
use App\Http\Controllers\StaffOne\ExcavationController;
use App\Http\Controllers\StaffOne\MaterialController;
use App\Http\Controllers\StaffOne\StaffOneProjectExtensionController;
use App\Http\Controllers\StaffOne\StaffOneProjectMonitoringController;
use App\Http\Controllers\StaffOne\StaffOneProjectUpdateController;
use App\Http\Controllers\StaffOne\WaterController;
use App\Http\Controllers\StaffTwo\ConcreteLaborConroller;
use App\Http\Controllers\StaffTwo\LaborController;
use App\Http\Controllers\StaffOne\MetalController;
use App\Http\Controllers\StaffTwo\MetalLaborController;
use App\Http\Controllers\StaffTwo\PlasterFinishLaborController;
use App\Http\Controllers\StaffTwo\StaffTwoDashboardController;
use App\Http\Controllers\StaffTwo\StaffTwoProjectController;
use App\Http\Controllers\StaffTwo\StaffTwoProjectMonitoringController;
use App\Http\Controllers\StaffTwo\StaffTwoProjectUpdateController;
use App\Http\Controllers\StaffTwo\WaterLaborController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', function () {
    // Redirect to the login route
    return Redirect::route('login');
});

Route::get('/deactivated', function () {
    return Inertia::render('Error/DeactivatedAccount', [
         'error' => session('error') // Pass any session error message
    ]);
})->name('deactivated');


Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

Route::middleware(['auth','admin','userStatus'])->group(function() {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/dashboard/getdata', [AdminDashboardController::class, 'getData']);

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

    Route::get('/admin/category', [AdminCategoryController::class, 'index'])->name('admin.category');
    Route::get('/admin/category/getdata', [AdminCategoryController::class, 'getData']);
    Route::post('/admin/category/store', [AdminCategoryController::class, 'store']);
    Route::put('/admin/category/update/{id}', [AdminCategoryController::class, 'update']);
    Route::delete('/admin/category/destroy/{id}', [AdminCategoryController::class, 'destroy']);

    Route::get('/admin/fund', [AdminFundController::class, 'index'])->name('admin.fund');
    Route::get('/admin/fund/getdata', [AdminFundController::class, 'getData']);
    Route::post('/admin/fund/store', [AdminFundController::class, 'store']);
    Route::put('/admin/fund/update/{id}', [AdminFundController::class, 'update']);
    Route::delete('/admin/fund/destroy/{id}', [AdminFundController::class, 'destroy']);

    Route::get('/admin/contructor/project/{id}', [AdminContructorController::class, 'project'])->name('admin.contructor-project');
    Route::get('/admin/contructor/getprojects', [AdminContructorController::class, 'getprojects']);

    Route::get('/admin/project', [AdminProjectController::class, 'index'])->name('admin.project');
    Route::get('/admin/project/getdata', [AdminProjectController::class, 'getdata']);
    Route::get('/admin/project/get-report/{id}', [AdminProjectController::class, 'report']);

    Route::get('/admin/request-extension', [AdminProjectExtensionController::class, 'index'])->name('admin.project-request-extension');
    Route::get('/admin/request-extension/getdata', [AdminProjectExtensionController::class, 'getdata']);
    Route::put('/admin/request-extension/update/{id}', [AdminProjectExtensionController::class, 'update']);

    Route::get('/admin/project-monitoring', [AdminProjectMonitoringController::class, 'index'])->name('admin.project-monitoring');
    Route::get('/admin/project-monitoring/getdata', [AdminProjectMonitoringController::class, 'getData']);
    Route::get('/admin/project-monitoring/graph/{id}', [AdminProjectMonitoringController::class, 'graph'])->name('admin.project-monitoring-graph');

    Route::get('/admin/project-monitoring/project/{id}', [AdminProjectUpdateController::class, 'index'])->name('admin.project-update');
    Route::get('/admin/project-monitoring/project/getData/{id}', [AdminProjectUpdateController::class, 'getData']);
    Route::get('/admin/project-monitoring/calendar/project/{id}', [AdminProjectUpdateController::class, 'calendar'])->name('admin.project-update-calendar');
});

Route::middleware(['auth', 'staffone','userStatus'])->group(function() {
    Route::get('/staffone/dashboard', [StaffOneDashboardController::class, 'index'])->name('staffone.dashboard');
    Route::get('/staffone/dashboard/getdata', [StaffOneDashboardController::class, 'getData']);

    Route::get('/staffone/project', [StaffOneProjectController::class, 'index'])->name('staffone.project');
    Route::get('/staffone/project/getdata', [StaffOneProjectController::class, 'getData']);
    
    //Uploads

     //building_permit
    Route::post('/staffone/building-permit-temp-upload', [StaffOneProjectController::class, 'buildingPermitTempUpload']);
    Route::post('/staffone/building-permit-temp-remove/{filename}', [StaffOneProjectController::class, 'buildingPermitRemoveUpload']);
    Route::post('/staffone/building-permit-replace/{id}/{filename}', [StaffOneProjectController::class, 'buildingPermitReplaceUpload']);
    
    //environmental_compliance_certificate
    Route::post('/staffone/environmental-temp-upload', [StaffOneProjectController::class, 'environmentalTempUpload']);
    Route::post('/staffone/environmental-temp-remove/{filename}', [StaffOneProjectController::class, 'environmentalRemoveUpload']);
    Route::post('/staffone/environmental-replace/{id}/{filename}', [StaffOneProjectController::class, 'environmentalReplaceUpload']);
    
    //barangay_clearance
    Route::post('/staffone/barangay-clearance-temp-upload', [StaffOneProjectController::class, 'barangayTempUpload']);
    Route::post('/staffone/barangay-clearance-temp-remove/{filename}', [StaffOneProjectController::class, 'barangayRemoveUpload']);
    Route::post('/staffone/barangay-clearance-replace/{id}/{filename}', [StaffOneProjectController::class, 'barangayReplaceUpload']);


    Route::post('/staffone/project/store', [StaffOneProjectController::class, 'store']);
    Route::put('/staffone/project/update/{id}', [StaffOneProjectController::class, 'update']);
    Route::delete('/staffone/project/destroy/{id}', [StaffOneProjectController::class, 'destroy']);
    Route::get('/staffone/project/get-report/{id}', [StaffOneProjectController::class, 'report']);
    
    //transfer to admin 
    // Route::get('/staffone/request-extension', [StaffOneProjectExtensionController::class, 'index'])->name('staffone.project-request-extension');
    // Route::get('/staffone/request-extension/getdata', [StaffOneProjectExtensionController::class, 'getdata']);
    // Route::put('/staffone/request-extension/update/{id}', [StaffOneProjectExtensionController::class, 'update']);

    Route::get('/staffone/materials/index/{id}', [MaterialController::class, 'index'])->name('staffone.material');
    Route::get('/staffone/materials/getcost/{id}', [MaterialController::class, 'getCost']);
    Route::put('/staffone/materials/compile/{id}', [MaterialController::class, 'compile']);

    Route::get('/staffone/materials/excavation/getdata', [ExcavationController::class, 'getdata']);
    Route::post('/staffone/materials/excavation/store', [ExcavationController::class, 'store']);
    Route::put('/staffone/materials/excavation/update/{id}', [ExcavationController::class, 'update']);
    Route::delete('/staffone/materials/excavation/destroy/{id}', [ExcavationController::class, 'destroy']);

    Route::get('/staffone/materials/concrete/getdata', [ConcreteController::class, 'getdata']);
    Route::post('/staffone/materials/concrete/store', [ConcreteController::class, 'store']);
    Route::put('/staffone/materials/concrete/update/{id}', [ConcreteController::class, 'update']);
    Route::delete('/staffone/materials/concrete/destroy/{id}', [ConcreteController::class, 'destroy']);

    Route::get('/staffone/materials/metal/getdata', [MetalController::class, 'getdata']);
    Route::post('/staffone/materials/metal/store', [MetalController::class, 'store']);
    Route::put('/staffone/materials/metal/update/{id}', [MetalController::class, 'update']);
    Route::delete('/staffone/materials/metal/destroy/{id}', [MetalController::class, 'destroy']);

    Route::get('/staffone/materials/equipment/getdata', [EquipmentController::class, 'getdata']);
    Route::post('/staffone/materials/equipment/store', [EquipmentController::class, 'store']);
    Route::put('/staffone/materials/equipment/update/{id}', [EquipmentController::class, 'update']);
    Route::delete('/staffone/materials/equipment/destroy/{id}', [EquipmentController::class, 'destroy']);

    Route::get('/staffone/materials/water/getdata', [WaterController::class, 'getdata']);
    Route::post('/staffone/materials/water/store', [WaterController::class, 'store']);
    Route::put('/staffone/materials/water/update/{id}', [WaterController::class, 'update']);
    Route::delete('/staffone/materials/water/destroy/{id}', [WaterController::class, 'destroy']);

    Route::get('/staffone/materials/plaster-finish/getdata', [PlasterFinishController::class, 'getdata']);
    Route::post('/staffone/materials/plaster-finish/store', [PlasterFinishController::class, 'store']);
    Route::put('/staffone/materials/plaster-finish/update/{id}', [PlasterFinishController::class, 'update']);
    Route::delete('/staffone/materials/plaster-finish/destroy/{id}', [PlasterFinishController::class, 'destroy']);
    
    Route::get('/staffone/project-monitoring', [StaffOneProjectMonitoringController::class, 'index'])->name('staffone.project-monitoring');
    Route::get('/staffone/project-monitoring/getdata', [StaffOneProjectMonitoringController::class, 'getData']);
    Route::get('/staffone/project-monitoring/graph/{id}', [StaffOneProjectMonitoringController::class, 'graph'])->name('staffone.project-monitoring-graph');

    Route::get('/staffone/project-monitoring/project/{id}', [StaffOneProjectUpdateController::class, 'index'])->name('staffone.project-update');

    Route::get('/staffone/project-monitoring/calendar/project/{id}', [StaffOneProjectUpdateController::class, 'calendar'])->name('staffone.project-update-calendar');
    
    Route::get('/staffone/project-monitoring/project/getData/{id}', [StaffOneProjectUpdateController::class, 'getData']);
});

Route::middleware(['auth', 'stafftwo','userStatus'])->group(function() {
    Route::get('/stafftwo/dashboard', [StaffTwoDashboardController::class, 'index'])->name('stafftwo.dashboard');
    Route::get('/stafftwo/dashboard/getdata', [StaffTwoDashboardController::class, 'getData']);

    Route::get('/stafftwo/project', [StaffTwoProjectController::class, 'index'])->name('stafftwo.project');
    Route::get('/stafftwo/project/getdata', [StaffTwoProjectController::class, 'getdata']);
    Route::get('/stafftwo/project/get-report/{id}', [StaffTwoProjectController::class, 'report']);

    Route::get('/stafftwo/labor/index/{id}', [LaborController::class, 'index'])->name('stafftwo.labor');
    Route::get('/stafftwo/labor/getcost/{id}', action: [LaborController::class, 'getCost']);
    Route::put('/stafftwo/materials/compile/{id}', [LaborController::class, 'compile']);

    Route::get('/stafftwo/labor/concrete/getdata', [ConcreteLaborConroller::class, 'getdata']);
    Route::post('/stafftwo/labor/concrete/store', [ConcreteLaborConroller::class, 'store']);
    Route::put('/stafftwo/labor/concrete/update/{id}', [ConcreteLaborConroller::class, 'update']);
    Route::delete('/stafftwo/labor/concrete/destroy/{id}', [ConcreteLaborConroller::class, 'destroy']);
    
    Route::get('/stafftwo/labor/water/getdata', [WaterLaborController::class, 'getdata']);
    Route::post('/stafftwo/labor/water/store', [WaterLaborController::class, 'store']);
    Route::put('/stafftwo/labor/water/update/{id}', [WaterLaborController::class, 'update']);
    Route::delete('/stafftwo/labor/water/destroy/{id}', [WaterLaborController::class, 'destroy']);

    Route::get('/stafftwo/labor/metal/getdata', [MetalLaborController::class, 'getdata']);
    Route::post('/stafftwo/labor/metal/store', [MetalLaborController::class, 'store']);
    Route::put('/stafftwo/labor/metal/update/{id}', [MetalLaborController::class, 'update']);
    Route::delete('/stafftwo/labor/metal/destroy/{id}', [MetalLaborController::class, 'destroy']);

    Route::get('/stafftwo/labor/plaster-finish/getdata', [PlasterFinishLaborController::class, 'getdata']);
    Route::post('/stafftwo/labor/plaster-finish/store', [PlasterFinishLaborController::class, 'store']);
    Route::put('/stafftwo/labor/plaster-finish/update/{id}', [PlasterFinishLaborController::class, 'update']);
    Route::delete('/stafftwo/labor/plaster-finish/destroy/{id}', [PlasterFinishLaborController::class, 'destroy']);

    Route::get('/stafftwo/project-monitoring', [StaffTwoProjectMonitoringController::class, 'index'])->name('stafftwo.project-monitoring');
    Route::get('/stafftwo/project-monitoring/graph/{id}', [StaffTwoProjectMonitoringController::class, 'graph'])->name('stafftwo.project-monitoring-graph');
    Route::get('/stafftwo/project-monitoring/getdata', [StaffTwoProjectMonitoringController::class, 'getData']);

    Route::get('/stafftwo/project-monitoring/project/{id}', [StaffTwoProjectUpdateController::class, 'index'])->name('stafftwo.project-update');
    
    Route::get('/stafftwo/project-monitoring/calendar/project/{id}', [StaffTwoProjectUpdateController::class, 'calendar'])->name('stafftwo.project-update-calendar');

    Route::get('/stafftwo/project-monitoring/project/getData/{id}', [StaffTwoProjectUpdateController::class, 'getData']);
});

Route::middleware(['auth', 'engineer','userStatus'])->group(function() {
    Route::get('/engineer/dashboard', [EngineerDashboardController::class, 'index'])->name('engineer.dashboard');
    Route::get('/engineer/dashboard/getdata', [EngineerDashboardController::class, 'getData']);

    Route::get('/engineer/project', [EngineerProjectController::class, 'index'])->name('engineer.project');
    Route::get('/engineer/project/getdata', [EngineerProjectController::class, 'getdata']);
    Route::get('/engineer/project/get-report/{id}', [EngineerProjectController::class, 'report']);

    Route::get('/engineer/project-monitoring', [EngineerProjectMonitoringController::class, 'index'])->name('engineer.project-monitoring');
    Route::get('/engineer/project-monitoring/graph/{id}', [EngineerProjectMonitoringController::class, 'graph'])->name('engineer.project-monitoring-graph');
    Route::get('/engineer/project-monitoring/getdata', [EngineerProjectMonitoringController::class, 'getData']);

    Route::get('/engineer/project-update/{id}', [EngineerProjectUpdateController::class, 'index'])->name('engineer.project-update');

    Route::get('/engineer/project-update/getData/{id}', [EngineerProjectUpdateController::class, 'getData']);
    Route::post('/engineer/project-images/temp-upload', [EngineerProjectUpdateController::class, 'tempUpload']);
    Route::post('/engineer/project-images/remove-upload/{filename}', [EngineerProjectUpdateController::class, 'removeUpload']);
    Route::post('/engineer/project-images/delete-upload/{id}', [EngineerProjectUpdateController::class, 'deleteUpload']);
    Route::post('/engineer/project-update/store', [EngineerProjectUpdateController::class, 'store']);
    Route::put('/engineer/project-update/update/{id}', [EngineerProjectUpdateController::class, 'update']);
    Route::delete('/engineer/project-update/destroy/{id}', [EngineerProjectUpdateController::class, 'destroy']);

    Route::get('/engineer/project-monitoring/calendar/project/{id}', [EngineerProjectUpdateController::class, 'calendar'])->name('engineer.project-update-calendar');

    Route::get('/engineer/request-extension/{id}', [EngineerProjectRequestExtension::class, 'index'])->name('engineer.project-request-extension');
    Route::get('/engineer/project-request-extension/getdata/{id}', [EngineerProjectRequestExtension::class, 'getdata']);
    Route::post('/engineer/request-extension/store/{id}', [EngineerProjectRequestExtension::class, 'store']);
    Route::put('/engineer/request-extension/update/{id}', [EngineerProjectRequestExtension::class, 'update']);
    Route::delete('/engineer/request-extension/destroy/{id}', [EngineerProjectRequestExtension::class, 'destroy']);

});

    // Route::get('/send-sms', [EngineerProjectUpdateController::class, 'sendSms']);

Route::middleware(['auth', 'mayor','userStatus'])->group(function() {
    Route::get('/mayor/dashboard', [MayorDashboardController::class, 'index'])->name('mayor.dashboard');
    Route::get('/mayor/dashboard/getdata', [MayorDashboardController::class, 'getData']);

    Route::get('/mayor/project', [MayorProjectController::class, 'index'])->name('mayor.project');
    Route::get('/mayor/project/getdata', [MayorProjectController::class, 'getdata']);
    Route::get('/mayor/project/get-report/{id}', [MayorProjectController::class, 'report']);

    Route::get('/mayor/project-monitoring', [MayorProjectMonitoringController::class, 'index'])->name('mayor.project-monitoring');
    Route::get('/mayor/project-monitoring/graph/{id}', [MayorProjectMonitoringController::class, 'graph'])->name('mayor.project-monitoring-graph');
    Route::get('/mayor/project-monitoring/getdata', [MayorProjectMonitoringController::class, 'getData']);

    Route::get('/mayor/project-monitoring/project/{id}', [MayorProjectUpdateController::class, 'index'])->name('mayor.project-update');
    Route::get('/mayor/project-monitoring/calendar/project/{id}', [MayorProjectUpdateController::class, 'calendar'])->name('mayor.project-update-calendar');
    Route::get('/mayor/project-monitoring/project/getData/{id}', [MayorProjectUpdateController::class, 'getData']);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
