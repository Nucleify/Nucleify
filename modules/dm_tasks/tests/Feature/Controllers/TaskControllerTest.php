<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('task-controller');

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

describe('200', function (): void {
    test('index method', function (): void {
        Task::factory()->count(3)->create();

        $request = new Request;

        $response = $this->controller->index($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('countByCreatedLastWeek method', function (): void {
        $request = new Request;

        $response = $this->controller->countByCreatedLastWeek($request);

        expect($response->getStatusCode())->toEqual(200);
    });

    test('show method', function (): void {
        $model = Task::factory()->create();

        $response = $this->controller->show($model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(taskData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('update method', function (): void {
        $model = Task::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(updatedTaskData);

        $response = $this->controller->update($request, $model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('delete method', function (): void {
        $model = Task::factory()->create();

        $response = $this->controller->destroy($model->id);

        expect($response->getStatusCode(), $response->getData(true)['deleted'])
            ->toEqual(200)
            ->and($this->assertDatabaseMissing('tasks', ['id' => $model->id]));
    });
});
