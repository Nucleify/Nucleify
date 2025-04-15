<?php

use App\Http\Controllers\StructuralController;
use Illuminate\Support\Facades\Route;

$routes = [
    'index',
    'cards',
    'features',
    'links',
    'questions',
    'technologies',
];

Route::prefix('structural')->group(function () use ($routes) {
    foreach ($routes as $route) {
        $endpoint = ($route !== 'index') ? $route : '';

        Route::get("/$endpoint", [StructuralController::class, 'renderStructural'])
            ->name('structural.' . $route)
            ->defaults('structural', $route);
    }
});
