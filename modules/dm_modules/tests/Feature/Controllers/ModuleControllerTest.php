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

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('show > success', function (): void {
    $module = Module::factory()->create();

    $response = $this->controller->show($module->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function (): void {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')->andReturn(moduleData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function (): void {
    $module = Module::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')->andReturn(updatedModuleData);

    $response = $this->controller->update($request, $module->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function (): void {
    $module = Module::factory()->create();

    $response = $this->controller->destroy($module->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('modules', ['id' => $module->id]);
});
