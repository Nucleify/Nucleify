<?php

if (!defined('PEST_RUNNING')) {
    return;
}

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

test('index > success', function (): void {
    Contact::factory()->count(3)->create();

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

test('show > success', function (): void {
    $contact = Contact::factory()->create();

    $response = $this->controller->show($contact->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function (): void {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')->once()->andReturn(contactData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function (): void {
    $contact = Contact::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')->andReturn(updatedContactData);

    $response = $this->controller->update($request, $contact->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function (): void {
    $contact = Contact::factory()->create();

    $response = $this->controller->destroy($contact->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true)['deleted'])->toBeTrue();
});
