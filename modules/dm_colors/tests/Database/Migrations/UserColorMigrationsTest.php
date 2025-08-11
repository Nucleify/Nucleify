<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('user_colors'))
        ->toBeTrue()
        ->and(Schema::hasColumns('user_colors', [
            'id',
            'user_id',
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

    expect(Schema::hasTable('user_colors'))->toBeFalse();
});
