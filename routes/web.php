<?php

use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Entities\ArticleController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Entities\ActivityController;
use App\Http\Controllers\Entities\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SettingsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

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
     *  Home
     */
    Route::get('/home', [HomeController::class, 'render'])->name('home');

    /**
     *  Settings
     */
    Route::get('/settings', [SettingsController::class, 'render'])->name('settings');

    /**
     *  Logout
     */
    Route::get('/logout', [LogoutController::class, 'logout'])->name('logout');
});
