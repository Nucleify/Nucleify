<?php

function getInstalledModules(): array
{
    $modulesPath = __DIR__ . '/../../';
    $modules = [];

    if (!is_dir($modulesPath)) {
        return [];
    }

    $moduleDirs = glob($modulesPath . '/dm_*', GLOB_ONLYDIR);

    if ($moduleDirs === false) {
        return [];
    }

    foreach ($moduleDirs as $moduleDir) {
        $moduleName = basename($moduleDir);

        $configFile = $moduleDir . '/config.php';
        if (file_exists($configFile)) {
            try {
                $config = require $configFile;
                if (is_array($config)) {
                    $modules[$moduleName] = $config;
                } else {
                    $modules[$moduleName] = [
                        'name' => $moduleName,
                        'description' => 'Config file did not return array',
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
    $result = getInstalledModules();

    return is_array($result) ? $result : [];
} catch (Exception $e) {
    return [];
}
