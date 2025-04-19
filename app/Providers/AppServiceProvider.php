<?php

namespace App\Providers;

use App\Services\LoggerService;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    private const SERVICES_PATH = __DIR__ . '/../Services/';

    private const SERVICES_NAMESPACE = 'App\\Services\\';

    public function register(): void
    {
        $this->registerServices();
        $this->registerActivityLogger();
        $this->mergeConfigFrom(base_path('config/modules.php'), 'modules');
        $this->app->register(ModulesProvider::class);
    }

    public function boot(): void
    {
        $this->forceHttpsInProduction();
    }

    private function registerServices(): void
    {
        $this->scanDirectory(self::SERVICES_PATH, function (string $file): void {
            if ($this->isPhpFile($file)) {
                $serviceClass = $this->getClassName($file);
                $this->app->singleton(
                    self::SERVICES_NAMESPACE . $serviceClass,
                    self::SERVICES_NAMESPACE . $serviceClass
                );
            }
        });
    }

    private function registerActivityLogger(): void
    {
        $this->app->singleton('activityLoggerService', fn (): LoggerService => new LoggerService);
    }

    private function forceHttpsInProduction(): void
    {
        if (!$this->app->environment('local')) {
            URL::forceScheme('https');
        }
    }

    private function scanDirectory(string $path, callable $callback): void
    {
        if (!File::exists($path)) {
            return;
        }

        $dirHandle = opendir($path);
        while (($file = readdir($dirHandle)) !== false) {
            $callback($file);
        }
        closedir($dirHandle);
    }

    private function isPhpFile(string $file): bool
    {
        return is_file(self::SERVICES_PATH . $file) && pathinfo($file, PATHINFO_EXTENSION) === 'php';
    }

    private function getClassName(string $file): string
    {
        return str_replace('.php', '', $file);
    }
}
