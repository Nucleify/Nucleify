<?php

if (!function_exists('getAllModules')) {
    function getAllModules(): array
    {
        $modulesPath = __DIR__ . '/../../';
        $modules = [];

        if (!is_dir($modulesPath)) {
            return [];
        }

        $moduleDirs = glob($modulesPath . '/*', GLOB_ONLYDIR);

        if ($moduleDirs === false) {
            return [];
        }

        foreach ($moduleDirs as $moduleDir) {
            $moduleName = basename($moduleDir);

            $configFile = $moduleDir . '/config.json';
            if (file_exists($configFile)) {
                try {
                    $configContent = file_get_contents($configFile);
                    $config = json_decode($configContent, true);

                    if (json_last_error() === JSON_ERROR_NONE && is_array($config)) {
                        $modules[$moduleName] = $config;
                    } else {
                        $modules[$moduleName] = [
                            'name' => $moduleName,
                            'description' => 'Config file contains invalid JSON: ' . json_last_error_msg(),
                        ];
                    }
                } catch (Exception $e) {
                    $modules[$moduleName] = [
                        'name' => $moduleName,
                        'description' => 'Config file failed to load: ' . $e->getMessage(),
                    ];
                }
            } else {
                $modules[$moduleName] = [
                    'name' => $moduleName,
                    'description' => 'Config file does not exist',
                ];
            }
        }

        if (!is_array($modules)) {
            return [];
        }

        return $modules;
    }

    try {
        $result = getAllModules();

        return is_array($result) ? $result : [];
    } catch (Exception $e) {
        return [];
    }
}
