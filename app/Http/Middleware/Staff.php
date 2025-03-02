<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Staff
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user()->isStaff()) {
            return $next($request);
        }

        return redirect('/dashboard')->with('error', 'You do not have permission to access this page.');
    }
}
