<?php

use App\Http\Controllers\Auth\LogoutController;
use Illuminate\Support\Facades\Route;

/**
 *  Modules includes
 */
require base_path('modules/nuc_auth/routes/web.php');

/**
 *  Logout
 */
Route::get('/logout', [LogoutController::class, 'logout'])
    ->middleware(['web', 'auth'])
    ->name('logout');

/**
 *  Serve Nuxt fonts
 */
Route::get('/_fonts/{path}', function ($path) {
    $extension = pathinfo($path, PATHINFO_EXTENSION);
    $mimeType = match ($extension) {
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'eot' => 'application/vnd.ms-fontobject',
        default => 'application/octet-stream'
    };

    return serveNuxtFile(base_path('public/build/_fonts/' . $path), $mimeType);
})->where('path', '.*');

/**
 *  Serve module content files (MDX, etc.)
 */
Route::get('/modules/{module}/content/{category}/{file}', function ($module, $category, $file) {
    $path = base_path("modules/{$module}/content/{$category}/{$file}");

    if (!file_exists($path)) {
        return response()->json(['error' => 'File not found'], 404);
    }

    $extension = pathinfo($file, PATHINFO_EXTENSION);
    $mimeType = match ($extension) {
        'mdx', 'md' => 'text/plain',
        'json' => 'application/json',
        default => 'text/plain'
    };

    return response()->file($path, [
        'Content-Type' => $mimeType,
        'Access-Control-Allow-Origin' => '*',
    ]);
})->where('module', '[a-z_]+')->where('category', '[a-z-]+')->where('file', '.+');
