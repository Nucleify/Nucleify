<?php

namespace App\Providers;

use App\Services\Utilities\Activity\LoggerService;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

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
            return new LoggerService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (!$this->app->environment('local')) {
            URL::forceScheme('https');
        }

        $modulePath = base_path('modules');

        if (File::exists($modulePath)) {
            foreach (scandir($modulePath) as $module) {
                if ($module !== '.' && $module !== '..') {
                    $moduleAppPath = "$modulePath/$module/app";
                    $moduleDatabasePath = "$modulePath/$module/database";
                    $moduleConfigPath = "$modulePath/$module/config";
                    $moduleRoutesPath = "$modulePath/$module/routes";
                    $moduleTestsPath = "$modulePath/$module/tests";

                    if (File::exists($moduleAppPath)) {
                        foreach (File::allFiles($moduleAppPath) as $file) {
                            require_once $file->getRealPath();
                        }
                    }

                    $this->loadDatabaseFiles($moduleDatabasePath);

                    $this->loadConfigFiles($moduleConfigPath, $module);

                    if (File::exists($moduleRoutesPath)) {
                        foreach (File::allFiles($moduleRoutesPath) as $file) {
                            require_once $file->getRealPath();
                        }
                    }

                    if (File::exists($moduleTestsPath)) {
                        foreach (File::allFiles($moduleTestsPath) as $file) {
                            require_once $file->getRealPath();
                        }
                    }
                }
            }
        }
    }

    /**
     * Load migration, factory, and seeder files from the module's database directory.
     */
    private function loadDatabaseFiles(string $moduleDatabasePath): void
    {
        if (File::exists($moduleDatabasePath . '/migrations')) {
            foreach (File::allFiles($moduleDatabasePath . '/migrations') as $file) {
                require_once $file->getRealPath();
            }
        }

        if (File::exists($moduleDatabasePath . '/factories')) {
            foreach (File::allFiles($moduleDatabasePath . '/factories') as $file) {
                require_once $file->getRealPath();
            }
        }

        if (File::exists($moduleDatabasePath . '/seeders')) {
            foreach (File::allFiles($moduleDatabasePath . '/seeders') as $file) {
                require_once $file->getRealPath();
            }
        }
    }

    /**
     * Load configuration files from the module's config directory.
     */
    private function loadConfigFiles(string $moduleConfigPath, string $module): void
    {
        if (File::exists($moduleConfigPath)) {
            foreach (File::allFiles($moduleConfigPath) as $file) {
                $configName = $module . '.' . basename($file->getRealPath(), '.php');
                Config::set($configName, require $file->getRealPath());
            }
        }
    }
}
