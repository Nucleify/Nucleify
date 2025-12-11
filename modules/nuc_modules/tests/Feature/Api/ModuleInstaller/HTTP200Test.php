<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('module-installer-api-200');
uses()->group('api-200');

use Illuminate\Http\UploadedFile;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->basePath = base_path('modules/nuc_modules/test_modules');
    $this->modules = ['test_module_laravel.zip', 'test_module_nuxt.zip'];
});

describe('200', function (): void {
    test('install & uninstall api', function (): void {
        foreach ($this->modules as $module) {
            $file = new UploadedFile(
                $this->basePath . '/' . $module,
                $module,
                'application/zip',
                null,
                true
            );

            $this->post(route('modules.install'), [
                'file' => $file,
            ])
                ->assertOk()
                ->assertJson([
                    'success' => true,
                ]);

            $this->post(route('modules.uninstall'), [
                'name' => str_replace('.zip', '', $module),
            ])
                ->assertOk()
                ->assertJson([
                    'success' => true,
                ]);
        }
    });
});
