<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('modules'))
        ->toBeTrue()
        ->and(Schema::hasColumns('modules', [
            'id',
            'name',
            'description',
            'category',
            'version',
            'enabled',
            'installed',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('modules'))->toBeFalse();
});
