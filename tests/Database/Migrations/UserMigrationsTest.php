<?php

use Illuminate\Support\Facades\Schema;

it('can create table', function () {
    expect(Schema::hasTable('users'))->toBeTrue();

    expect(Schema::hasColumns('users', [
        'id', 'name', 'email', 'password', 'role', 'created_at', 'updated_at'
    ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('users'))->toBeFalse();
});
