<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-controller');

use App\Http\Controllers\ContactController;
use App\Http\Requests\Contact\PostRequest;
use App\Http\Requests\Contact\PutRequest;
use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ContactController::class, ['contactService' => app()->make(ContactService::class)]);
});

describe('200', function (): void {
    test('index method', function (): void {
        Contact::factory()->count(3)->create();

        $request = new Request;

        $response = $this->controller->index($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('countByCreatedLastWeek method', function (): void {
        $request = new Request;

        $response = $this->controller->countByCreatedLastWeek($request);

        expect($response->getStatusCode())->toEqual(200);
    });

    test('show method', function (): void {
        $model = Contact::factory()->create();

        $response = $this->controller->show($model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')->once()->andReturn(contactData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('update method', function (): void {
        $model = Contact::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')->andReturn(updatedContactData);

        $response = $this->controller->update($request, $model->id);

        expect($response->getStatusCode(), $response->getData(true))->toEqual(200);
    });

    test('delete method', function (): void {
        $model = Contact::factory()->create();

        $response = $this->controller->destroy($model->id);

        expect($response->getStatusCode(), $response->getData(true)['deleted'])
            ->toEqual(200)
            ->and($this->assertDatabaseMissing('contacts', ['id' => $model->id]));
    });
});
