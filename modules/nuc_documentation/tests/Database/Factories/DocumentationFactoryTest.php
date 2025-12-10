<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('documentation-factory');

use App\Models\Documentation;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = Documentation::factory()->create();

    $this->assertDatabaseCount('documentation', 1)
        ->assertDatabaseHas('documentation', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Documentation::factory()->count(3)->create();

    $this->assertDatabaseCount('documentation', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('documentation', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        Documentation::factory()->create(['id' => 'invalid_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable for git workflow tests');

test('can\'t create multiple records', function (): void {
    try {
        Documentation::factory()->count(2)->create(['id' => 'invalid_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable for git workflow tests');
