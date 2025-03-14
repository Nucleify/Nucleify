<?php

use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Entities\EntitiesController;
use App\Http\Controllers\Pages\DashboardController;
use App\Http\Controllers\Pages\HomeController;
use App\Http\Controllers\Pages\SettingsController;
use App\Http\Controllers\Structural\StructuralController;
use App\Http\Controllers\Utilities\ActivityController;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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
 *  Services
 */
//Route::get('/services', [ServicesController::class, 'render'])->name('services');

/**
 *  Auth routes
 */
Auth::routes();

Route::middleware(['web', 'auth'])->group(function () {

    /**
     *  Entities routes
     */
    $entities = [
        'index',
        'articles',
        'contacts',
        'money',
    ];

    foreach ($entities as $route) {
        $endpoint = ($route !== 'index') ? $route : '';

        Route::get("/entities/$endpoint", [EntitiesController::class, 'renderEntity'])
            ->name($route)
            ->defaults('entity', $route);
    }

    /**
     *  Structural routes
     */
    $structural = [
        'index',
        'questions',
        'technologies',
        'links'
    ];

    foreach ($structural as $route) {
        $endpoint = ($route !== 'index') ? $route : '';

        Route::get("/structural/$endpoint", [StructuralController::class, 'renderStructural'])
            ->name($route)
            ->defaults('structural', $route);
    }

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
