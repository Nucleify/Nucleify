<?php

namespace App\Services;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SeederDiscoveryService
{
    private const MODULES_PATH = 'modules';

    public function discoverAndCallSeeders(Seeder $seeder): void
    {
        $modulePath = base_path(self::MODULES_PATH);

        if (!File::exists($modulePath)) {
            return;
        }

        $modules = $this->getModuleDirectories($modulePath);

        foreach ($modules as $module) {
            $this->callModuleSeeder($seeder, $module);
        }
    }

    private function getModuleDirectories(string $modulePath): array
    {
        $modules = array_filter(
            scandir($modulePath),
            fn ($m) => !in_array($m, ['.', '..', '_index.scss', 'index.ts', 'README.md', 'nuc_database'])
        );

        usort($modules, function ($a, $b) {
            $aIsNuc = str_starts_with($a, 'nuc_');
            $bIsNuc = str_starts_with($b, 'nuc_');

            if ($aIsNuc && !$bIsNuc) {
                return -1;
            }

            if (!$aIsNuc && $bIsNuc) {
                return 1;
            }

            return strcmp($a, $b);
        });

        return $modules;
    }

    private function callModuleSeeder(Seeder $seeder, string $module): void
    {
        $configPath = base_path(self::MODULES_PATH . "/{$module}/config.json");

        if (!File::exists($configPath)) {
            return;
        }

        $config = json_decode(File::get($configPath), true);

        if (!$this->shouldRunSeeder($config)) {
            return;
        }

        if (isset($config['seeder']) && $config['seeder'] === false) {
            return;
        }

        $seederName = $config['seeder'] ?? $this->guessSeederName($module);

        if (class_exists("Database\\Seeders\\{$seederName}")) {
            $seederClass = "Database\\Seeders\\{$seederName}";
            $seeder->call($seederClass);

            $this->showCompletionMessage($seeder, $config['name']);
        }
    }

    private function shouldRunSeeder(array $config): bool
    {
        return ($config['enabled'] ?? false) && ($config['installed'] ?? false);
    }

    private function guessSeederName(string $module): string
    {
        $parts = explode('_', $module);
        array_shift($parts);
        $name = implode('', array_map('ucfirst', $parts));

        if (str_ends_with($name, 's') && !str_ends_with($name, 'ies')) {
            $name = substr($name, 0, -1);
        }

        return "{$name}Seeder";
    }

    private function showCompletionMessage(Seeder $seeder, string $moduleName): void
    {
        if (!method_exists($seeder, 'showMessage')) {
            return;
        }

        try {
            $reflection = new \ReflectionClass($seeder);
            $commandProperty = $reflection->getProperty('command');
            $commandProperty->setAccessible(true);
            $command = $commandProperty->getValue($seeder);

            $seeder->showMessage("{$moduleName} seeding completed.", $command);
        } catch (\ReflectionException $e) {
        }
    }
}
