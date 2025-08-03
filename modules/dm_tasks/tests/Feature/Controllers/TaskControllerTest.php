<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\TaskController;
use App\Http\Requests\Task\PostRequest;
use App\Http\Requests\Task\PutRequest;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(TaskController::class, ['taskService' => app()->make(TaskService::class)]);
});

test('index > success', function (): void {
    Task::factory()->count(3)->create();

    $request = new Request;

    $response = $this->controller->index($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('countByCreatedLastWeek > success', function (): void {
    $request = new Request;

    $response = $this->controller->countByCreatedLastWeek($request);

    expect($response->getStatusCode())->toEqual(200);
});

test('show > success', function (): void {
    $task = Task::factory()->create();

    $response = $this->controller->show($task->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function (): void {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(taskData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function (): void {
    $task = Task::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedTaskData);

    $response = $this->controller->update($request, $task->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function (): void {
    $task = Task::factory()->create();

    $response = $this->controller->destroy($task->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
});
