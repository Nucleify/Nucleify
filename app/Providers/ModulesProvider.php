<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class ModulesProvider extends ServiceProvider
{
    private const MODULES_PATH = 'modules';

    public function register(): void
    {
        $this->registerModulesProviders();
    }

    public function boot(): void
    {
        $this->loadModules();
    }

    private function registerModulesProviders(): void
    {
        $this->scanModules(function (string $module): void {
            $providerClass = "Modules\\{$module}\\{$module}";
            if (class_exists($providerClass)) {
                $this->app->register($providerClass);
            }
        });
    }

    private function loadModules(): void
    {
        $this->scanModules(function (string $module): void {
            $this->loadModulesFiles($module);
            $this->loadModulesDatabase($module);
            $this->loadModulesConfig($module);
        });
    }

    private function loadModulesFiles(string $module): void
    {
        $this->scanModulesDirectories($module, ['app', 'tests'], function (string $path): void {
            $this->requireAllFiles($path);
        });
    }

    private function loadModulesDatabase(string $module): void
    {
        $this->scanModulesDirectories($module, ['migrations', 'factories', 'seeders'], function (string $path): void {
            $this->requireAllFiles($path);
        }, 'database');
    }

    private function loadModulesConfig(string $module): void
    {
        $configPath = base_path(self::MODULES_PATH . "/{$module}/config");
        if (File::exists($configPath)) {
            foreach (File::allFiles($configPath) as $file) {
                $configName = $module . '.' . basename($file->getRealPath(), '.php');
                if (function_exists('include_override')) {
                    Config::set($configName, include_override($file->getRealPath()));
                } else {
                    Config::set($configName, require $file->getRealPath());
                }
            }
        }
    }

    private function scanModules(callable $callback): void
    {
        $modulePath = base_path(self::MODULES_PATH);
        if (!File::exists($modulePath)) {
            return;
        }

        foreach (array_filter(scandir($modulePath), fn ($m) => !in_array($m, ['.', '..'])) as $module) {
            $callback($module);
        }
    }

    private function scanModulesDirectories(string $module, array $directories, callable $callback, string $baseDir = ''): void
    {
        $modulePath = base_path(self::MODULES_PATH . "/{$module}" . ($baseDir ? "/{$baseDir}" : ''));
        if (!File::exists($modulePath)) {
            return;
        }

        foreach ($directories as $dir) {
            $path = "{$modulePath}/{$dir}";
            if (File::exists($path)) {
                $callback($path);
            }
        }
    }

    private function requireAllFiles(string $path): void
    {
        foreach (File::allFiles($path) as $file) {
            if (function_exists('require_once_override')) {
                require_once_override($file->getRealPath());
            } else {
                require_once $file->getRealPath();
            }
        }
    }
}
