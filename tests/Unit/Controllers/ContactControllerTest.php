<?php

use App\Models\Contact;
use App\Http\Controllers\ContactController;
use App\Http\Requests\ContactRequest;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;

beforeEach(function () {
    $this->controller = app()->makeWith(ContactController::class, ['contactService' => app()->make(ContactService::class)]);
});

it('index method', function () {
    Contact::factory()->count(3)->create();

    $response = $this->controller->index();

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toHaveCount(3);
});

it('show method', function () {
    $contact = Contact::factory()->create();

    $response = $this->controller->show($contact->id);

    expect($response->getStatusCode())->toEqual(200);
});

$data['contact_groups'] = ['Friends'];
it('store method', function () {
    $request = Mockery::mock(ContactRequest::class);
    $request->shouldReceive('validated')->once()->andReturn(data);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
});

it('update method', function () {
    $contact = Contact::factory()->create();

    $request = Mockery::mock(ContactRequest::class);
    $request->shouldReceive('validated')->once()->andReturn(updatedData);

    $response = $this->controller->update($request, $contact->id);

    expect($response->getStatusCode())->toEqual(200);
});

it('delete method', function () {
    $contact = Contact::factory()->create();

    $response = $this->controller->destroy($contact->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true)['deleted'])->toBeTrue();
});
