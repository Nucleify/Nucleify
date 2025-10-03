<?php

use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ModuleInstallerController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('api')->group(function (): void {
    Route::prefix('modules')->group(function (): void {
        Route::controller(ModuleInstallerController::class)->group(function (): void {
            Route::post('/install', 'install')
                ->name('modules.install');
            Route::post('/uninstall', 'uninstall')
                ->name('modules.uninstall');
        });

        Route::controller(ModuleController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('modules.index');
            Route::get('/all', 'getAllModules')
                ->name('modules.getAllModules');
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
