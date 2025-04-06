<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ArtisanController;

Route::controller(ArtisanController::class)
    ->middleware(['web', 'auth'])
    ->prefix('artisan')
    ->group(function () {
        Route::post('/', 'run')
            ->name('artisan.run');
    });
