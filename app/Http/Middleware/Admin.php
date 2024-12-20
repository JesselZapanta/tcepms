<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 0 = admin, 1 = staff 1, 2 = staff 2, 3 = on-site engineer, 4 = mayor
        if(Auth::check() && Auth::user()->role === 0){
            return $next($request);
        }
        abort(403, 'Access Denied');
    }
}
