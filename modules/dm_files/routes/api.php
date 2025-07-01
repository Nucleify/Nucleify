<?php

use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('api')->group(function (): void {
    Route::prefix('file')->controller(UploadController::class)->group(function (): void {
        Route::post('/upload', 'upload')
            ->name('file.upload');
    });
});
