<?php

use App\Traits\Getters\UserGetterTrait;

beforeEach(function (): void {
    $this->createUsers();

    $this->trait = new class
    {
        use UserGetterTrait;
    };
});

describe('UserGetterTrait', function (): void {
    test('getCauser returns authenticated user', function (): void {
        $this->actingAs($this->admin);

        expect($this->trait->getCauser())->toBe(auth()->user())
            ->and($this->trait->getCauser()->id)->toBe($this->admin->id);
    });

    test('getCauser returns null if not authenticated', function (): void {
        auth()->logout();

        expect($this->trait->getCauser())->toBeNull();
    });

    test('isCauserStaff returns true for staff user', function (): void {
        $causer = $this->admin;

        expect($this->trait->isCauserStaff($causer))->toBeTrue();
    });

    test('isCauserStaff returns false for non-staff user', function (): void {
        $causer = $this->user;

        expect($this->trait->isCauserStaff($causer))->toBeFalse();
    });
});
