<?php

use App\Traits\Getters\UserGetterTrait;

beforeEach(function () {
    $this->createUsers();

    $this->trait = new class
    {
        use UserGetterTrait;
    };
});

describe('UserGetterTrait', function () {
    test('getCauser returns authenticated user', function () {
        $this->actingAs($this->admin);

        expect($this->trait->getCauser())->toBe(auth()->user())
            ->and($this->trait->getCauser()->id)->toBe($this->admin->id);
    });

    test('getCauser returns null if not authenticated', function () {
        auth()->logout();

        expect($this->trait->getCauser())->toBeNull();
    });

    test('isCauserStaff returns true for staff user', function () {
        $causer = $this->admin;

        expect($this->trait->isCauserStaff($causer))->toBeTrue();
    });

    test('isCauserStaff returns false for non-staff user', function () {
        $causer = $this->user;

        expect($this->trait->isCauserStaff($causer))->toBeFalse();
    });
});
