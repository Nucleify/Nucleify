<?php

use App\Http\Controllers\PageBuilderPageController;
use App\Http\Controllers\PageBuilderRenderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web'])->prefix('api')->group(function (): void {
    Route::prefix('page-builder')->group(function (): void {
        Route::get('/render/{slug}', [PageBuilderRenderController::class, 'render'])
            ->name('pageBuilder.render');
        Route::get('/prerender-routes', [PageBuilderRenderController::class, 'prerenderRoutes'])
            ->name('pageBuilder.prerenderRoutes');

        Route::middleware(['auth'])->group(function (): void {
            Route::controller(PageBuilderPageController::class)->group(function (): void {
                Route::get('/pages', 'index')
                    ->name('pageBuilder.pages.index');
                Route::get('/pages/{id}', 'show')
                    ->name('pageBuilder.pages.show');
                Route::post('/pages', 'store')
                    ->name('pageBuilder.pages.store');
                Route::put('/pages/{id}', 'update')
                    ->name('pageBuilder.pages.update');
                Route::delete('/pages/{id}', 'destroy')
                    ->name('pageBuilder.pages.destroy');
                Route::post('/pages/{id}/draft', 'saveDraft')
                    ->name('pageBuilder.pages.saveDraft');
                Route::post('/pages/{id}/publish', 'publish')
                    ->name('pageBuilder.pages.publish');
                Route::get('/pages/{id}/versions', 'versions')
                    ->name('pageBuilder.pages.versions');
                Route::post('/pages/{id}/versions/{version}/restore', 'restore')
                    ->name('pageBuilder.pages.restore');

                Route::get('/preferences', 'getPreferences')
                    ->name('pageBuilder.preferences.get');
                Route::put('/preferences', 'updatePreferences')
                    ->name('pageBuilder.preferences.update');
            });
        });
    });
});
