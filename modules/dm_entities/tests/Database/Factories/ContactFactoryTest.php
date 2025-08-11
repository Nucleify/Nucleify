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
    $model = Contact::factory()->create();

    $this->assertDatabaseCount('contacts', 1)
        ->assertDatabaseHas('contacts', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Contact::factory()->count(3)->create();

    $this->assertDatabaseCount('contacts', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('contacts', ['id' => $model->id]);
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
