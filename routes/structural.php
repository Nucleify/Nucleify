<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Structural\StructuralController;

$routes = [
    'index',
    'links',
    'questions',
    'technologies'
];

foreach ($routes as $route) {
    $endpoint = ($route !== 'index') ? $route : '';

    Route::get("/$endpoint", [StructuralController::class, 'renderStructural'])
        ->name($route)
        ->defaults('structural', $route);
}
