<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Task;
use App\Services\TaskService;

uses()->group('task-api-500');

use function Pest\Laravel\mock;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(TaskService::class);
});

describe('500 > Internal Server Error', function (): void {
    test('index api', function (): void {
        $this->service
            ->shouldReceive('index')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('tasks.index'));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('show api', function (): void {
        $this->service
            ->shouldReceive('show')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('tasks.show', ['id' => 1]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('store api', function (): void {
        $this->service
            ->shouldReceive('create')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->postJson(route('tasks.store'), taskData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('update api', function (): void {
        $this->service
            ->shouldReceive('update')
            ->with(1, Mockery::any())
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->putJson(route('tasks.update', taskData['id']), updatedTaskData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('destroy api', function (): void {
        $task = Task::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->deleteJson(route('tasks.destroy', ['id' => $task->id]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });
});
