<?php

use App\Http\Controllers\ArtisanController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('api')->group(function (): void {
    Route::controller(ArtisanController::class)
        ->prefix('artisan')
        ->group(function (): void {
            Route::post('/', 'run')
                ->name('artisan.run');
        });
});
