<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Pages\AboutController;
use App\Http\Controllers\Pages\DashboardController;
use App\Http\Controllers\Pages\HomeController;
use App\Http\Controllers\Pages\LicenseController;
use App\Http\Controllers\Pages\SettingsController;
use App\Http\Controllers\Utilities\ActivityController;

/**
 *  Home
 */
Route::get('/', function () {
    return redirect('/home');
});
Route::get('/home', [HomeController::class, 'render'])->name('home');

/**
 *  About
 */
//Route::get('/about', [AboutController::class, 'render'])->name('about');


/**
 *  Blog
 */
//Route::get('/blog', [BlogController::class, 'render'])->name('blog');

/**
 *  License
 */
Route::get('/license', [LicenseController::class, 'render'])->name('license');

/**
 *  Services
 */
//Route::get('/services', [ServicesController::class, 'render'])->name('services');

/**
 *  Auth routes
 */
Auth::routes();

Route::middleware(['web', 'auth'])->group(function () {
    /**
     *  Activity log
     */
    Route::get('/activity-log', [ActivityController::class, 'render'])->name('activity-log');

    /**
     *  Dashboard
     */
    Route::get('/dashboard', [DashboardController::class, 'render'])->name('dashboard');

    /**
     *  Settings
     */
    Route::get('/settings', [SettingsController::class, 'render'])->name('settings');

    /**
     *  Logout
     */
    Route::get('/logout', [LogoutController::class, 'logout'])->name('logout');
});

/**
 *  Modules includes
 */
require base_path('modules/dm_entities/routes/web.php');
require base_path('modules/dm_entities_structural/routes/web.php');
