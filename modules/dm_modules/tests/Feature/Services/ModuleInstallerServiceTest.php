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
    $this->basePath = base_path('modules/dm_modules/test_modules');
});

describe('ModuleInstallerService', function (): void {
    test('can install Laravel module', function (): void {
        $module = $this->basePath . '/test_module_laravel.zip';

        $service = app(ModuleInstallerService::class);
        $result = $service->install($module, $this->basePath);

        expect($result)
            ->toBeInstanceOf(Module::class)
            ->and($result->installed)->toBeTrue();

        File::deleteDirectory($this->basePath . '/' . pathinfo($module, PATHINFO_FILENAME));
    });

    test('can install Nuxt module', function (): void {
        $module = $this->basePath . '/test_module_nuxt.zip';

        $service = app(ModuleInstallerService::class);
        $result = $service->install($module, $this->basePath);

        expect($result)
            ->toBeInstanceOf(Module::class)
            ->and($result->installed)->toBeTrue();

        File::deleteDirectory($this->basePath . '/' . pathinfo($module, PATHINFO_FILENAME));
    });

    test('can uninstall module', function (): void {
        $module = $this->basePath . '/test_module_laravel.zip';
        $service = app(ModuleInstallerService::class);
        $installedModule = $service->install($module, 'modules');

        expect($installedModule->installed)
            ->toBeTrue();

        $result = $service->uninstall($installedModule->getName());

        expect($result)->toBeTrue();

        $module = Module::find($installedModule->getId());

        expect($module)->not->toBeNull();
        expect($module->installed)->toBe(0);
        expect($module->enabled)->toBe(0);

        $path = base_path('modules/' . $installedModule->getName());

        expect(File::exists($path))->toBeFalse();
    });
});
