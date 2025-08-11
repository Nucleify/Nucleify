<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-factory');

use App\Models\Contact;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $contact = Contact::factory()->create();

    $this->assertDatabaseCount('contacts', 1);
    $this->assertDatabaseHas('contacts', ['id' => $contact->id]);
});

test('can create multiple records', function (): void {
    $contacts = Contact::factory()->count(3)->create();

    $this->assertDatabaseCount('contacts', 3);
    foreach ($contacts as $contact) {
        $this->assertDatabaseHas('contacts', ['id' => $contact->id]);
    }
});

test('cant\'t create record', function (): void {
    try {
        Contact::factory()->create(['birthday' => 'invalid_date']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect date value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('cant\'t create multiple records', function (): void {
    try {
        Contact::factory()->count(2)->create(['birthday' => 'invalid_date']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect date value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
