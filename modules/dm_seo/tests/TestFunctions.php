<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Support\Facades\File;

function removeSitemap(): void
{
    if (File::exists(public_path('sitemap.xml'))) {
        File::delete(public_path('sitemap.xml'));
    }
}
