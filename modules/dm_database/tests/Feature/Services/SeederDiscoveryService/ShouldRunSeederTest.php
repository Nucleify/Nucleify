<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('seeder-discovery-service', 'should-run-seeder');

use App\Services\SeederDiscoveryService;

beforeEach(function (): void {
    $this->service = new SeederDiscoveryService;
});

describe('shouldRunSeeder', function (): void {
    test('returns true when module is enabled and installed', function (): void {
        $config = [
            'enabled' => true,
            'installed' => true,
        ];

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('shouldRunSeeder');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, $config);

        expect($result)->toBeTrue();
    });

    test('returns false when module is disabled', function (): void {
        $config = [
            'enabled' => false,
            'installed' => true,
        ];

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('shouldRunSeeder');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, $config);

        expect($result)->toBeFalse();
    });

    test('returns false when module is not installed', function (): void {
        $config = [
            'enabled' => true,
            'installed' => false,
        ];

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('shouldRunSeeder');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, $config);

        expect($result)->toBeFalse();
    });

    test('returns false when both disabled and not installed', function (): void {
        $config = [
            'enabled' => false,
            'installed' => false,
        ];

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('shouldRunSeeder');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, $config);

        expect($result)->toBeFalse();
    });

    test('returns false when enabled is missing', function (): void {
        $config = [
            'installed' => true,
        ];

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('shouldRunSeeder');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, $config);

        expect($result)->toBeFalse();
    });

    test('returns false when installed is missing', function (): void {
        $config = [
            'enabled' => true,
        ];

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('shouldRunSeeder');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, $config);

        expect($result)->toBeFalse();
    });
});
