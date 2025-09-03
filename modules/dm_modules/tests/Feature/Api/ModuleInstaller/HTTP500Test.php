<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('module-installer-api-500');
uses()->group('api-500');

use App\Services\ModuleInstallerService;
use Illuminate\Http\UploadedFile;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('500', function (): void {
    test('install api', function (): void {
        $this->mock(ModuleInstallerService::class, function ($mock) {
            $mock->shouldReceive('install')
                ->once()
                ->andThrow(new \Exception('Service error occurred'));
        });

        $file = UploadedFile::fake()->create('test_module.zip', 100, 'application/zip');

        $this->post(route('modules.install'), [
            'file' => $file,
        ])
            ->assertStatus(500)
            ->assertJson([
                'error' => 'Service error occurred',
            ]);
    });
});
