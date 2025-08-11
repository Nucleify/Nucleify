<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-model');

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = User::factory()->create();
});

test('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(User::class);
});

describe('Instance', function (): void {
    test('can have many contacts', function (): void {
        $contacts = $this->model->contacts();

        expect($contacts)->toBeInstanceOf(HasMany::class);
    });

    test('can create contact from user details', function (): void {
        $this->model->createContactFromUserDetails();

        $contactsCount = $this->model->contacts()->count();
        expect($contactsCount)->toBe(1);

        $contact = $this->model->contacts()->first();
        expect($contact->first_name)->toBe($this->model->getName())
            ->and($contact->email)->toBe($this->model->getEmail())
            ->and($contact->role)->toBe($this->model->getRole());
    });

    test('can get id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get name', function (): void {
        expect($this->model->getName())
            ->toBeString()
            ->toBe($this->model->name);
    });

    test('can get email', function (): void {
        expect($this->model->getEmail())
            ->toBeString()
            ->toBe($this->model->email);
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

    test('can check if user is a user', function (): void {
        $model = User::factory()->create(['role' => 'user']);

        expect($model->isUser())->toBeTrue();
    });

    test('can check if user is tech', function (): void {
        $model = User::factory()->create(['role' => 'tech']);

        expect($model->isTech())->toBeTrue();
    });

    test('can check if user is test admin', function (): void {
        $model = User::factory()->create(['role' => 'test_admin']);

        expect($model->isTestAdmin())->toBeTrue();
    });

    test('can check if user is admin', function (): void {
        $model = User::factory()->create(['role' => 'admin']);

        expect($model->isAdmin())->toBeTrue();
    });

    test('can check if user is super admin', function (): void {
        $model = User::factory()->create(['role' => 'super_admin']);

        expect($model->isSuperAdmin())->toBeTrue();
    });
});

describe('Scope', function (): void {
    test('can filter users by id using scopeGetById', function (): void {
        $foundModel = User::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter users by name using scopeGetByName', function (): void {
        $foundModel = User::getByName($this->model->name)->first();

        expect($foundModel->name)->toBe($this->model->name);
    });

    test('can filter users by email using scopeGetByEmail', function (): void {
        $foundModel = User::getByEmail($this->model->email)->first();

        expect($foundModel->email)->toBe($this->model->email);
    });

    test('can filter users by role using scopeGetByRole', function (): void {
        $foundModel = User::getByRole($this->model->role)->first();

        expect($foundModel->role)->toBe($this->model->role);
    });

    test('can filter users by user role using scopeGetByUserRole', function (): void {
        User::factory()->create(['role' => 'user']);
        User::factory()->create(['role' => 'admin']);

        $foundModel = User::getByUserRole()->first();

        expect($foundModel->role)->toBe('user');
    });

    test('can filter users by tech role using scopeGetByTechRole', function (): void {
        User::factory()->create(['role' => 'tech']);
        User::factory()->create(['role' => 'admin']);

        $foundModel = User::getByTechRole()->first();

        expect($foundModel->role)->toBe('tech');
    });

    test('can filter users by test admin role using scopeGetByTestAdminRole', function (): void {
        User::factory()->create(['role' => 'test_admin']);
        User::factory()->create(['role' => 'admin']);

        $foundModel = User::getByTestAdminRole()->first();

        expect($foundModel->role)->toBe('test_admin');
    });

    test('can filter users by admin role using scopeGetByAdminRole', function (): void {
        User::factory()->create(['role' => 'admin']);
        User::factory()->create(['role' => 'user']);

        $foundModel = User::getByAdminRole()->first();

        expect($foundModel->role)->toBe('admin');
    });

    test('can filter users by super admin role using scopeGetBySuperAdminRole', function (): void {
        User::factory()->create(['role' => 'super_admin']);
        User::factory()->create(['role' => 'user']);

        $foundModel = User::getBySuperAdminRole()->first();

        expect($foundModel->role)->toBe('super_admin');
    });
});
