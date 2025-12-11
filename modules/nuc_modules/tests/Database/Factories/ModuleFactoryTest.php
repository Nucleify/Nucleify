<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Module;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = Module::factory()->create();

    $this->assertDatabaseCount('modules', 1)
        ->assertDatabaseHas('modules', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Module::factory()->count(3)->create();

    $this->assertDatabaseCount('modules', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('modules', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        Module::factory()->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('can\'t create multiple records', function (): void {
    try {
        Module::factory()->count(2)->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
