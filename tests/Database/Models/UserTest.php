<?php

use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

beforeEach(function () {
    $this->createUsers();
});


describe('Instance', function () {
    test('can be created', function () {
        $user = User::factory()->create();

        expect($user)->toBeInstanceOf(User::class);
    });

    test('can have many contacts', function () {
        $user = User::factory()->create();
        $contacts = $user->contacts();

        expect($contacts)->toBeInstanceOf(HasMany::class);
    });

    test('can create contact from user details', function () {
        $user = User::factory()->create();

        $user->createContactFromUserDetails();

        $contactsCount = $user->contacts()->count();
        expect($contactsCount)->toBe(1);

        $contact = $user->contacts()->first();
        expect($contact->first_name)->toBe($user->getName())
            ->and($contact->email)->toBe($user->getEmail())
            ->and($contact->role)->toBe($user->getRole());
    });

    test('can get id', function () {
        $user = User::factory()->create();

        expect($user->getId())
            ->toBeInt()
            ->toBe($user->id);
    });

    test('can get name', function () {
        $user = User::factory()->create();

        expect($user->getName())
            ->toBeString()
            ->toBe($user->name);
    });

    test('can get email', function () {
        $user = User::factory()->create();

        expect($user->getEmail())
            ->toBeString()
            ->toBe($user->email);
    });

    test('can get role', function () {
        $user = User::factory()->create();

        expect($user->getRole())
            ->toBeString()
            ->toBe($user->role);
    });

    test('can get created_at date', function () {
        $user = User::factory()->create();

        expect($user->getCreatedAt())
            ->toBeString()
            ->toBe($user->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $user = User::factory()->create();

        expect($user->getUpdatedAt())
            ->toBeString()
            ->toBe($user->updated_at->toDateTimeString());
    });

    test('can check if user is a user', function () {
        $user = User::factory()->create(['role' => 'user']);
        expect($user->isUser())->toBeTrue();
    });

    test('can check if user is tech', function () {
        $user = User::factory()->create(['role' => 'tech']);
        expect($user->isTech())->toBeTrue();
    });

    test('can check if user is test admin', function () {
        $user = User::factory()->create(['role' => 'test_admin']);
        expect($user->isTestAdmin())->toBeTrue();
    });

    test('can check if user is admin', function () {
        $user = User::factory()->create(['role' => 'admin']);
        expect($user->isAdmin())->toBeTrue();
    });

    test('can check if user is super admin', function () {
        $user = User::factory()->create(['role' => 'super_admin']);
        expect($user->isSuperAdmin())->toBeTrue();
    });
});

describe('Scope', function () {
    test('can filter users by id using scopeGetById', function () {
        $user = User::factory()->create();

        $foundUser = User::getById($user->id)->first();

        expect($foundUser->id)->toBe($user->id);
    });

    test('can filter users by name using scopeGetByName', function () {
        $user = User::factory()->create();

        $foundUser = User::getByName($user->name)->first();

        expect($foundUser->name)->toBe($user->name);
    });

    test('can filter users by email using scopeGetByEmail', function () {
        $user = User::factory()->create();

        $foundUser = User::getByEmail($user->email)->first();

        expect($foundUser->email)->toBe($user->email);
    });

    test('can filter users by role using scopeGetByRole', function () {
        $user = User::factory()->create();

        $foundUser = User::getByRole($user->role)->first();

        expect($foundUser->role)->toBe($user->role);
    });

    test('can filter users by user role using scopeGetByUserRole', function () {
        User::factory()->create(['role' => 'user']);
        User::factory()->create(['role' => 'admin']);

        $users = User::getByUserRole()->get();

        expect($users->first()->role)->toBe('user');
    });

    test('can filter users by tech role using scopeGetByTechRole', function () {
        User::factory()->create(['role' => 'tech']);
        User::factory()->create(['role' => 'admin']);

        $users = User::getByTechRole()->get();

        expect($users->first()->role)->toBe('tech');
    });

    test('can filter users by test admin role using scopeGetByTestAdminRole', function () {
        User::factory()->create(['role' => 'test_admin']);
        User::factory()->create(['role' => 'admin']);

        $users = User::getByTestAdminRole()->get();

        expect($users->first()->role)->toBe('test_admin');
    });

    test('can filter users by admin role using scopeGetByAdminRole', function () {
        User::factory()->create(['role' => 'admin']);
        User::factory()->create(['role' => 'user']);

        $users = User::getByAdminRole()->get();

        expect($users->first()->role)->toBe('admin');
    });

    test('can filter users by super admin role using scopeGetBySuperAdminRole', function () {
        User::factory()->create(['role' => 'super_admin']);
        User::factory()->create(['role' => 'user']);

        $users = User::getBySuperAdminRole()->get();

        expect($users->first()->role)->toBe('super_admin');
    });
});
