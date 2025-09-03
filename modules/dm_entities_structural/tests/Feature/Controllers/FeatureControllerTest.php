<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('feature-controller');

use App\Http\Controllers\FeatureController;
use App\Http\Requests\Feature\PostRequest;
use App\Http\Requests\Feature\PutRequest;
use App\Models\Feature;
use App\Services\FeatureService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(FeatureController::class, ['featureService' => app()->make(FeatureService::class)]);
});

describe('200', function (): void {
    test('index method', function (): void {
        Feature::factory()->count(3)->create();

        $request = new Request;

        $response = $this->controller->index($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('countByCreatedLastWeek method', function (): void {
        $request = new Request;

        $response = $this->controller->countByCreatedLastWeek($request);

        expect($response->getStatusCode())->toEqual(200);
    });

    test('getByCategory method', function (): void {
        $category = 'technology';
        $categories = ['other', 'science', $category];

        foreach ($categories as $cat) {
            Feature::factory()->create(['category' => $cat]);
        }

        $response = $this->controller->getByCategory($category);
        $data = $response->getData(true);

        expect($response->getStatusCode())->toEqual(200);

        foreach ($data as $model) {
            expect($model['category'])->toEqual($category);
        }

        expect(count($data))->toEqual(Feature::where('category', $category)->count());
    });

    test('show method', function (): void {
        $model = Feature::factory()->create();

        $response = $this->controller->show($model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(featureData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('update method', function (): void {
        $model = Feature::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(updatedFeatureData);

        $response = $this->controller->update($request, $model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('delete method', function (): void {
        $model = Feature::factory()->create();

        $response = $this->controller->destroy($model->id);

        expect($response->getStatusCode(), $response->getData(true)['deleted'])
            ->toEqual(200)
            ->and($this->assertDatabaseMissing('features', ['id' => $model->id]));
    });
});
