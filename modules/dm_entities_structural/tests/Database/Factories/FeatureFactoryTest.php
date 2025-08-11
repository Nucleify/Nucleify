<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('feature-factory');

use App\Models\Feature;

test('can create record', function (): void {
    $feature = Feature::factory()->create();
    $this->assertDatabaseCount('features', 1);
    $this->assertDatabaseHas('features', ['id' => $feature->id]);
});

test('can create multiple records', function (): void {
    $features = Feature::factory()->count(3)->create();
    $this->assertDatabaseCount('features', 3);
    foreach ($features as $feature) {
        $this->assertDatabaseHas('features', ['id' => $feature->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        Feature::factory()->create(['category' => null]);
    } catch (Exception $e) {
        $this->assertNotEmpty($e->getMessage());

        return;
    }
    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('can\'t create multiple records', function (): void {
    try {
        Feature::factory()->count(2)->create(['category' => null]);
    } catch (Exception $e) {
        $this->assertNotEmpty($e->getMessage());

        return;
    }
    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
