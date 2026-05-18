<?php

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TechnologyController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    Route::prefix('questions')->controller(QuestionController::class)->group(function (): void {
        Route::get('/get-site-questions/{site}', 'getSiteQuestions')
            ->name('questions.getSiteQuestions');

        Route::get('/get-site-questions/{site}/{lang}', 'getSiteQuestionsByLang')
            ->name('questions.getSiteQuestionsByLang');
    });

    Route::get('/technologies/get-site-technologies/{site}', [TechnologyController::class, 'getSiteTechnologies'])
        ->name('technologies.getSiteTechnologies');

    Route::middleware(['web', 'auth'])->group(function (): void {
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
