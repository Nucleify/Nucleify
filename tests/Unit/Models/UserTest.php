<?php

use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

beforeEach(function () {
    $this->name = 'Name';
    $this->email = 'example@example.com';
    $this->userRole = 'user';
    $this->techRole = 'tech';
    $this->testAdminRole = 'test_admin';
    $this->adminRole = 'admin';
    $this->superAdminRole = 'super_admin';
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
        $user = User::factory()->create(['role' => $this->userRole]);

        $user->createContactFromUserDetails();

        $contactsCount = $user->contacts()->count();
        expect($contactsCount)->toBe(1);

        $contact = $user->contacts()->first();
        expect($contact->first_name)->toBe($user->getName())
            ->and($contact->email)->toBe($user->getEmail())
            ->and($contact->role)->toBe($user->getRole());
    });

    test('can get ID', function () {
        $user = User::factory()->create();

        expect($user->getId())->toBeInt()
            ->and($user->getId())->toBe($user->id);
    });

    test('can get name', function () {
        $user = User::factory()->create(['name' => $this->name]);

        expect($user->getName())->toBeString()
            ->and($user->getName())->toBe($this->name);
    });

    test('can get email', function () {
        $user = User::factory()->create(['email' => $this->email]);

        expect($user->getEmail())->toBeString()
            ->and($user->getEmail())->toBe($this->email);
    });

    test('can get role', function () {
        $user = User::factory()->create(['role' => $this->userRole]);

        expect($user->getRole())->toBeString()
            ->and($user->getRole())->toBe($this->userRole);
    });

    test('can get created_at date', function () {
        $user = User::factory()->create();

        expect($user->getCreatedAt())->toBeString()
            ->and($user->getCreatedAt())->toBe($user->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $user = User::factory()->create();

        expect($user->getUpdatedAt())->toBeString()
            ->and($user->getUpdatedAt())->toBe($user->updated_at->toDateTimeString());
    });

    test('can check if user is a user', function () {
        $user = User::factory()->create(['role' => $this->userRole]);
        expect($user->isUser())->toBeTrue();
    });

    test('can check if user is tech', function () {
        $user = User::factory()->create(['role' => $this->techRole]);
        expect($user->isTech())->toBeTrue();
    });

    test('can check if user is test admin', function () {
        $user = User::factory()->create(['role' => $this->testAdminRole]);
        expect($user->isTestAdmin())->toBeTrue();
    });

    test('can check if user is admin', function () {
        $user = User::factory()->create(['role' => $this->adminRole]);
        expect($user->isAdmin())->toBeTrue();
    });

    test('can check if user is super admin', function () {
        $user = User::factory()->create(['role' => $this->superAdminRole]);
        expect($user->isSuperAdmin())->toBeTrue();
    });
});

describe('Scope', function () {
    test('can filter users by id using scopeGetById', function () {
        $user = User::factory()->create();

        $foundUser = User::getById($user->id)->first();

        expect($foundUser)->not->toBeNull()
            ->and($foundUser->id)->toBe($user->id);
    });

    test('can filter users by name using scopeGetByName', function () {
        User::factory()->create(['name' => $this->name]);

        $foundUser = User::getByName($this->name)->first();

        expect($foundUser)->not->toBeNull()
            ->and($foundUser->name)->toBe($this->name);
    });

    test('can filter users by email using scopeGetByEmail', function () {
        User::factory()->create(['email' => $this->email]);

        $foundUser = User::getByEmail($this->email)->first();

        expect($foundUser)->not->toBeNull()
            ->and($foundUser->email)->toBe($this->email);
    });

    test('can filter users by role using scopeGetByRole', function () {
        User::factory()->create(['role' => $this->userRole]);

        $foundUser = User::getByRole($this->userRole)->first();

        expect($foundUser)->not->toBeNull()
            ->and($foundUser->role)->toBe($this->userRole);
    });

    test('can filter users by user role using scopeGetByUserRole', function () {
        User::factory()->create(['role' => $this->userRole]);
        User::factory()->create(['role' => $this->adminRole]);

        $users = User::getByUserRole()->get();

        expect($users)->toHaveCount(1)
            ->and($users->first()->role)->toBe($this->userRole);
    });

    test('can filter users by tech role using scopeGetByTechRole', function () {
        User::factory()->create(['role' => $this->techRole]);
        User::factory()->create(['role' => $this->adminRole]);

        $users = User::getByTechRole()->get();

        expect($users)->toHaveCount(1)
            ->and($users->first()->role)->toBe($this->techRole);
    });

    test('can filter users by test admin role using scopeGetByTestAdminRole', function () {
        User::factory()->create(['role' => $this->testAdminRole]);
        User::factory()->create(['role' => $this->adminRole]);

        $users = User::getByTestAdminRole()->get();

        expect($users)->toHaveCount(1)
            ->and($users->first()->role)->toBe($this->testAdminRole);
    });

    test('can filter users by admin role using scopeGetByAdminRole', function () {
        User::factory()->create(['role' => $this->adminRole]);
        User::factory()->create(['role' => $this->userRole]);

        $users = User::getByAdminRole()->get();

        expect($users)->toHaveCount(1)
            ->and($users->first()->role)->toBe($this->adminRole);
    });

    test('can filter users by super admin role using scopeGetBySuperAdminRole', function () {
        User::factory()->create(['role' => $this->superAdminRole]);
        User::factory()->create(['role' => $this->userRole]);

        $users = User::getBySuperAdminRole()->get();

        expect($users)->toHaveCount(1)
            ->and($users->first()->role)->toBe($this->superAdminRole);
    });
});
