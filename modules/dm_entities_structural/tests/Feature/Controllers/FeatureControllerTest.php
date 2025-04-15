<?php

if (!defined('PEST_RUNNING')) {
    return;
}

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

test('index > success', function (): void {
    Feature::factory()->count(3)->create();

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

test('getByCategory > success', function (): void {
    $category = 'technology';
    $categories = ['other', 'science', $category];

    foreach ($categories as $cat) {
        Feature::factory()->create(['category' => $cat]);
    }

    $response = $this->controller->getByCategory($category);
    $data = $response->getData(true);

    expect($response->getStatusCode())->toEqual(200);

    foreach ($data as $feature) {
        expect($feature['category'])->toEqual($category);
    }

    expect(count($data))->toEqual(Feature::where('category', $category)->count());
});

test('show > success', function (): void {
    $feature = Feature::factory()->create();

    $response = $this->controller->show($feature->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function (): void {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(featureData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function (): void {
    $feature = Feature::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedFeatureData);

    $response = $this->controller->update($request, $feature->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function (): void {
    $feature = Feature::factory()->create();

    $response = $this->controller->destroy($feature->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('features', ['id' => $feature->id]);
});
