<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('password-resets-migrations');

use Illuminate\Support\Facades\Schema;

test('can create password_resets table', function (): void {
    $this->artisan('migrate');

    expect(Schema::hasTable('password_resets'))
        ->toBeTrue()
        ->and(Schema::hasColumns('password_resets', [
            'email',
            'token',
            'created_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('password_resets'))->toBeFalse();
});
