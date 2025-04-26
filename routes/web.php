<?php

use App\Http\Controllers\Auth\LogoutController;
use Illuminate\Support\Facades\Route;

/**
 *  Modules includes
 */
// require base_path('modules/dm_activity/routes/web.php');
// require base_path('modules/dm_auth/routes/web.php');
// require base_path('modules/dm_entities/routes/web.php');
// require base_path('modules/dm_entities_structural/routes/web.php');
// require base_path('modules/dm_pages/routes/web.php');

/**
 *  Logout
 */
// Route::get('/logout', [LogoutController::class, 'logout'])
//     ->middleware(['web', 'auth'])
//     ->name('logout');

/**
 *  Serve Nuxt payload
 */
Route::get('/_payload.json', function () {
    $filePath = base_path('public/build/_payload.json');
    if (!file_exists($filePath)) {
        return response()->json(['error' => 'Payload not found'], 404);
    }
    $content = file_get_contents($filePath);

    return response($content, 200, [
        'Content-Type' => 'application/json',
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
        'Cache-Control' => 'no-cache, no-store, must-revalidate',
        'Pragma' => 'no-cache',
        'Expires' => '0',
    ]);
});

/**
 *  Serve Nuxt static assets
 */
Route::get('/_nuxt/{path}', function ($path) {
    $filePath = base_path('public/build/_nuxt/' . $path);
    if (!file_exists($filePath)) {
        return response()->json(['error' => 'Asset not found'], 404);
    }

    $mimeTypes = [
        'css' => 'text/css',
        'js' => 'application/javascript',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'eot' => 'application/vnd.ms-fontobject',
        'svg' => 'image/svg+xml',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'ico' => 'image/x-icon',
    ];

    $extension = pathinfo($path, PATHINFO_EXTENSION);
    $mimeType = $mimeTypes[$extension] ?? 'application/octet-stream';

    return response()->file($filePath, [
        'Content-Type' => $mimeType,
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
        'Cache-Control' => 'public, max-age=31536000',
        'X-Content-Type-Options' => 'nosniff',
    ]);
})->where('path', '.*');

/**
 *  Serve Nuxt fonts
 */
Route::get('/_fonts/{path}', function ($path) {
    $filePath = base_path('public/build/_fonts/' . $path);
    if (!file_exists($filePath)) {
        return response()->json(['error' => 'Font not found'], 404);
    }

    $extension = pathinfo($path, PATHINFO_EXTENSION);
    $mimeType = match ($extension) {
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'eot' => 'application/vnd.ms-fontobject',
        default => 'application/octet-stream'
    };

    return response()->file($filePath, [
        'Content-Type' => $mimeType,
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
        'Cache-Control' => 'public, max-age=31536000',
        'X-Content-Type-Options' => 'nosniff',
    ]);
})->where('path', '.*');

/**
 *  Serve Nuxt application for all other routes
 */
Route::get('/{any}', function () {
    $path = base_path('public/build/index.html');
    if (!file_exists($path)) {
        return response()->json(['error' => 'Nuxt application not built yet'], 404);
    }

    return response()->file($path, [
        'Content-Type' => 'text/html',
        'Cache-Control' => 'no-cache, no-store, must-revalidate',
        'Pragma' => 'no-cache',
        'Expires' => '0',
    ]);
})->where('any', '.*');
