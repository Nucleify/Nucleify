<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('password-reset-tokens-migrations');

use Illuminate\Support\Facades\Schema;

test('can create password_reset_tokens table', function (): void {
    $this->artisan('migrate');

    expect(Schema::hasTable('password_reset_tokens'))
        ->toBeTrue()
        ->and(Schema::hasColumns('password_reset_tokens', [
            'email',
            'token',
            'created_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('password_reset_tokens'))->toBeFalse();
});
