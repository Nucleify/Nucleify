<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('contacts'))
        ->toBeTrue()
        ->and(Schema::hasColumns('contacts', [
            'id',
            'first_name',
            'last_name',
            'email',
            'personal_phone',
            'work_phone',
            'address',
            'birthday',
            'contact_groups',
            'role',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('contacts'))->toBeFalse();
});
