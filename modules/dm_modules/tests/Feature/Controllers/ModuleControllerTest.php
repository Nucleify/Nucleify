<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\ModuleController;
use App\Http\Requests\Module\PostRequest;
use App\Http\Requests\Module\PutRequest;
use App\Models\Module;
use App\Services\ModuleService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ModuleController::class, ['moduleService' => app()->make(ModuleService::class)]);
});

test('index > success', function (): void {
    Module::factory()->count(3)->create();

    $request = new Request;

    $response = $this->controller->index($request);

    expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
});

test('show > success', function (): void {
    $model = Module::factory()->create();

    $response = $this->controller->show($model->id);

    expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
});

test('store > success', function (): void {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')->andReturn(moduleData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
});

test('update > success', function (): void {
    $model = Module::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')->andReturn(updatedModuleData);

    $response = $this->controller->update($request, $model->id);

    expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
});

test('delete > success', function (): void {
    $model = Module::factory()->create();

    $response = $this->controller->destroy($model->id);

    expect($response->getStatusCode(), $response->getData(true))
        ->toEqual(200)
        ->and($this->assertDatabaseMissing('modules', ['id' => $model->id]));
});
