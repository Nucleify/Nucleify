<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('login', fn () => serveNuxtPage('login'))->name('login');
Route::get('register', fn () => serveNuxtPage('register'))->name('register');
