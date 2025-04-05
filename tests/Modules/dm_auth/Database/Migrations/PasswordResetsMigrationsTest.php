<?php

use Illuminate\Support\Facades\Schema;

it('can create password_resets table', function () {
    $this->artisan('migrate');

    expect(Schema::hasTable('password_resets'))->toBeTrue()
        ->and(Schema::hasColumns('password_resets', [
            'email', 'token', 'created_at'
        ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('password_resets'))->toBeFalse();
});
