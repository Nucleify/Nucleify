<?php

namespace App\Http\Controllers;

use App\Services\SitemapService;
use Illuminate\Http\JsonResponse;

class SitemapController extends Controller
{
    protected SitemapService $sitemapService;

    public function __construct(SitemapService $sitemapService)
    {
        $this->sitemapService = $sitemapService;
    }

    public function generate(): JsonResponse
    {
        if ($this->sitemapService->generateSitemap()) {
            return response()->json(['message' => 'Sitemap generated successfully']);
        } else {
            return response()->json(['message' => 'Failed to generate sitemap'], 500);
        }
    }
}
