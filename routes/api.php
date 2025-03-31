<?php

use App\Http\Controllers\Utilities\ActivityController;
use App\Http\Controllers\Utilities\ArtisanController;
use App\Http\Controllers\Utilities\SitemapController;
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

Route::middleware(['web', 'auth'])->group(function () {
    /**
     *  Activity log
     */
    Route::prefix('activity-log')->controller(ActivityController::class)->group(function () {
        Route::get('/', 'index')
            ->name('activity-log.index');
        Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
            ->name('activity-log.countByCreatedLastWeek');
        Route::get('/{id}', 'show')
            ->name('activity-log.show');
        Route::delete('/{id}', 'destroy')
            ->name('activity-log.destroy');
    });


    /**
     *  Sitemap
     */
    Route::prefix('sitemap')->controller(SitemapController::class)->group(function () {
        Route::get('/generate', 'generate')
            ->name('sitemap.generate');
    });

    /**
     *  Tinker Command
     */
    Route::prefix('artisan')->controller(ArtisanController::class)->group(function () {
        Route::post('/', 'run')
            ->name('artisan.run');
    });
});

/**
 *  Modules includes
 */
require base_path('modules/dm_entities/routes/api.php');
require base_path('modules/dm_entities_structural/routes/api.php');
