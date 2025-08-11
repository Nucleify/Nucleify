<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-api-500');
uses()->group('api-500');

use App\Models\Contact;
use App\Services\ContactService;

use function Pest\Laravel\mock;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(ContactService::class);
});

describe('500', function ($contactData = contactData) {
    test('index api', function (): void {
        $this->service
            ->shouldReceive('index')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->getJson(route('contacts.index'))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('show api', function (): void {
        $this->service
            ->shouldReceive('show')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->getJson(route('contacts.show', ['id' => 1]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('store api', function (): void {
        $this->service
            ->shouldReceive('create')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->postJson(route('contacts.store'), contactData)
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('update api', function (): void {
        $this->service
            ->shouldReceive('update')
            ->with(1, Mockery::any())
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->putJson(route('contacts.update', contactData['id']), updatedContactData)
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('destroy api', function (): void {
        $model = Contact::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->deleteJson(route('contacts.destroy', ['id' => $model->id]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });
});
