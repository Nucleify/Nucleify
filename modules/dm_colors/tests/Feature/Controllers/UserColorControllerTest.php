<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-controller');

use App\Http\Controllers\UserColorController;
use App\Http\Requests\UserColor\PostRequest;
use App\Http\Requests\UserColor\PutRequest;
use App\Models\UserColor;
use App\Services\UserColorService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(UserColorController::class, ['userColorService' => app()->make(UserColorService::class)]);
});

describe('200', function (): void {
    test('index method', function (): void {
        UserColor::factory()->count(3)->create();

        $request = new Request;

        $response = $this->controller->index($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('countByCreatedLastWeek method', function (): void {
        $request = new Request;

        $response = $this->controller->countByCreatedLastWeek($request);

        expect($response->getStatusCode())->toEqual(200);
    });

    test('getByName method', function (): void {
        $names = ['other', 'science', 'article'];

        foreach ($names as $name) {
            UserColor::factory()->create(['name' => $name]);
        }

        $response = $this->controller->getByName($name);
        $data = $response->getData(true);

        expect($response->getStatusCode())->toEqual(200);

        foreach ($data as $model) {
            expect($model['name'])->toEqual($name);
        }

        expect(count($data))->toEqual(UserColor::where('name', $name)->count());
    });

    test('show method', function (): void {
        $model = UserColor::factory()->create();

        $response = $this->controller->show($model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(userColorData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('update method', function (): void {
        $model = UserColor::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(updatedUserColorData);

        $response = $this->controller->update($request, $model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('delete method', function (): void {
        $model = UserColor::factory()->create();

        $response = $this->controller->destroy($model->id);

        expect($response->getStatusCode(), $response->getData(true)['deleted'])
            ->toEqual(200)
            ->and($this->assertDatabaseMissing('user_colors', ['id' => $model->id]));
    });
});
