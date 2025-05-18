<?php

use App\Http\Controllers\PagesController;
use Illuminate\Support\Facades\Route;

$publicRoutes = require __DIR__ . '/constants/public.php';
$authRoutes = require __DIR__ . '/constants/auth.php';

$defineRoutes = function ($routes, $middleware = []) {
    $group = function () use ($routes) {
        foreach ($routes as $route) {
            $endpoint = $route !== 'index' ? $route : '';
            Route::get("/$endpoint", [PagesController::class, 'renderPage'])
                ->name($route)
                ->defaults('page', $route);
        }
    };

    if ($middleware) {
        Route::middleware($middleware)->group($group);
    } else {
        $group();
    }
};

$defineRoutes($publicRoutes);
$defineRoutes($authRoutes, ['web', 'auth']);
