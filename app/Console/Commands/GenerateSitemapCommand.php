<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;

class GenerateSitemapCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Automatically Generate an XML Sitemap';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): bool
    {
        $sitemap = Sitemap::create();

        $routes = Route::getRoutes();

        foreach ($routes as $route) {
            $uri = $route->uri();
            if ($this->isValidUri($uri)) {
                if ($uri !== '/') {
                    $uri = '/' . ltrim($uri, '/');
                }

                $sitemap->add(
                    Url::create('https://data-manager.szymco.de' . $uri)
                        ->setLastModificationDate(Carbon::now())
                );
            }
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully.');
        $this->info('Sitemap path: ' . public_path('sitemap.xml'));

        return true;
    }

    /**
     * Determine if the URI is valid for the sitemap.
     *
     * @param string $uri
     * @return bool
     */
    private function isValidUri(string $uri): bool
    {
        $excludedPatterns = [
            'admin/*',
            'api/*',
            'sanctum/*',
            'telescope/*',
            '_ignition/*',
            'generate-sitemap'
        ];

        foreach ($excludedPatterns as $pattern) {
            if (fnmatch($pattern, $uri)) {
                return false;
            }
        }

        return true;
    }
}
