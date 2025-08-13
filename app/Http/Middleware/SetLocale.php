<?php

namespace App\Http\Middleware;

use Closure;

class SetLocale
{
    public function handle($request, Closure $next)
    {
        $locale = $request->header('X-Locale');

        if ($locale) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
