<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

Route::get('/{module}/{file}', function ($module, $file) {
    $path = base_path("modules/$module/$file");

    if (!File::exists($path)) {
        abort(404);
    }

    return response()->file($path);
});
