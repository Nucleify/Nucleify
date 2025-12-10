<?php

use App\Http\Controllers\DocumentationController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    Route::middleware(['web', 'auth'])->group(function (): void {

        /**
         *  Documentation
         */
        Route::prefix('documentation')->controller(DocumentationController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('documentation.index');

            Route::get('/render', 'render')
                ->name('documentation.render');

            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('documentation.countByCreatedLastWeek');

            Route::get('/{id}', 'show')
                ->name('documentation.show');

            Route::post('/', 'store')
                ->name('documentation.store');

            Route::put('/{id}', 'update')
                ->name('documentation.update');

            Route::delete('/{id}', 'destroy')
                ->name('documentation.destroy');
        });
    });
});
