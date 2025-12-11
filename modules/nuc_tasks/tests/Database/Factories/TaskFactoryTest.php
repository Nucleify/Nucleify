<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('task-factory');

use App\Models\Task;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = Task::factory()->create();

    $this->assertDatabaseCount('tasks', 1)
        ->assertDatabaseHas('tasks', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Task::factory()->count(3)->create();

    $this->assertDatabaseCount('tasks', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('tasks', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        Task::factory()->create(['id' => 'invalid_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable for git workflow tests');

test('can\'t create multiple records', function (): void {
    try {
        Task::factory()->count(2)->create(['id' => 'invalid_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable for git workflow tests');
