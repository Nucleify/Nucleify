<?php

use App\Http\Controllers\ShareController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    Route::middleware(['web', 'auth'])->group(function (): void {
        Route::controller(ShareController::class)->prefix('share')->name('share.')->group(function (): void {
            Route::post('/', 'create')->name('create');
            Route::get('/received', 'received')->name('received');
            Route::get('/sent', 'sent')->name('sent');
            Route::get('/count', 'count')->name('count');
            Route::post('/{id}/accept', 'accept')->name('accept');
            Route::post('/{id}/reject', 'reject')->name('reject');
            Route::post('/{id}/cancel', 'cancel')->name('cancel');
        });
    });
});
