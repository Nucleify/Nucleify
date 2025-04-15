<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\SitemapController;
use App\Services\SitemapService;
use Illuminate\Support\Facades\File;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(SitemapController::class, ['service' => app()->make(SitemapService::class)]);

    removeSitemap();
});

it('generates a valid sitemap', function (): void {
    $response = $this->controller->generate();

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));

    expect($response->getData(true)['message'])->toBe('Sitemap generated successfully');

    $this->assertTrue(File::exists(public_path('sitemap.xml')));

    $sitemapContent = File::get(public_path('sitemap.xml'));
    expect($sitemapContent)->toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
});
