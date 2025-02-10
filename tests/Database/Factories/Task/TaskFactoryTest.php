<?php

use App\Models\Task\Task;

beforeEach(function () {
    $this->createUsers();
});

it('can create record', function () {
    $task = Task::factory()->create();

    $this->assertDatabaseCount('tasks', 1);
    $this->assertDatabaseHas('tasks', ['id' => $task->id]);
});

it('can create multiple records', function () {
    $tasks = Task::factory()->count(3)->create();

    $this->assertDatabaseCount('tasks', 3);
    foreach ($tasks as $task) {
        $this->assertDatabaseHas('tasks', ['id' => $task->id]);
    }
});

it('cant\'t create record', function () {
    try {
        Task::factory()->create(['creator_id' => 'creator_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it('cant\'t create multiple records', function () {
    try {
        Task::factory()->count(2)->create(['creator_id' => 'creator_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
