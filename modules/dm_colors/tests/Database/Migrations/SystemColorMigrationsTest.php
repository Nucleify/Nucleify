<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('system_colors'))
        ->toBeTrue()
        ->and(Schema::hasColumns('system_colors', [
            'id',
            'name',
            'value',
            'new',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('system_colors'))->toBeFalse();
});
