<?php

use App\Http\Controllers\Structural\LinkController;
use App\Http\Requests\Structural\Link\PostRequest;
use App\Http\Requests\Structural\Link\PutRequest;

use App\Models\Structural\Link;
use App\Services\Structural\LinkService;
use Illuminate\Http\Request;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(LinkController::class, ['linkService' => app()->make(LinkService::class)]);
});

test('index > success', function () {
    Link::factory()->count(3)->create();

    $request = new Request();
    $response = $this->controller->index($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('getByCategory > success', function () {
    $category = 'technology';
    $categories = ['other', 'science', $category];

    foreach ($categories as $cat) {
        Link::factory()->create(['category' => $cat]);
    }

    $response = $this->controller->getByCategory($category);
    $data = $response->getData(true);

    expect($response->getStatusCode())->toEqual(200);

    foreach ($data as $link) {
        expect($link['category'])->toEqual($category);
    }

    expect(count($data))->toEqual(Link::where('category', $category)->count());
});

test('show > success', function () {
    $link = Link::factory()->create();

    $response = $this->controller->show($link->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function () {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(linkData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function () {
    $link = Link::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(linkData);

    $response = $this->controller->update($request, $link->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function () {
    $link = Link::factory()->create();

    $response = $this->controller->destroy($link->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('links', ['id' => $link->id]);
});
