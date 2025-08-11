<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-api-200');
uses()->group('api-200');

use App\Models\Contact;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
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
        $model = Contact::factory()->create();

        $this->getJson(route('contacts.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = Contact::factory()->create();

        $this->putJson(route('contacts.update', $model->id), updatedContactData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = Contact::factory()->create();

        $this->deleteJson(route('contacts.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('contacts', ['id' => $model->id]);
    });
});
