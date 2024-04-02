<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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
     *  Home
     */
    Route::get('/home', [HomeController::class, 'render'])->name('home');

    /**
     *  Settings
     */
    Route::get('/settings', [SettingsController::class, 'render'])->name('settings');

    /**
     *  Contacts
     */
    Route::get('/contacts', [ContactController::class, 'render'])->name('contacts');

    /**
     *  Activity log
     */
    Route::get('/activity-log', [ActivityLogController::class, 'render'])->name('activity-log');
});
