<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('seeder-discovery-service', 'call-module-seeder');

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

describe('callModuleSeeder', function (): void {
    test('uses custom seeder name from config', function (): void {
        $moduleName = 'nuc_custom_module_' . time();
        $this->testModules[] = $moduleName;
        $modulePath = $this->testModulesPath . '/' . $moduleName;
        File::makeDirectory($modulePath, 0755, true);

        $config = [
            'name' => 'Custom Module',
            'enabled' => true,
            'installed' => true,
            'seeder' => 'CustomSeederName',
        ];
        File::put($modulePath . '/config.json', json_encode($config));

        if (!class_exists('Database\Seeders\CustomSeederName')) {
            eval('namespace Database\Seeders; class CustomSeederName extends \Illuminate\Database\Seeder { public function run() {} }');
        }

        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldReceive('call')
            ->once()
            ->with('Database\Seeders\CustomSeederName');
        $seeder->shouldReceive('showMessage');

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('callModuleSeeder');
        $method->setAccessible(true);

        $method->invoke($this->service, $seeder, $moduleName);
    });

    test('guesses seeder name when not provided in config', function (): void {
        $moduleName = 'nuc_test_colors';
        $this->testModules[] = $moduleName;
        $modulePath = $this->testModulesPath . '/' . $moduleName;
        File::makeDirectory($modulePath, 0755, true);

        $config = [
            'name' => 'Test Colors Module',
            'enabled' => true,
            'installed' => true,
        ];
        File::put($modulePath . '/config.json', json_encode($config));

        if (!class_exists('Database\Seeders\TestColorSeeder')) {
            eval('namespace Database\Seeders; class TestColorSeeder extends \Illuminate\Database\Seeder { public function run() {} }');
        }

        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldReceive('call')
            ->once()
            ->with('Database\Seeders\TestColorSeeder');
        $seeder->shouldReceive('showMessage');

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('callModuleSeeder');
        $method->setAccessible(true);

        $method->invoke($this->service, $seeder, $moduleName);
    });

    test('skips calling seeder if class does not exist', function (): void {
        $moduleName = 'nuc_nonexistent_seeder_' . time();
        $this->testModules[] = $moduleName;
        $modulePath = $this->testModulesPath . '/' . $moduleName;
        File::makeDirectory($modulePath, 0755, true);

        $config = [
            'name' => 'Nonexistent Seeder Module',
            'enabled' => true,
            'installed' => true,
            'seeder' => 'NonexistentSeeder' . time(),
        ];
        File::put($modulePath . '/config.json', json_encode($config));

        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldNotReceive('call');

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('callModuleSeeder');
        $method->setAccessible(true);

        $method->invoke($this->service, $seeder, $moduleName);

        expect(true)->toBeTrue();
    });
});
