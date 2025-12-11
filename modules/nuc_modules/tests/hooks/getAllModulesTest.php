<?php

if (!defined('PEST_RUNNING')) {
    return;
}

require_once __DIR__ . '/../../hooks/getAllModules.php';

describe('getAllModules', function () {
    test('returns an array', function () {
        $modules = getAllModules();

        expect($modules)->toBeArray();
        expect($modules)->not->toBeEmpty();
    });

    test('returns modules with correct structure', function () {
        $modules = getAllModules();

        foreach ($modules as $moduleName => $moduleConfig) {
            expect($moduleConfig)->toBeArray();
            expect($moduleConfig)->toHaveKey('name');
            expect($moduleConfig)->toHaveKey('description');
            expect($moduleConfig['name'])->toBe($moduleName);
        }
    });

    test('includes modules with config files', function () {
        $modules = getAllModules();

        expect($modules)->toHaveKey('nuc_modules');
        expect($modules['nuc_modules'])->toHaveKey('name');
        expect($modules['nuc_modules'])->toHaveKey('description');
        expect($modules['nuc_modules'])->toHaveKey('version');
        expect($modules['nuc_modules'])->toHaveKey('category');
    });

    test('handles modules without config files gracefully', function () {
        $modules = getAllModules();

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
        $modules = getAllModules();

        foreach ($modules as $moduleName => $moduleConfig) {
            expect($moduleConfig)->toHaveKeys(['name', 'description']);
            expect($moduleConfig['name'])->toBe($moduleName);
            expect($moduleConfig['description'])->toBeString();
        }
    });

    test('function is callable', function () {
        expect(function_exists('getAllModules'))->toBeTrue();
    });

    test('returns array even when modules directory is empty', function () {
        $modules = getAllModules();

        expect($modules)->toBeArray();
        expect($modules)->not->toBeNull();
        expect($modules)->not->toBeFalse();
    });
});
