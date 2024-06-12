<?php

namespace App\Http\Controllers;

use App\Services\SitemapService;

class SitemapController extends Controller
{
    protected $sitemapService;

    public function __construct(SitemapService $sitemapService)
    {
        $this->sitemapService = $sitemapService;
    }

    public function generate()
    {
        if ($this->sitemapService->generateSitemap()) {
            return response()->json(['message' => 'Sitemap generated successfully']);
        } else {
            return response()->json(['message' => 'Failed to generate sitemap'], 500);
        }
    }
}

