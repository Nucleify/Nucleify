<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('technology-factory');

use App\Models\Technology;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = Technology::factory()->create();

    $this->assertDatabaseCount('technologies', 1)
        ->assertDatabaseHas('technologies', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Technology::factory()->count(3)->create();

    $this->assertDatabaseCount('technologies', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('technologies', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        Technology::factory()->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('can\'t create multiple records', function (): void {
    try {
        Technology::factory()->count(2)->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
