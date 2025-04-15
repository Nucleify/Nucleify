<?php

use App\Http\Controllers\SitemapController;
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
Route::controller(SitemapController::class)
    ->middleware(['web', 'auth'])
    ->prefix('sitemap')
    ->group(function () {
        Route::get('/generate', 'generate')
            ->name('sitemap.generate');
    });
