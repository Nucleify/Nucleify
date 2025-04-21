<?php

use App\Http\Controllers\ActivityController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::controller(ActivityController::class)
    ->prefix('api/activity-log')
    ->middleware(['web', 'auth'])
    ->group(function (): void {
        Route::get('/', 'index')
            ->name('activity-log.index');
        Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
            ->name('activity-log.countByCreatedLastWeek');
        Route::get('/{id}', 'show')
            ->name('activity-log.show');
        Route::delete('/{id}', 'destroy')
            ->name('activity-log.destroy');
    });
