<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

Route::get('/{module}/{file}', function ($module, $file) {
    $path = base_path("modules/$module/$file");

    if (!File::exists($path)) {
        abort(404);
    }

    return response()->file($path);
});
