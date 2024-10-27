<?php

use App\Models\Contact;

beforeEach(function () {
    $this->createUsers();
});

it('can be created', function () {
    $contact = Contact::factory()->create();

    expect($contact)->toBeInstanceOf(Contact::class);
});

describe('Instance', function () {
    test('can get id', function () {
        $contact = Contact::factory()->create();

        expect($contact->getId())
            ->toBeInt()
            ->toBe($contact->id);
    });

    test('can get user id', function () {
        $contact = Contact::factory()->create();

        expect($contact->getUserId())
            ->toBeInt()
            ->toBe($contact->user_id);
    });

    test('can get first name', function () {
        $contact = Contact::factory()->create();

        expect($contact->getFirstName())
            ->toBeString()
            ->toBe($contact->first_name);
    });

    test('can get last name', function () {
        $contact = Contact::factory()->create();

        expect($contact->getLastName())
            ->toBeString()
            ->toBe($contact->last_name);
    });

    test('can get full name', function () {
        $contact = Contact::factory()->create();

        expect($contact->getFullName())
            ->toBeString()
            ->toBe($contact->first_name . ' ' . $contact->last_name);
    });

    test('can get email', function () {
        $contact = Contact::factory()->create();

        expect($contact->getEmail())
            ->toBeString()
            ->toBe($contact->email);
    });

    test('can get personal phone', function () {
        $contact = Contact::factory()->create();

        expect($contact->getPersonalPhone())
            ->toBeString()
            ->toBe($contact->personal_phone);
    });

    test('can get work phone', function () {
        $contact = Contact::factory()->create();

        expect($contact->getWorkPhone())
            ->toBeString()
            ->toBe($contact->work_phone);
    });

    test('can get address', function () {
        $contact = Contact::factory()->create();

        expect($contact->getAddress())
            ->toBeString()
            ->toBe($contact->address);
    });

    test('can get birthday', function () {
        $contact = Contact::factory()->create();

        expect($contact->getBirthday())
            ->toBeString()
            ->toBe($contact->birthday);
    });

    test('can get role', function () {
        $contact = Contact::factory()->create();

        expect($contact->getRole())
            ->toBeString()
            ->toBe($contact->role);
    });

    test('can get created_at date', function () {
        $contact = Contact::factory()->create();

        expect($contact->getCreatedAt())
            ->toBeString()
            ->toBe($contact->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $contact = Contact::factory()->create();

        expect($contact->getUpdatedAt())
            ->toBeString()
            ->toBe($contact->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by user id using scopeGetByUserId', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByUserId($contact->user_id)->first();

        expect($foundContact->user_id)->toBe($contact->user_id);
    });

    test('can filter by first name using scopeGetByFirstName', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByFirstName($contact->first_name)->first();

        expect($foundContact->first_name)->toBe($contact->first_name);
    });

    test('can filter by last name using scopeGetByLastName', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByLastName($contact->last_name)->first();

        expect($foundContact->last_name)->toBe($contact->last_name);
    });

    test('can filter by email using scopeGetByEmail', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByEmail($contact->email)->first();

        expect($foundContact->email)->toBe($contact->email);
    });

    test('can filter by personal phone using scopeGetByPersonalPhone', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByPersonalPhone($contact->personal_phone)->first();

        expect($foundContact->personal_phone)->toBe($contact->personal_phone);
    });

    test('can filter by work phone using scopeGetByWorkPhone', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByWorkPhone($contact->work_phone)->first();

        expect($foundContact->work_phone)->toBe($contact->work_phone);
    });

    test('can filter by address using scopeGetByAddress', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByAddress($contact->address)->first();

        expect($foundContact->address)->toBe($contact->address);
    });

    test('can filter by birthday using scopeGetByBirthday', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByBirthday($contact->birthday)->first();

        expect($foundContact->birthday)->toBe($contact->birthday);
    });

    test('can filter by role using scopeGetByRole', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByRole($contact->role)->first();

        expect($foundContact->role)->toBe($contact->role);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByCreatedAt($contact->created_at->toDateString())->first();

        expect($foundContact->created_at->toDateString())->toBe($contact->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByUpdatedAt($contact->updated_at->toDateString())->first();

        expect($foundContact->updated_at->toDateString())->toBe($contact->updated_at->toDateString());
    });
});
