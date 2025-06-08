<?php

use App\Http\Controllers\UserColorController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    Route::middleware(['web', 'auth'])->group(function (): void {
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
