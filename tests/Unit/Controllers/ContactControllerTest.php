<?php

use App\Http\Controllers\ContactController;
use App\Http\Requests\Contact\PostRequest;
use App\Http\Requests\Contact\PutRequest;
use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Http\Request;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ContactController::class, ['contactService' => app()->make(ContactService::class)]);
});

it('runs index method successfully', function () {
    Contact::factory()->count(3)->create();

    $request = new Request();

    $response = $this->controller->index($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs show method successfully', function () {
    $contact = Contact::factory()->create();

    $response = $this->controller->show($contact->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs store method successfully', function () {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')->once()->andReturn(data);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs update method successfully', function () {
    $contact = Contact::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')->andReturn(updatedData);

    $response = $this->controller->update($request, $contact->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs delete method successfully', function () {
    $contact = Contact::factory()->create();

    $response = $this->controller->destroy($contact->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true)['deleted'])->toBeTrue();
});
