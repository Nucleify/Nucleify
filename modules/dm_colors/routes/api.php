<?php

use App\Http\Controllers\SystemColorController;
use App\Http\Controllers\UserColorController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->middleware('web')->group(function (): void {
    /**
     *  Colors
     */
    Route::prefix('system-colors')->controller(SystemColorController::class)->group(function (): void {
        Route::get('/', 'index')
            ->name('system-colors.index');
        Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
            ->name('system-colors.countByCreatedLastWeek');
        Route::get('/get-by-name/{name}', 'getByName')
            ->name('system-colors.getByName');
        Route::get('/{id}', 'show')
            ->name('system-colors.show');
        Route::post('/', 'store')
            ->name('system-colors.store');
        Route::put('/{id}', 'update')
            ->name('system-colors.update');
        Route::delete('/{id}', 'destroy')
            ->name('system-colors.destroy');
    });

    Route::middleware('auth')->group(function (): void {
        /**
         *  User Colors
         */
        Route::prefix('user-colors')->controller(UserColorController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('user-colors.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('user-colors.countByCreatedLastWeek');
            Route::get('/get-by-name/{name}', 'getByName')
                ->name('user-colors.getByName');
            Route::get('/{id}', 'show')
                ->name('user-colors.show');
            Route::post('/', 'store')
                ->name('user-colors.store');
            Route::put('/{id}', 'update')
                ->name('user-colors.update');
            Route::delete('/{id}', 'destroy')
                ->name('user-colors.destroy');
        });
    });
});
