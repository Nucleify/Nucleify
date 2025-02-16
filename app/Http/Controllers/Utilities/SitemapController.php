<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use App\Services\Utilities\SitemapService;
use Illuminate\Http\JsonResponse;

class SitemapController extends Controller
{
    protected SitemapService $sitemapService;

    /**
     * @param SitemapService $sitemapService
     */
    public function __construct(SitemapService $sitemapService)
    {
        $this->sitemapService = $sitemapService;
    }

    /**
     * @return JsonResponse
     */
    public function generate(): JsonResponse
    {
        if ($this->sitemapService->generateSitemap()) {
            return response()->json(['message' => 'Sitemap generated successfully']);
        } else {
            return response()->json(['message' => 'Failed to generate sitemap'], 500);
        }
    }
}

