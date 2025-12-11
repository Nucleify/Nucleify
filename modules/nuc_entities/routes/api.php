<?php

namespace Routes;

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MoneyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web'])->prefix('api')->group(function (): void {
    Route::get('/user', function () {
        return auth()->user() ?? 'Unauthenticated';
    });

    Route::middleware(['auth'])->group(function (): void {
        /**
         *  Articles
         */
        Route::prefix('articles')->controller(ArticleController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('articles.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('articles.countByCreatedLastWeek');
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
        Route::prefix('contacts')->controller(ContactController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('contacts.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('contacts.countByCreatedLastWeek');
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
         *  Money
         */
        Route::prefix('money')->controller(MoneyController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('money.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('money.countByCreatedLastWeek');
            Route::get('/{id}', 'show')
                ->name('money.show');
            Route::post('/', 'store')
                ->name('money.store');
            Route::put('/{id}', 'update')
                ->name('money.update');
            Route::delete('/{id}', 'destroy')
                ->name('money.destroy');
        });

        /**
         *  Users
         */
        Route::prefix('users')->controller(UserController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('users.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('users.countByCreatedLastWeek');
            Route::get('/{id}', 'show')
                ->name('users.show');
            Route::post('/', 'store')
                ->name('users.store');
            Route::put('/{id}', 'update')
                ->name('users.update');
            Route::delete('/{id}', 'destroy')
                ->name('users.destroy');
        });
    });
});
