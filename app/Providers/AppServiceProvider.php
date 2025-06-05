<?php

namespace App\Providers;

use App\Models\Project;
use App\Models\RequestDateExtension;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share('badge', function () {

            if (Auth::check()) {

                // Admin
                $ongoingProject = Project::where('status', 'ongoing')->count();
                $requestExtension = RequestDateExtension::where('status', 0)->count();
                $assingedOngoingProject = Project::where('status', 'ongoing')
                                        ->where('engineer', Auth::user()->id)
                                        ->count();
                
                //Staffone
                $pendingMaterials = Project::where('status', 'material')->count();

                //Stafftwo
                $pendingLabor = Project::where('status', 'labor')->count();

                return [
                // Admin
                    'ongoingProject' => $ongoingProject,
                    'requestExtension' => $requestExtension,
                    'assingedOngoingProject' => $assingedOngoingProject,

                    'pendingMaterials' => $pendingMaterials,

                    'pendingLabor' => $pendingLabor,
                ];
            }
            return null;
        });
    }
}
