<?php

use App\Models\Task\Task;
use App\Models\Task\TaskCollaboration;

beforeEach(function () {
    $this->createUsers();
});

it('can create record', function () {
    $task = Task::factory()->create();
    $collaboration = TaskCollaboration::factory()->create(['task_id' => $task->id]);

    $this->assertDatabaseCount('task_collaborations', 1);
    $this->assertDatabaseHas('task_collaborations', ['id' => $collaboration->id]);
});

it('can create multiple records', function () {
    $task = Task::factory()->create();
    $collaborations = TaskCollaboration::factory(3)->create(['task_id' => $task->id]);

    $this->assertDatabaseCount('task_collaborations', 3);
    foreach ($collaborations as $collaboration) {
        $this->assertDatabaseHas('task_collaborations', ['id' => $collaboration->id]);
    }
});

it('cant\'t create record', function () {
    try {
        TaskCollaboration::factory()->create(['task_id' => 'task_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it('cant\'t create multiple records', function () {
    try {
        TaskCollaboration::factory(2)->create(['task_id' => 'task_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
