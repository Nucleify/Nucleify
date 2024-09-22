<?php

use Illuminate\Support\Facades\Schema;

it('can create table', function () {
    expect(Schema::hasTable('contacts'))->toBeTrue()
        ->and(Schema::hasColumns('contacts', [
            'id', 'first_name', 'last_name', 'email', 'personal_phone', 'work_phone',
            'address', 'birthday', 'contact_groups', 'role', 'created_at', 'updated_at'
        ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('contacts'))->toBeFalse();
});
