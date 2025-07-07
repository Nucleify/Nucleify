<?php

use App\Http\Controllers\ZipController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('api')->group(function (): void {
    Route::prefix('file')->controller(ZipController::class)->group(function (): void {
        Route::post('/upload', 'extract')
            ->name('file.upload');
    });
});
