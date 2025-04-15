<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Contact;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
    test('index api', function (): void {
        Contact::factory(3)->create();

        $this->getJson(route('contacts.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Contact::factory(3)->create();

        $this->getJson(route('contacts.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('contacts.store'), contactData)
            ->assertOk();
    });

    test('show api', function (): void {
        $contact = Contact::factory()->create();

        $this->getJson(route('contacts.show', $contact->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $contact = Contact::factory()->create();

        $this->putJson(route('contacts.update', $contact->id), updatedContactData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $contact = Contact::factory()->create();

        $this->deleteJson(route('contacts.destroy', $contact->id))
            ->assertOk();
        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
    });
});
