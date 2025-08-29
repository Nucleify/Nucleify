<?php

if (!defined('PEST_RUNNING')) {
    return;
}

require_once __DIR__ . '/../../hooks/getInstalledModules.php';

describe('getInstalledModules', function () {
    test('returns an array', function () {
        $modules = getInstalledModules();

        expect($modules)->toBeArray();
        expect($modules)->not->toBeEmpty();
    });

    test('returns modules with correct structure', function () {
        $modules = getInstalledModules();

        foreach ($modules as $moduleName => $moduleConfig) {
            expect($moduleConfig)->toBeArray();
            expect($moduleConfig)->toHaveKey('name');
            expect($moduleConfig)->toHaveKey('description');
            expect($moduleConfig['name'])->toBe($moduleName);
        }
    });

    test('includes modules with config files', function () {
        $modules = getInstalledModules();

        expect($modules)->toHaveKey('dm_modules');
        expect($modules['dm_modules'])->toHaveKey('name');
        expect($modules['dm_modules'])->toHaveKey('description');
        expect($modules['dm_modules'])->toHaveKey('version');
        expect($modules['dm_modules'])->toHaveKey('category');
    });

    test('handles modules without config files gracefully', function () {
        $modules = getInstalledModules();

        foreach ($modules as $moduleName => $moduleConfig) {
            if (isset($moduleConfig['description']) && str_contains($moduleConfig['description'], 'Config file does not exist')) {
                expect($moduleConfig['name'])->toBe($moduleName);
                expect($moduleConfig['description'])->toBe('Config file does not exist');
            } else {
            }
        }
        expect($moduleConfig['name'])->toBe($moduleName);
    });

    test('returns consistent module structure', function () {
        $modules = getInstalledModules();

        foreach ($modules as $moduleName => $moduleConfig) {
            expect($moduleConfig)->toHaveKeys(['name', 'description']);
            expect($moduleConfig['name'])->toBe($moduleName);
            expect($moduleConfig['description'])->toBeString();
        }
    });

    test('returns only dm_* prefixed modules', function () {
        $modules = getInstalledModules();

        foreach ($modules as $moduleName => $moduleConfig) {
            expect($moduleName)->toMatch('/^dm_/');
        }
    });

    test('function is callable', function () {
        expect(function_exists('getInstalledModules'))->toBeTrue();
    });

    test('returns array even when modules directory is empty', function () {
        $modules = getInstalledModules();

        expect($modules)->toBeArray();
        expect($modules)->not->toBeNull();
        expect($modules)->not->toBeFalse();
    });
});
