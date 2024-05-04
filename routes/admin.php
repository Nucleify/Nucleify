<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AdminController;

Route::get('/', [AdminController::class, 'render'])
    ->name('admin');
