<?php

use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Auth;
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

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/user', function () {
        return Auth::user();
    });

    Route::prefix('users')->controller(UserController::class)->group(function () {
        Route::get('/', 'index')
            ->name('users.index');
        Route::get('/{id}', 'show')
            ->name('users.show');
        Route::post('/', 'store')
            ->name('users.store');
        Route::put('/{id}', 'update')
            ->name('users.update');
        Route::delete('/{id}', 'destroy')
            ->name('users.destroy');
    });

    Route::prefix('contacts')->controller(ContactController::class)->group(function () {
        Route::get('/', 'index')
            ->name('contacts.index');
        Route::get('/{id}', 'show')
            ->name('contacts.show');
        Route::post('/', 'store')
            ->name('contacts.store');
        Route::put('/{id}', 'update')
            ->name('contacts.update');
        Route::delete('/{id}', 'destroy')
            ->name('contacts.destroy');
    });
});
