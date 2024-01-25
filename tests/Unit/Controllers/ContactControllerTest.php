<?php

use App\Http\Requests\PutContactRequest;
use App\Models\Contact;
use App\Http\Controllers\ContactController;
use App\Http\Requests\PostContactRequest;
use App\Services\ContactService;

beforeEach(function () {
    $this->controller = app()->makeWith(ContactController::class, ['contactService' => app()->make(ContactService::class)]);
});

it('runs index method successfully', function () {
    Contact::factory()->count(3)->create();

    $response = $this->controller->index();

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toHaveCount(3);
});

it('runs show method successfully', function () {
    $contact = Contact::factory()->create();

    $response = $this->controller->show($contact->id);

    expect($response->getStatusCode())->toEqual(200);
});

it('runs store method successfully', function () {
    $request = Mockery::mock(PostContactRequest::class);
    $request->shouldReceive('validated')->once()->andReturn(data);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
});

it('runs update method successfully', function () {
    $contact = Contact::factory()->create();

    $request = Mockery::mock(PutContactRequest::class);
    $request->shouldReceive('validated')->once()->andReturn(updatedData);

    $response = $this->controller->update($request, $contact->id);

    expect($response->getStatusCode())->toEqual(200);
});

it('runs delete method successfully', function () {
    $contact = Contact::factory()->create();

    $response = $this->controller->destroy($contact->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true)['deleted'])->toBeTrue();
});
