<?php

use App\Http\Controllers\ModuleController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    Route::middleware(['web', 'auth'])->group(function (): void {

        /**
         *  Modules
         */
        Route::prefix('modules')->controller(ModuleController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('modules.index');
            Route::get('/{id}', 'show')
                ->name('modules.show');
            Route::post('/', 'store')
                ->name('modules.store');
            Route::put('/{id}', 'update')
                ->name('modules.update');
            Route::delete('/{id}', 'destroy')
                ->name('modules.destroy');
        });
    });
});
