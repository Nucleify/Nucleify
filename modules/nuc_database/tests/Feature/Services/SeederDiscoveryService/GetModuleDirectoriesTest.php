<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('seeder-discovery-service', 'get-module-directories');

use App\Services\SeederDiscoveryService;

beforeEach(function (): void {
    $this->service = new SeederDiscoveryService;
    $this->testModulesPath = base_path('modules');
});

describe('getModuleDirectories', function (): void {
    // test('filters out non-module files and directories', function (): void {
    //     $reflection = new ReflectionClass($this->service);
    //     $method = $reflection->getMethod('getModuleDirectories');
    //     $method->setAccessible(true);

    //     $result = $method->invoke($this->service, $this->testModulesPath);

    //     expect($result)
    //         ->toBeArray()
    //         ->not->toContain('.')
    //         ->not->toContain('..')
    //         ->not->toContain('_index.scss')
    //         ->not->toContain('index.ts')
    //         ->not->toContain('README.md')
    //         ->not->toContain('nuc_database');

    //     foreach ($result as $moduleName) {
    //         expect($moduleName)->toStartWith('nuc_');
    //     }
    // });

    test('returns array with existing modules', function (): void {
        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('getModuleDirectories');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, $this->testModulesPath);

        expect($result)->toBeArray();
        expect(count($result))->toBeGreaterThan(0);
    });
});
