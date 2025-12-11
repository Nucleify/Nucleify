<?php

use App\Http\Controllers\FriendController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    Route::middleware(['web', 'auth'])->group(function (): void {

        /**
         *  Friendship
         */
        Route::prefix('friendship')->controller(FriendController::class)->group(function (): void {
            Route::get('/all', 'index')
                ->name('friendship.index');

            Route::post('/send-request/{recipient}', 'sendRequest')
                ->name('friendship.sendRequest');

            Route::post('/accept-request/{sender}', 'acceptRequest')
                ->name('friendship.acceptRequest');

            Route::post('/deny-request/{sender}', 'denyRequest')
                ->name('friendship.denyRequest');

            Route::delete('/remove/{friend}', 'removeFriend')
                ->name('friendship.remove');

            Route::post('/block/{friend}', 'blockFriend')
                ->name('friendship.block');

            Route::delete('/unblock/{friend}', 'unblockFriend')
                ->name('friendship.unblock');
        });
    });
});
