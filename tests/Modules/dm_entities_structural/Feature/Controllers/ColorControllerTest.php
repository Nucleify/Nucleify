<?php

use App\Http\Controllers\ColorController;
use App\Http\Requests\Color\PostRequest;
use App\Http\Requests\Color\PutRequest;
use App\Models\Color;
use App\Services\ColorService;
use Illuminate\Http\Request;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ColorController::class, ['colorService' => app()->make(ColorService::class)]);
});

test('index > success', function () {
    Color::factory()->count(3)->create();

    $request = new Request();

    $response = $this->controller->index($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('countByCreatedLastWeek > success', function () {
    $request = new Request();

    $response = $this->controller->countByCreatedLastWeek($request);

    expect($response->getStatusCode())->toEqual(200);
});

test('getByEntity > success', function () {
    $entity = 'article';
    $entities = ['other', 'science', $entity];

    foreach ($entities as $ent) {
        Color::factory()->create(['entity' => $ent]);
    }

    $response = $this->controller->getByEntity($entity);
    $data = $response->getData(true);

    expect($response->getStatusCode())->toEqual(200);

    foreach ($data as $color) {
        expect($color['entity'])->toEqual($entity);
    }

    expect(count($data))->toEqual(Color::where('entity', $entity)->count());
});

test('getSiteColors > success', function () {
    $entity = 'article';
    $entities = ['other', 'science', $entity];

    foreach ($entities as $ent) {
        Color::factory()->create(['entity' => $ent]);
    }

    $response = $this->controller->getSiteColors($entity);
    $data = $response->getData(true);

    expect($response->getStatusCode())->toEqual(200);

    foreach ($data as $color) {
        expect($color['entity'])->toEqual($entity);
    }

    expect(count($data))->toEqual(Color::where('entity', $entity)->count());
});

test('show > success', function () {
    $color = Color::factory()->create();

    $response = $this->controller->show($color->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function () {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(colorData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function () {
    $color = Color::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedColorData);

    $response = $this->controller->update($request, $color->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function () {
    $color = Color::factory()->create();

    $response = $this->controller->destroy($color->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('colors', ['id' => $color->id]);
});
