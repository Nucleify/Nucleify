<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Contact;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = Contact::factory()->create();
});

it('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(Contact::class);
});

describe('Instance', function (): void {
    test('can get id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get user_id', function (): void {
        expect($this->model->getUserId())
            ->toBeInt()
            ->toBe($this->model->user_id);
    });

    test('can get first_name', function (): void {
        expect($this->model->getFirstName())
            ->toBeString()
            ->toBe($this->model->first_name);
    });

    test('can get last_name', function (): void {
        expect($this->model->getLastName())
            ->toBeString()
            ->toBe($this->model->last_name);
    });

    test('can get full_name', function (): void {
        expect($this->model->getFullName())
            ->toBeString()
            ->toBe($this->model->first_name . ' ' . $this->model->last_name);
    });

    test('can get email', function (): void {
        expect($this->model->getEmail())
            ->toBeString()
            ->toBe($this->model->email);
    });

    test('can get personal_phone', function (): void {
        expect($this->model->getPersonalPhone())
            ->toBeString()
            ->toBe($this->model->personal_phone);
    });

    test('can get work_phone', function (): void {
        expect($this->model->getWorkPhone())
            ->toBeString()
            ->toBe($this->model->work_phone);
    });

    test('can get address', function (): void {
        expect($this->model->getAddress())
            ->toBeString()
            ->toBe($this->model->address);
    });

    test('can get birthday', function (): void {
        expect($this->model->getBirthday())
            ->toBeString()
            ->toBe($this->model->birthday);
    });

    test('can get role', function (): void {
        expect($this->model->getRole())
            ->toBeString()
            ->toBe($this->model->role);
    });

    test('can get created_at date', function (): void {
        expect($this->model->getCreatedAt())
            ->toBeString()
            ->toBe($this->model->created_at->toDateTimeString());
    });

    test('can get updated_at date', function (): void {
        expect($this->model->getUpdatedAt())
            ->toBeString()
            ->toBe($this->model->updated_at->toDateTimeString());
    });
});

describe('Scope', function (): void {
    test('can filter by id using scopeGetById', function (): void {
        $foundModel = Contact::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by user_id using scopeGetByUserId', function (): void {
        $foundModel = Contact::getByUserId($this->model->user_id)->first();

        expect($foundModel->user_id)->toBe($this->model->user_id);
    });

    test('can filter by first_name using scopeGetByFirstName', function (): void {
        $foundModel = Contact::getByFirstName($this->model->first_name)->first();

        expect($foundModel->first_name)->toBe($this->model->first_name);
    });

    test('can filter by last_name using scopeGetByLastName', function (): void {
        $foundModel = Contact::getByLastName($this->model->last_name)->first();

        expect($foundModel->last_name)->toBe($this->model->last_name);
    });

    test('can filter by email using scopeGetByEmail', function (): void {
        $foundModel = Contact::getByEmail($this->model->email)->first();

        expect($foundModel->email)->toBe($this->model->email);
    });

    test('can filter by personal_phone using scopeGetByPersonalPhone', function (): void {
        $foundModel = Contact::getByPersonalPhone($this->model->personal_phone)->first();

        expect($foundModel->personal_phone)->toBe($this->model->personal_phone);
    });

    test('can filter by work_phone using scopeGetByWorkPhone', function (): void {
        $foundModel = Contact::getByWorkPhone($this->model->work_phone)->first();

        expect($foundModel->work_phone)->toBe($this->model->work_phone);
    });

    test('can filter by address using scopeGetByAddress', function (): void {
        $foundModel = Contact::getByAddress($this->model->address)->first();

        expect($foundModel->address)->toBe($this->model->address);
    });

    test('can filter by birthday using scopeGetByBirthday', function (): void {
        $foundModel = Contact::getByBirthday($this->model->birthday)->first();

        expect($foundModel->birthday)->toBe($this->model->birthday);
    });

    test('can filter by role using scopeGetByRole', function (): void {
        $foundModel = Contact::getByRole($this->model->role)->first();

        expect($foundModel->role)->toBe($this->model->role);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function (): void {
        $foundModel = Contact::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function (): void {
        $foundModel = Contact::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
