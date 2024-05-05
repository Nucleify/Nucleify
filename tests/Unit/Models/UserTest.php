<?php

use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\User;

it('can be created', function () {
    $user = User::factory()->create();

    expect($user)->toBeInstanceOf(User::class);
});

it('can have many contacts', function () {
    $user = User::factory()->create();
    $contacts = $user->contacts();

    expect($contacts)->toBeInstanceOf(HasMany::class);
});

it('can create contact from user details', function () {
    $user = User::factory()->create(['role' => 'user']);

    $user->createContactFromUserDetails();

    $contactsCount = $user->contacts()->count();
    expect($contactsCount)->toBe(1);
});

it('can get isUser', function () {
    $user = User::factory()->create(['role' => 'user']);

    expect($user->isUser())->toBeTrue();
});

it('can get isTech', function () {
    $user = User::factory()->create(['role' => 'tech']);

    expect($user->isTech())->toBeTrue();
});

it('can get isTestAdmin', function () {
    $user = User::factory()->create(['role' => 'test_admin']);

    expect($user->isTestAdmin())->toBeTrue();
});

it('can get isAdmin', function () {
    $user = User::factory()->create(['role' => 'admin']);

    expect($user->isAdmin())->toBeTrue();
});

it('can get isSuperAdmin', function () {
    $user = User::factory()->create(['role' => 'super_admin']);

    expect($user->isSuperAdmin())->toBeTrue();
});
