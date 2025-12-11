<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('module-installer-controller');

use App\Http\Controllers\ModuleInstallerController;
use App\Http\Requests\InstallRequest;
use App\Http\Requests\UninstallRequest;
use App\Services\ModuleInstallerService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ModuleInstallerController::class, ['service' => app()->make(ModuleInstallerService::class)]);
    $this->basePath = base_path('modules/nuc_modules/test_modules');
});

describe('200', function (): void {
    test('install method', function (): void {
        $module = $this->basePath . '/test_module_laravel.zip';

        $uploadedFile = new UploadedFile(
            $module,
            'test_module_laravel.zip',
            null,
            null,
            true
        );

        $request = InstallRequest::create('/', 'POST', [], [], [
            'file' => $uploadedFile,
        ]);

        $response = $this->controller->install($request);

        File::deleteDirectory(base_path('modules') . '/test_module_laravel');

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('uninstall method', function (): void {
        $model = \App\Models\Module::where('name', 'test_module_laravel')->first();
        if (!$model) {
            $file = $this->basePath . '/test_module_laravel.zip';

            $uploadedFile = new UploadedFile(
                $file,
                'test_module_laravel.zip',
                null,
                null,
                true
            );

            $installRequest = InstallRequest::create('/', 'POST', [], [], [
                'file' => $uploadedFile,
            ]);

            $installResponse = $this->controller->install($installRequest);

            expect($installResponse->getStatusCode())->toEqual(200);
        }

        $request = UninstallRequest::create('/', 'POST', [
            'name' => 'test_module_laravel',
        ]);

        $response = $this->controller->uninstall($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });
});
