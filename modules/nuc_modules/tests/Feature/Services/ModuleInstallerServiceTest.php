<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('module-installer-service');

use App\Models\Module;
use App\Services\ModuleInstallerService;
use Illuminate\Support\Facades\File;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->basePath = base_path('modules/nuc_modules/test_modules');
    $this->modules = ['test_module_laravel.zip', 'test_module_nuxt.zip'];
});

describe('ModuleInstallerService', function (): void {
    test('can install Laravel module', function (): void {
        $module = $this->basePath . '/' . $this->modules[0];

        $service = app(ModuleInstallerService::class);
        $result = $service->install($module, $this->basePath);

        expect($result)
            ->toBeInstanceOf(Module::class)
            ->and($result->installed)->toBeTrue();
    });

    test('can install Nuxt module', function (): void {
        $module = $this->basePath . '/' . $this->modules[1];

        $service = app(ModuleInstallerService::class);
        $result = $service->install($module, $this->basePath);

        expect($result)
            ->toBeInstanceOf(Module::class)
            ->and($result->installed)->toBeTrue();
    });

    test('can uninstall modules', function (): void {
        $service = app(ModuleInstallerService::class);

        foreach ($this->modules as $module) {
            $module = $this->basePath . '/' . $module;
            $installedModule = $service->install($module, 'modules');

            expect($installedModule->installed)->toBeTrue();

            $result = $service->uninstall($installedModule->getName());

            expect($result)->toBeTrue();

            expect(File::exists(base_path('modules/' . $installedModule->getName())))->toBeFalse();
        }
    });
});
