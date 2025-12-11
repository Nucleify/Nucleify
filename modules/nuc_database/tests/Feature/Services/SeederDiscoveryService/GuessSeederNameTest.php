<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('seeder-discovery-service', 'guess-seeder-name');

use App\Services\SeederDiscoveryService;

beforeEach(function (): void {
    $this->service = new SeederDiscoveryService;
});

describe('guessSeederName', function (): void {
    test('generates seeder name from module with dm prefix', function (): void {
        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('guessSeederName');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, 'nuc_activity');

        expect($result)->toBe('ActivitySeeder');
    });

    test('removes trailing s from module name', function (): void {
        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('guessSeederName');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, 'nuc_colors');

        expect($result)->toBe('ColorSeeder');
    });

    test('keeps ies ending', function (): void {
        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('guessSeederName');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, 'nuc_activities');

        expect($result)->toBe('ActivitiesSeeder');
    });

    test('handles multi-word module names', function (): void {
        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('guessSeederName');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, 'nuc_entities_structural');

        expect($result)->toBe('EntitiesStructuralSeeder');
    });

    test('handles module name without trailing s', function (): void {
        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('guessSeederName');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, 'nuc_admin');

        expect($result)->toBe('AdminSeeder');
    });

    test('capitalizes each word properly', function (): void {
        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('guessSeederName');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, 'nuc_screen_lights');

        expect($result)->toBe('ScreenLightSeeder');
    });
});
