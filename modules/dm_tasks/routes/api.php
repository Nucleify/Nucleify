<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    Route::middleware(['web', 'auth'])->group(function (): void {

        /**
         *  Tasks
         */
        Route::prefix('tasks')->controller(TaskController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('tasks.index');

            Route::get('/render', 'render')
                ->name('tasks.render');

            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('tasks.countByCreatedLastWeek');

            Route::get('/{id}', 'show')
                ->name('tasks.show');

            Route::post('/', 'store')
                ->name('tasks.store');

            Route::put('/{id}', 'update')
                ->name('tasks.update');

            Route::delete('/{id}', 'destroy')
                ->name('tasks.destroy');
        });
    });
});
