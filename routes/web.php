<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\HomeController;
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
    return view('welcome');
});

Auth::routes();


Route::middleware(['web', 'auth'])->group(function () {
    /**
     *  Home
     */
    Route::get('/home', [HomeController::class, 'render'])->name('home');

    /**
     *  Activity log
     */
    Route::get('/activity-log', [ActivityLogController::class, 'render'])->name('activity-log');
});
