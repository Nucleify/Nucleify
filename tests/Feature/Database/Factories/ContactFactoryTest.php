<?php

use App\Models\Contact;

beforeEach(function () {
    $this->createUsers();
});

it('creates record successfully', function () {
    $contact = Contact::factory()->create();

    $this->assertDatabaseCount('contacts', 1);
    $this->assertDatabaseHas('contacts', ['id' => $contact->id]);
});

it('creates multiple records successfully', function () {
    $contacts = Contact::factory()->count(3)->create();

    $this->assertDatabaseCount('contacts', 3);
    foreach ($contacts as $contact) {
        $this->assertDatabaseHas('contacts', ['id' => $contact->id]);
    }
});

it('creates wrong record unsuccessfully', function () {
    try {
        Contact::factory()->create(['birthday' => 'invalid_date']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect date value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
});

it('creates multiple wrong records unsuccessfully', function () {
    try {
        Contact::factory()->count(2)->create(['birthday' => 'invalid_date']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect date value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
});
