<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Entities\ActivityController;
use App\Http\Controllers\Entities\ArticleController;
use App\Http\Controllers\Entities\ContactController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServicesController;
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
 *  About
 */
Route::get('/about', [AboutController::class, 'render'])->name('about');

/**
<<<<<<< HEAD
 *  Services
 */
Route::get('/services', [ServicesController::class, 'render'])->name('services');

=======
 *  Blog
 */
Route::get('/blog', [BlogController::class, 'render'])->name('blog');
>>>>>>> 3e07851b5cda7a0cc3c0a5915e283a33a06fbc40
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
