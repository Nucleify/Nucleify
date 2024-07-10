<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Entities\ActivityController;
use App\Http\Controllers\Entities\ArticleController;
use App\Http\Controllers\Entities\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\Auth\LogoutController;

/**
 *  Home
 */
Route::get('/', function () {
    return redirect('/home');
});
Route::get('/home', [HomeController::class, 'render'])->name('home');

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
     *  Articles
     */
    Route::get('/articles', [ArticleController::class, 'render'])->name('articles');

    /**
     *  Contacts
     */
    Route::get('/contacts', [ContactController::class, 'render'])->name('contacts');

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
