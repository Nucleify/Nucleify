<?php

use App\Models\Contact;

beforeEach(function () {
    $this->createUsers();
});

it('can create record', function () {
    $contact = Contact::factory()->create();

    $this->assertDatabaseCount('contacts', 1);
    $this->assertDatabaseHas('contacts', ['id' => $contact->id]);
});

it('can create multiple records', function () {
    $contacts = Contact::factory()->count(3)->create();

    $this->assertDatabaseCount('contacts', 3);
    foreach ($contacts as $contact) {
        $this->assertDatabaseHas('contacts', ['id' => $contact->id]);
    }
});

it('cant\'t create record', function () {
    try {
        Contact::factory()->create(['birthday' => 'invalid_date']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect date value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it('cant\'t create multiple records', function () {
    try {
        Contact::factory()->count(2)->create(['birthday' => 'invalid_date']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect date value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
