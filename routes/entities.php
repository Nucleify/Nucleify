<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Entities\EntitiesController;


$routes = [
    'index',
    'articles',
    'contacts',
    'money',
];

foreach ($routes as $route) {
    $endpoint = ($route !== 'index') ? $route : '';

    Route::get("/$endpoint", [EntitiesController::class, 'renderEntity'])
        ->name($route)
        ->defaults('entity', $route);
}
