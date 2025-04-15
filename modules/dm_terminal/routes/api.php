<?php

use App\Http\Controllers\ArtisanController;
use Illuminate\Support\Facades\Route;

Route::controller(ArtisanController::class)
    ->middleware(['web', 'auth'])
    ->prefix('artisan')
    ->group(function () {
        Route::post('/', 'run')
            ->name('artisan.run');
    });
