<?php

use App\Http\Controllers\UploadController;
use App\Http\Controllers\ZipController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('api')->group(function (): void {
    Route::prefix('files')->group(function (): void {
        Route::controller(ZipController::class)->group(function (): void {
            Route::post('/zip', 'extract')
                ->name('files.zip');
        });

        Route::controller(UploadController::class)->group(function (): void {
            Route::post('/upload', 'upload')
                ->name('files.upload');
        });
    });
});
