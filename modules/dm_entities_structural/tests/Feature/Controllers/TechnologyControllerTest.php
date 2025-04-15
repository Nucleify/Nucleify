<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\TechnologyController;
use App\Http\Requests\Technology\PostRequest;
use App\Http\Requests\Technology\PutRequest;
use App\Models\Technology;
use App\Services\TechnologyService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(TechnologyController::class, ['technologyService' => app()->make(TechnologyService::class)]);
});

test('index > success', function (): void {
    Technology::factory()->count(3)->create();

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
        Technology::factory()->create(['category' => $cat]);
    }

    $response = $this->controller->getByCategory($category);
    $data = $response->getData(true);

    expect($response->getStatusCode())->toEqual(200);

    foreach ($data as $technology) {
        expect($technology['category'])->toEqual($category);
    }

    expect(count($data))->toEqual(Technology::where('category', $category)->count());
});

test('getSiteTechnologies > success', function (): void {
    $category = 'technology';
    $categories = ['other', 'science', $category];

    foreach ($categories as $cat) {
        Technology::factory()->create(['category' => $cat]);
    }

    $response = $this->controller->getSiteTechnologies($category);
    $data = $response->getData(true);

    expect($response->getStatusCode())->toEqual(200);

    foreach ($data as $technology) {
        expect($technology['category'])->toEqual($category);
    }

    expect(count($data))->toEqual(Technology::where('category', $category)->count());
});

test('show > success', function (): void {
    $technology = Technology::factory()->create();

    $response = $this->controller->show($technology->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function (): void {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(technologyData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function (): void {
    $technology = Technology::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedTechnologyData);

    $response = $this->controller->update($request, $technology->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function (): void {
    $technology = Technology::factory()->create();

    $response = $this->controller->destroy($technology->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('technologies', ['id' => $technology->id]);
});
