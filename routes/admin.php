<?php

use App\Http\Controllers\Pages\AdminController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AdminController::class, 'render'])
    ->name('admin');
