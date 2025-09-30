<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('module-installer-api-200');
uses()->group('api-200');

use App\Models\Module;
use Illuminate\Http\UploadedFile;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('install api', function (): void {
        $this->mock(\App\Services\ModuleInstallerService::class, function ($mock) {
            $mock->shouldReceive('install')
                ->once()
                ->andReturn(Module::factory()->make([
                    'name' => 'test_module',
                    'installed' => true,
                ]));
        });

        $file = UploadedFile::fake()->create('test_module.zip', 100, 'application/zip');

        $this->post(route('modules.install'), [
            'file' => $file,
        ])
            ->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Module successfully installed: test_module',
            ]);
    });

    test('uninstall api', function (): void {
        $this->mock(\App\Services\ModuleInstallerService::class, function ($mock) {
            $mock->shouldReceive('uninstall')
                ->once()
                ->with('test_module')
                ->andReturn(true);
        });

        $this->post(route('modules.uninstall'), [
            'name' => 'test_module',
        ])
            ->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Module successfully uninstalled: test_module',
                'name' => 'test_module',
            ]);
    });
});
