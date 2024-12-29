<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Pages\AdminController;

Route::get('/', [AdminController::class, 'render'])
    ->name('admin');
