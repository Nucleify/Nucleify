<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

use App\Services\ActivityLoggerService;
use App\Services\SitemapService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $serviceNamespace = 'App\\Services\\';
        $servicePath = __DIR__.'/../Services/';
        $dirHandle = opendir($servicePath);

        while (($file = readdir($dirHandle)) !== false) {
            if (is_file($servicePath . $file) && pathinfo($file, PATHINFO_EXTENSION) === 'php') {
                $serviceClass = str_replace('.php', '', $file);
                $this->app->singleton($serviceNamespace . $serviceClass, $serviceNamespace . $serviceClass);
            }
        }

        closedir($dirHandle);

        $this->app->singleton('activityLoggerService', function () {
            return new ActivityLoggerService();
        });
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
