<?php

use App\Http\Controllers\Entities\ArticleController;
use App\Http\Controllers\Entities\ContactController;
use App\Http\Controllers\Entities\MoneyController;
use App\Http\Controllers\Entities\UserController;
use App\Http\Controllers\Structural\LinkController;
use App\Http\Controllers\Structural\QuestionController;
use App\Http\Controllers\Structural\TechnologyController;
use App\Http\Controllers\Utilities\ActivityController;
use App\Http\Controllers\Utilities\ArtisanController;
use App\Http\Controllers\Utilities\SitemapController;
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

Route::get('/questions/get-site-questions/{site}', [QuestionController::class, 'getSiteQuestions'])
    ->name('questions.getSiteQuestions');

Route::get('/technologies/get-site-technologies/{site}', [TechnologyController::class, 'getSiteTechnologies'])
    ->name('technologies.getSiteTechnologies');

Route::get('/links/get-site-links/{site}', [LinkController::class, 'getSiteLinks'])
    ->name('links.getSiteLinks');

Route::middleware(['web', 'auth'])->group(function () {
    /**
     *  Activity log
     */
    Route::prefix('activity-log')->controller(ActivityController::class)->group(function () {
        Route::get('/', 'index')
            ->name('activity-log.index');
        Route::get('/count-by-created-last-week', 'countByCreatedLastWeek')
            ->name('activity-log.countByCreatedLastWeek');
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
    Route::prefix('contacts')->controller(ContactController::class)->group(function () {
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
    Route::prefix('money')->controller(MoneyController::class)->group(function () {
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
    Route::prefix('users')->controller(UserController::class)->group(function () {
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

    /**
     *  Questions
     */
    Route::prefix('questions')->controller(QuestionController::class)->group(function () {
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
    Route::prefix('technologies')->controller(TechnologyController::class)->group(function () {
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


    Route::prefix('links')->controller(LinkController::class)->group(function () {
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

    Route::get('/user', function () {
        return auth()->user();
    });

    /**
     *  Sitemap
     */
    Route::prefix('sitemap')->controller(SitemapController::class)->group(function () {
        Route::get('/generate', 'generate')
            ->name('sitemap.generate');
    });

    /**
     *  Tinker Command
     */
    Route::prefix('artisan')->controller(ArtisanController::class)->group(function () {
        Route::post('/', 'run')
            ->name('artisan.run');
    });
});
