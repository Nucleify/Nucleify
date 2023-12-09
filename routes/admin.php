<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AdminController;

Route::get('/', [AdminController::class, 'index'])
    ->name('admin');
