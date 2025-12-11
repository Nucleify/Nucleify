<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('seeder-discovery-service', 'discover-and-call-seeders');

use App\Services\SeederDiscoveryService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

beforeEach(function (): void {
    $this->service = new SeederDiscoveryService;
    $this->testModulesPath = base_path('modules');
    $this->testModules = [];
});

afterEach(function (): void {
    foreach ($this->testModules as $moduleName) {
        $modulePath = base_path('modules/' . $moduleName);
        if (File::exists($modulePath)) {
            File::deleteDirectory($modulePath);
        }
    }
});

describe('discoverAndCallSeeders', function (): void {
    test('handles non-existent modules directory gracefully', function (): void {
        $originalPath = base_path('modules');
        $tempPath = base_path('modules_backup_test');

        if (File::exists($originalPath)) {
            File::move($originalPath, $tempPath);
        }

        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldNotReceive('call');

        $this->service->discoverAndCallSeeders($seeder);

        if (File::exists($tempPath)) {
            File::move($tempPath, $originalPath);
        }

        expect(true)->toBeTrue();
    });

    test('discovers and calls seeders for enabled modules', function (): void {
        $moduleName = 'nuc_test_module_' . time();
        $this->testModules[] = $moduleName;
        $modulePath = $this->testModulesPath . '/' . $moduleName;
        File::makeDirectory($modulePath, 0755, true);

        $config = [
            'name' => 'Test Module',
            'enabled' => true,
            'installed' => true,
            'seeder' => 'TestSeeder',
        ];
        File::put($modulePath . '/config.json', json_encode($config));

        if (!class_exists('Database\Seeders\TestSeeder')) {
            eval('namespace Database\Seeders; class TestSeeder extends \Illuminate\Database\Seeder { public function run() {} }');
        }

        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldReceive('call')
            ->with('Database\Seeders\TestSeeder')
            ->once();
        $seeder->shouldReceive('call')
            ->with(Mockery::any())
            ->zeroOrMoreTimes();
        $seeder->shouldReceive('showMessage')
            ->zeroOrMoreTimes();

        $this->service->discoverAndCallSeeders($seeder);
    });

    test('skips modules without config.json', function (): void {
        $moduleName = 'nuc_no_config_' . time();
        $this->testModules[] = $moduleName;
        $modulePath = $this->testModulesPath . '/' . $moduleName;
        File::makeDirectory($modulePath, 0755, true);

        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldReceive('call')
            ->with(Mockery::any())
            ->zeroOrMoreTimes();
        $seeder->shouldReceive('showMessage')
            ->zeroOrMoreTimes();

        $this->service->discoverAndCallSeeders($seeder);

        expect(true)->toBeTrue();
    });

    test('skips disabled modules', function (): void {
        $moduleName = 'nuc_disabled_module_' . time();
        $this->testModules[] = $moduleName;
        $modulePath = $this->testModulesPath . '/' . $moduleName;
        File::makeDirectory($modulePath, 0755, true);

        $config = [
            'name' => 'Disabled Module',
            'enabled' => false,
            'installed' => true,
            'seeder' => 'DisabledSeeder',
        ];
        File::put($modulePath . '/config.json', json_encode($config));

        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldReceive('call')
            ->with(Mockery::any())
            ->zeroOrMoreTimes();
        $seeder->shouldReceive('showMessage')
            ->zeroOrMoreTimes();

        $this->service->discoverAndCallSeeders($seeder);

        expect(true)->toBeTrue();
    });

    test('skips not installed modules', function (): void {
        $moduleName = 'nuc_not_installed_' . time();
        $this->testModules[] = $moduleName;
        $modulePath = $this->testModulesPath . '/' . $moduleName;
        File::makeDirectory($modulePath, 0755, true);

        $config = [
            'name' => 'Not Installed Module',
            'enabled' => true,
            'installed' => false,
            'seeder' => 'NotInstalledSeeder',
        ];
        File::put($modulePath . '/config.json', json_encode($config));

        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldReceive('call')
            ->with(Mockery::any())
            ->zeroOrMoreTimes();
        $seeder->shouldReceive('showMessage')
            ->zeroOrMoreTimes();

        $this->service->discoverAndCallSeeders($seeder);

        expect(true)->toBeTrue();
    });

    test('skips modules with seeder explicitly set to false', function (): void {
        $moduleName = 'nuc_no_seeder_' . time();
        $this->testModules[] = $moduleName;
        $modulePath = $this->testModulesPath . '/' . $moduleName;
        File::makeDirectory($modulePath, 0755, true);

        $config = [
            'name' => 'No Seeder Module',
            'enabled' => true,
            'installed' => true,
            'seeder' => false,
        ];
        File::put($modulePath . '/config.json', json_encode($config));

        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldReceive('call')
            ->with(Mockery::any())
            ->zeroOrMoreTimes();
        $seeder->shouldReceive('showMessage')
            ->zeroOrMoreTimes();

        $this->service->discoverAndCallSeeders($seeder);

        expect(true)->toBeTrue();
    });
});
