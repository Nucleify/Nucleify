<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TechnologyController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    Route::get('/features/get-site-features/{site}', [FeatureController::class, 'getSiteFeatures'])
        ->name('features.getSiteFeatures');

    Route::get('/questions/get-site-questions/{site}', [QuestionController::class, 'getSiteQuestions'])
        ->name('questions.getSiteQuestions');

    Route::get('/technologies/get-site-technologies/{site}', [TechnologyController::class, 'getSiteTechnologies'])
        ->name('technologies.getSiteTechnologies');

    Route::get('/links/get-site-links/{site}', [LinkController::class, 'getSiteLinks'])
        ->name('links.getSiteLinks');

    Route::middleware(['web', 'auth'])->group(function (): void {

        /**
         *  Cards
         */
        Route::prefix('cards')->controller(CardController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('cards.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('cards.countByCreatedLastWeek');
            Route::get('/get-by-category/{category}', 'getByCategory')
                ->name('cards.getByCategory');
            Route::get('/{id}', 'show')
                ->name('cards.show');
            Route::post('/', 'store')
                ->name('cards.store');
            Route::put('/{id}', 'update')
                ->name('cards.update');
            Route::delete('/{id}', 'destroy')
                ->name('cards.destroy');
        });

        /**
         *  Features
         */
        Route::prefix('features')->controller(FeatureController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('features.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('features.countByCreatedLastWeek');
            Route::get('/get-by-category/{category}', 'getByCategory')
                ->name('features.getByCategory');
            Route::get('/{id}', 'show')
                ->name('features.show');
            Route::post('/', 'store')
                ->name('features.store');
            Route::put('/{id}', 'update')
                ->name('features.update');
            Route::delete('/{id}', 'destroy')
                ->name('features.destroy');
        });

        /**
         *  Links
         */
        Route::prefix('links')->controller(LinkController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('links.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('links.countByCreatedLastWeek');
            Route::get('/get-by-category/{category}', 'getByCategory')
                ->name('links.getByCategory');
            Route::get('/{id}', 'show')
                ->name('links.show');
            Route::post('/', 'store')
                ->name('links.store');
            Route::put('/{id}', 'update')
                ->name('links.update');
            Route::delete('/{id}', 'destroy')
                ->name('links.destroy');
        });

        /**
         *  Questions
         */
        Route::prefix('questions')->controller(QuestionController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('questions.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('questions.countByCreatedLastWeek');
            Route::get('/get-by-category/{category}', 'getByCategory')
                ->name('questions.getByCategory');
            Route::get('/{id}', 'show')
                ->name('questions.show');
            Route::post('/', 'store')
                ->name('questions.store');
            Route::put('/{id}', 'update')
                ->name('questions.update');
            Route::delete('/{id}', 'destroy')
                ->name('questions.destroy');
        });

        /**
         *  Technologies
         */
        Route::prefix('technologies')->controller(TechnologyController::class)->group(function (): void {
            Route::get('/', 'index')
                ->name('technologies.index');
            Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
                ->name('technologies.countByCreatedLastWeek');
            Route::get('/get-by-category/{category}', 'getByCategory')
                ->name('technologies.getByCategory');
            Route::get('/{id}', 'show')
                ->name('technologies.show');
            Route::post('/', 'store')
                ->name('technologies.store');
            Route::put('/{id}', 'update')
                ->name('technologies.update');
            Route::delete('/{id}', 'destroy')
                ->name('technologies.destroy');
        });
    });
});
