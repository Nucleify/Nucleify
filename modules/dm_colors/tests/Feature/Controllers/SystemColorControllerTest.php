<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-controller');

use App\Http\Controllers\SystemColorController;
use App\Http\Requests\SystemColor\PostRequest;
use App\Http\Requests\SystemColor\PutRequest;
use App\Models\SystemColor;
use App\Services\SystemColorService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(SystemColorController::class, ['systemColorService' => app()->make(SystemColorService::class)]);
});

describe('200', function (): void {
    test('index method', function (): void {
        SystemColor::factory()->count(3)->create();

        $request = new Request;

        $response = $this->controller->index($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('countByCreatedLastWeek method', function (): void {
        $request = new Request;

        $response = $this->controller->countByCreatedLastWeek($request);

        expect($response->getStatusCode())->toEqual(200);
    });

    test('getByName method', function (): void {
        $names = ['other', 'science', 'article'];

        foreach ($names as $name) {
            SystemColor::factory()->create(['name' => $name]);
        }

        $response = $this->controller->getByName($name);
        $data = $response->getData(true);

        expect($response->getStatusCode())->toEqual(200);

        foreach ($data as $userColor) {
            expect($userColor['name'])->toEqual($name);
        }

        expect(count($data))->toEqual(SystemColor::where('name', $name)->count());
    });

    test('show method', function (): void {
        $color = SystemColor::factory()->create();

        $response = $this->controller->show($color->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(systemColorData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('update method', function (): void {
        $color = SystemColor::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(updatedSystemColorData);

        $response = $this->controller->update($request, $color->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('delete method', function (): void {
        $color = SystemColor::factory()->create();

        $response = $this->controller->destroy($color->id);

        expect($response->getStatusCode())->toEqual(200);
        $this->assertDatabaseMissing('system_colors', ['id' => $color->id]);
    });
});
