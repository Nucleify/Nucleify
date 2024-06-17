<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

beforeEach(function () {
    removeSitemap();
});

it('generates the sitemap successfully', function () {
    $this->assertFalse(File::exists(public_path('sitemap.xml')));

    Artisan::call('sitemap:generate');

    $output = Artisan::output();
    $this->assertStringContainsString('Sitemap generated successfully', $output);

    $this->assertTrue(File::exists(public_path('sitemap.xml')));

    $sitemapContent = File::get(public_path('sitemap.xml'));
    expect($sitemapContent)->toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
