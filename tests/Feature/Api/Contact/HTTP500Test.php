<?php

use function Pest\Laravel\mock;

use App\Models\Contact;
use App\Services\ContactService;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(ContactService::class);
});

describe('500 > Internal Server Error', function($contactData = contactData)  {
    test('index api', function () {
        $this->service
            ->shouldReceive('getAll')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('contacts.index'));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('show api', function () {
        $this->service
            ->shouldReceive('getById')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('contacts.show', ['id' => 1]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('store api', function () {
        $this->service
            ->shouldReceive('create')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->postJson(route('contacts.store'), contactData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('update api', function () {
        $this->service
            ->shouldReceive('update')
            ->with(1, Mockery::any())
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->putJson(route('contacts.update', contactData['id']), updatedContactData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('destroy api', function () {
        $contact = Contact::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->deleteJson(route('contacts.destroy', ['id' => $contact->id]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });


    /**
     *  CONTACT GROUPS TESTS
     */
    $contactData['contact_groups'] = 1;
    test('invalid contact_groups positive > integer', apiTest(
        'POST',
        'contacts.store',
        500,
        $contactData
    ));

    $contactData['contact_groups'] = -1;
    test('invalid contact_groups negative > integer', apiTest(
        'POST',
        'contacts.store',
        500,
        $contactData
    ));

    $contactData['contact_groups'] = true;
    test('invalid contact_groups > true', apiTest(
        'POST',
        'contacts.store',
        500,
        $contactData
    ));
});
