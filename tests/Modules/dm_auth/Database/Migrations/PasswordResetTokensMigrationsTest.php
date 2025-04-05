<?php

use Illuminate\Support\Facades\Schema;

it('can create password_reset_tokens table', function () {
    $this->artisan('migrate');

    expect(Schema::hasTable('password_reset_tokens'))->toBeTrue()
        ->and(Schema::hasColumns('password_reset_tokens', [
            'email', 'token', 'created_at'
        ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('password_reset_tokens'))->toBeFalse();
});
