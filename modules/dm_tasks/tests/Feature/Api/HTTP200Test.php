<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('task-api-200');
uses()->group('api-200');

use App\Models\Task;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        Task::factory(3)->create();

        $this->getJson(route('tasks.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Task::factory(3)->create();

        $this->getJson(route('tasks.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('tasks.store'), taskData)
            ->assertOk();
    });

    test('show api', function (): void {
        $task = Task::factory()->create();

        $this->getJson(route('tasks.show', $task->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $task = Task::factory()->create();

        $this->putJson(route('tasks.update', $task->id), updatedTaskData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $task = Task::factory()->create();

        $this->deleteJson(route('tasks.destroy', $task->id))
            ->assertOk();
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    });
});
