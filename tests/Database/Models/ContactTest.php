<?php

use App\Models\Contact;

beforeEach(function () {
    $this->createUsers();
    $this->firstName = 'FirstName';
    $this->lastName = 'SecondName';
    $this->email = 'example@example.com';
    $this->personalPhone = '1234567890';
    $this->workPhone = '1234567890';
    $this->address = '123 Example St';
    $this->birthday = '2022-04-10';
    $this->role = 'user';
});

it('can be created', function () {
    $contact = Contact::factory()->create();

    expect($contact)->toBeInstanceOf(Contact::class);
});

describe('Instance', function () {
    test('can get id', function () {
        $contact = Contact::factory()->create();

        expect($contact->getId())->toBeInt()
            ->and($contact->getId())->toBe($contact->id);
    });

    test('can get user id', function () {
        $userId = 1;
        $contact = Contact::factory()->create(['user_id' => $userId]);

        expect($contact->getUserId())->toBeInt()
            ->and($contact->getUserId())->toBe($userId);
    });

    test('can get first name', function () {
        $contact = Contact::factory()->create(['first_name' => $this->firstName]);

        expect($contact->getFirstName())->toBeString()
            ->and($contact->getFirstName())->toBe($this->firstName);
    });

    test('can get last name', function () {
        $contact = Contact::factory()->create(['last_name' => $this->lastName]);

        expect($contact->getLastName())->toBeString()
            ->and($contact->getLastName())->toBe($this->lastName);
    });

    test('can get full name', function () {
        $contact = Contact::factory()->create(['first_name' => $this->firstName, 'last_name' => $this->lastName]);

        expect($contact->getFullName())->toBeString()
            ->and($contact->getFullName())->toBe($this->firstName . ' ' . $this->lastName);
    });

    test('can get email', function () {
        $contact = Contact::factory()->create(['email' => $this->email]);

        expect($contact->getEmail())->toBeString()
            ->and($contact->getEmail())->toBe($this->email);
    });

    test('can get personal phone', function () {
        $contact = Contact::factory()->create(['personal_phone' => $this->personalPhone]);

        expect($contact->getPersonalPhone())->toBeString()
            ->and($contact->getPersonalPhone())->toBe($this->personalPhone);
    });

    test('can get work phone', function () {
        $contact = Contact::factory()->create(['work_phone' => $this->workPhone]);

        expect($contact->getWorkPhone())->toBeString()
            ->and($contact->getWorkPhone())->toBe($this->workPhone);
    });

    test('can get address', function () {
        $contact = Contact::factory()->create(['address' => $this->address]);

        expect($contact->getAddress())->toBeString()
            ->and($contact->getAddress())->toBe($this->address);
    });

    test('can get birthday', function () {
        $contact = Contact::factory()->create(['birthday' => $this->birthday]);

        expect($contact->getBirthday())->toBeString()
            ->and($contact->getBirthday())->toBe($this->birthday);
    });

    test('can get role', function () {
        $contact = Contact::factory()->create(['role' => $this->role]);

        expect($contact->getRole())->toBeString()
            ->and($contact->getRole())->toBe($this->role);
    });

    test('can get created_at date', function () {
        $contact = Contact::factory()->create();

        expect($contact->getCreatedAt())->toBeString()
            ->and($contact->getCreatedAt())->toBe($contact->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $contact = Contact::factory()->create();

        expect($contact->getUpdatedAt())->toBeString()
            ->and($contact->getUpdatedAt())->toBe($contact->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by user id using scopeGetByUserId', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByUserId($contact->user_id)->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->user_id)->toBe($contact->user_id);
    });

    test('can filter by first name using scopeGetByFirstName', function () {
        Contact::factory()->create(['first_name' => $this->firstName]);

        $foundContact = Contact::getByFirstName($this->firstName)->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->first_name)->toBe($this->firstName);
    });

    test('can filter by last name using scopeGetByLastName', function () {
        Contact::factory()->create(['last_name' => $this->lastName]);

        $foundContact = Contact::getByLastName($this->lastName)->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->last_name)->toBe($this->lastName);
    });

    test('can filter by email using scopeGetByEmail', function () {
        Contact::factory()->create(['email' => $this->email]);

        $foundContact = Contact::getByEmail($this->email)->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->email)->toBe($this->email);
    });

    test('can filter by personal phone using scopeGetByPersonalPhone', function () {
        Contact::factory()->create(['personal_phone' => $this->personalPhone]);

        $foundContact = Contact::getByPersonalPhone($this->personalPhone)->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->personal_phone)->toBe($this->personalPhone);
    });

    test('can filter by work phone using scopeGetByWorkPhone', function () {
        Contact::factory()->create(['work_phone' => $this->workPhone]);

        $foundContact = Contact::getByWorkPhone($this->workPhone)->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->work_phone)->toBe($this->workPhone);
    });

    test('can filter by address using scopeGetByAddress', function () {
        Contact::factory()->create(['address' => $this->address]);

        $foundContact = Contact::getByAddress($this->address)->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->address)->toBe($this->address);
    });

    test('can filter by birthday using scopeGetByBirthday', function () {
        Contact::factory()->create(['birthday' => $this->birthday]);

        $foundContact = Contact::getByBirthday($this->birthday)->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->birthday)->toBe($this->birthday);
    });

    test('can filter by role using scopeGetByRole', function () {
        Contact::factory()->create(['role' => $this->role]);

        $foundContact = Contact::getByRole($this->role)->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->role)->toBe($this->role);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByCreatedAt($contact->created_at->toDateString())->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->created_at->toDateString())->toBe($contact->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function () {
        $contact = Contact::factory()->create();

        $foundContact = Contact::getByUpdatedAt($contact->updated_at->toDateString())->first();

        expect($foundContact)->not->toBeNull()
            ->and($foundContact->updated_at->toDateString())->toBe($contact->updated_at->toDateString());
    });
});
