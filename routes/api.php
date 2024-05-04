<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Entities\ActivityController;
use App\Http\Controllers\Entities\ArticleController;
use App\Http\Controllers\Entities\ContactController;
use App\Http\Controllers\Entities\UserController;

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
    /**
     *  Activity log
     */
    Route::prefix('activity-log')->controller(ActivityController::class)->group(function () {
        Route::get('/', 'index')
            ->name('activity-log.index');
        Route::get('/{id}', 'show')
            ->name('activity-log.show');
        Route::delete('/{id}', 'destroy')
            ->name('activity-log.destroy');
    });

    /**
     *  Articles
     */
    Route::prefix('articles')->controller(ArticleController::class)->group(function () {
        Route::get('/', 'index')
            ->name('articles.index');
        Route::get('/{id}', 'show')
            ->name('articles.show');
        Route::post('/', 'store')
            ->name('articles.store');
        Route::put('/{id}', 'update')
            ->name('articles.update');
        Route::delete('/{id}', 'destroy')
            ->name('articles.destroy');
    });

    /**
     *  Contacts
     */
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

    /**
     *  Users
     */
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

    Route::get('/user', function () {
        return auth()->user();
    });
});
