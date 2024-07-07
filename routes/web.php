<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Entities\ActivityController;
use App\Http\Controllers\Entities\ArticleController;
use App\Http\Controllers\Entities\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\Auth\LogoutController;


Route::get('/', function () {
    return redirect('/welcome');
});
Route::get('/welcome', function () {
    return view('welcome');
});

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
