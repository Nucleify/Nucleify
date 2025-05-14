<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Auth::routes(['logout' => false]);

Route::middleware('web')->group(function () {
    Route::get('login', fn () => serveNuxtPage('login'))->name('login');
    Route::get('register', fn () => serveNuxtPage('register'))->name('register');
});
