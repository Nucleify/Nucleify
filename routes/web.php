<?php

use App\Http\Controllers\Auth\LogoutController;
use Illuminate\Support\Facades\Route;

/**
 *  Modules includes
 */
require base_path('modules/dm_activity/routes/web.php');
require base_path('modules/dm_auth/routes/web.php');
require base_path('modules/dm_entities/routes/web.php');
require base_path('modules/dm_entities_structural/routes/web.php');
require base_path('modules/dm_pages/routes/web.php');

/**
 *  Logout
 */
Route::get('/logout', [LogoutController::class, 'logout'])
    ->middleware(['web', 'auth'])
    ->name('logout');
