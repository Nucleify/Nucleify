<?php

use App\Models\Contact;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function () {
    test('store api', function () {
        $this->postJson(route('contacts.store'), contactData)
            ->assertOk();
    });

    test('index api', function () {
        Contact::factory(3)->create();

        $this->getJson(route('contacts.index'))
            ->assertOk();
    });

    test('show api', function () {
        $contact = Contact::factory()->create();

        $this->getJson(route('contacts.show', $contact->id))
            ->assertOk();
    });

    test('update api', function () {
        $contact = Contact::factory()->create();

        $this->putJson(route('contacts.update', $contact->id), updatedContactData)
            ->assertOk();
    });

    test('destroy api', function () {
        $contact = Contact::factory()->create();

        $this->deleteJson(route('contacts.destroy', $contact->id))
            ->assertOk();
        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
    });
});
