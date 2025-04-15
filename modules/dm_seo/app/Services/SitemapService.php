<?php

namespace App\Services;

use Illuminate\Support\Facades\Artisan;

class SitemapService
{
    /**
     * Generate the sitemap.
     */
    public function generateSitemap(): bool
    {
        return Artisan::call('sitemap:generate');
    }
}
