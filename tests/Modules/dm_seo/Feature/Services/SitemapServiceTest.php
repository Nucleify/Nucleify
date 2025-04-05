<?php

use App\Services\SitemapService;

beforeEach(function () {
    removeSitemap();
});

test('it generates a valid sitemap', function () {
    $sitemapService = new SitemapService();

    $sitemapService->generateSitemap();

    $this->assertTrue(File::exists(public_path('sitemap.xml')));

    $sitemapContent = File::get(public_path('sitemap.xml'));
    expect($sitemapContent)->toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
});
