<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('personal-access-tokens-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('personal_access_tokens'))
        ->toBeTrue()
        ->and(Schema::hasColumns('personal_access_tokens', [
            'id',
            'tokenable_id',
            'tokenable_type',
            'name',
            'token',
            'abilities',
            'last_used_at',
            'expires_at',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('personal_access_tokens'))->toBeFalse();
});
