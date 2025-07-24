<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\FileController;
use App\Models\File;
use App\Services\FileService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(FileController::class, ['fileService' => app()->make(FileService::class)]);
});

test('index > success', function (): void {
    File::factory()->count(3)->create();

    $request = new Request;

    $response = $this->controller->index($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('show > success', function (): void {
    $file = File::factory()->create();

    $response = $this->controller->show($file->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function (): void {
    $file = File::factory()->create();

    $response = $this->controller->destroy($file->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('files', ['id' => $file->id]);
});
