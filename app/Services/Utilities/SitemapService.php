<?php

namespace App\Services\Utilities;

use Illuminate\Support\Facades\Artisan;

class SitemapService
{
    /**
     * Generate the sitemap.
     *
     * @return bool
     */
    public function generateSitemap(): bool
    {
        return Artisan::call('sitemap:generate');
    }
}
