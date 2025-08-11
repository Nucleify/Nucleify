<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-factory');

use App\Models\SystemColor;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = SystemColor::factory()->create();

    $this->assertDatabaseCount('system_colors', 1)
        ->assertDatabaseHas('system_colors', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = SystemColor::factory()->count(3)->create();

    $this->assertDatabaseCount('system_colors', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('system_colors', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        SystemColor::factory(['id' => 'id'])->create();
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('can\'t create multiple records', function (): void {
    try {
        SystemColor::factory(['id' => 'id'])->count(2)->create();
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
