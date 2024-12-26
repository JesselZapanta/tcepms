<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // 0 = admin, 1 = staff 1, 2 = staff 2, 3 = on-site engineer, 4 = mayor
        $middleware->alias([
            'admin' => \App\Http\Middleware\Admin::class,
            'staffone' => \App\Http\Middleware\StaffOne::class,
            'stafftwo' => \App\Http\Middleware\StaffTwo::class,
            'engineer' => \App\Http\Middleware\Engineer::class,
            'mayor' => \App\Http\Middleware\Mayor::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
