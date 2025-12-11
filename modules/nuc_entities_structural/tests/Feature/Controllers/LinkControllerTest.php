<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('link-controller');

use App\Http\Controllers\LinkController;
use App\Http\Requests\Link\PostRequest;
use App\Http\Requests\Link\PutRequest;
use App\Models\Link;
use App\Services\LinkService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(LinkController::class, ['linkService' => app()->make(LinkService::class)]);
});

describe('200', function (): void {
    test('index method', function (): void {
        Link::factory()->count(3)->create();

        $request = new Request;
        $response = $this->controller->index($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('getByCategory method', function (): void {
        $category = 'technology';
        $categories = ['other', 'science', $category];

        foreach ($categories as $cat) {
            Link::factory()->create(['category' => $cat]);
        }

        $response = $this->controller->getByCategory($category);
        $data = $response->getData(true);

        expect($response->getStatusCode())->toEqual(200);

        foreach ($data as $model) {
            expect($model['category'])->toEqual($category);
        }

        expect(count($data))->toEqual(Link::where('category', $category)->count());
    });

    test('show method', function (): void {
        $model = Link::factory()->create();

        $response = $this->controller->show($model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(linkData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('update method', function (): void {
        $model = Link::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(linkData);

        $response = $this->controller->update($request, $model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('delete method', function (): void {
        $model = Link::factory()->create();

        $response = $this->controller->destroy($model->id);

        expect($response->getStatusCode(), $response->getData(true)['deleted'])
            ->toEqual(200)
            ->and($this->assertDatabaseMissing('links', ['id' => $model->id]));
    });
});
