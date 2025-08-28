<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\ZipController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('api')->group(function (): void {
    Route::prefix('files')->group(function (): void {
        Route::controller(ZipController::class)->group(function (): void {
            Route::post('/unzip', 'unzip')
                ->name('files.unzip');
        });

        Route::controller(UploadController::class)->group(function (): void {
            Route::post('/upload', 'upload')
                ->name('files.upload');
        });

        Route::controller(FileController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('files.index');
            Route::get('/{id}', 'show')
                ->name('files.show');
            Route::put('/{id}', 'edit')
                ->name('files.edit');
            Route::delete('/{id}', 'destroy')
                ->name('files.destroy');
        });
    });
});
