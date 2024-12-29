<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Entities\ActivityController;
use App\Http\Controllers\Entities\ArticleController;
use App\Http\Controllers\Entities\ContactController;
use App\Http\Controllers\Entities\MoneyController;
use App\Http\Controllers\Pages\AboutController;
use App\Http\Controllers\Pages\BlogController;
use App\Http\Controllers\Pages\DashboardController;
use App\Http\Controllers\Pages\HomeController;
use App\Http\Controllers\Pages\ServicesController;
use App\Http\Controllers\Pages\SettingsController;

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
     *  Money
     */
    Route::get('/money', [MoneyController::class, 'render'])->name('money');

    /**
     *  Settings
     */
    Route::get('/settings', [SettingsController::class, 'render'])->name('settings');

    /**
     *  Logout
     */
    Route::get('/logout', [LogoutController::class, 'logout'])->name('logout');
});
