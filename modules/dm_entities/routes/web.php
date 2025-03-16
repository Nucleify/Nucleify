<?php

namespace Routes;

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EntitiesController;


$routes = [
    'index',
    'articles',
    'contacts',
    'money',
];

Route::prefix('entities')->group(function () use ($routes) {
    foreach ($routes as $route) {
        $endpoint = ($route !== 'index') ? $route : '';

        Route::get("/$endpoint", [EntitiesController::class, 'renderEntity'])
            ->name($route)
            ->defaults('entity', $route);
    }
});
