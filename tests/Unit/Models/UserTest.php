<?php

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;


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

it('can get isAdmin', function () {
    $user = User::factory()->create(['role' => 'admin']);

    expect($user->isAdmin())->toBeTrue();
});
