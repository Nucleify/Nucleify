<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('activity-factory');

use Database\Factories\ActivityFactory;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = ActivityFactory::new()->create();

    $this->assertDatabaseCount('activity_log', 1)
        ->assertDatabaseHas('activity_log', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = ActivityFactory::new()->count(3)->create();

    $this->assertDatabaseCount('activity_log', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('activity_log', ['id' => $model->id]);
    }
});

test('cant\'t create record', function (): void {
    try {
        ActivityFactory::new()->create(['causer_id' => 'causer_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('cant\'t create multiple records', function (): void {
    try {
        ActivityFactory::new()->count(2)->create(['causer_id' => 'causer_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
