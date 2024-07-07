<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminPanel
{
    public function handle(Request $request, Closure $next)
    {
        if (
            auth()->user()->isAdmin() ||
            auth()->user()->isTestAdmin() ||
            auth()->user()->isSuperAdmin()
        ) {
            return $next($request);
        }

        return redirect('/dashboard')->with('error', 'You do not have permission to access this page.');
    }
}
