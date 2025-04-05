<?php

use App\Http\Controllers\ActivityController;

Route::get('/activity-log', [ActivityController::class, 'render'])
    ->middleware(['web', 'auth'])
    ->name('activity-log');
