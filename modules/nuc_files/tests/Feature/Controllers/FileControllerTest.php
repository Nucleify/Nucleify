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

describe('200', function (): void {
    test('index method', function (): void {
        File::factory()->count(3)->create();

        $request = new Request;

        $response = $this->controller->index($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('show method', function (): void {
        $model = File::factory()->create();

        $response = $this->controller->show($model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('delete method', function (): void {
        $model = File::factory()->create();

        $response = $this->controller->destroy($model->id);

        expect($response->getStatusCode(), $response->getData(true)['deleted'])
            ->toEqual(200)
            ->and($this->assertDatabaseMissing('files', ['id' => $model->id]));
    });
});
