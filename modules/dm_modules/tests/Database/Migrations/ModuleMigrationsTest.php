<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Support\Facades\Schema;

it('can create table', function (): void {
    expect(Schema::hasTable('modules'))
        ->toBeTrue()
        ->and(Schema::hasColumns('modules', [
            'id',
            'name',
            'description',
            'category',
            'version',
            'enabled',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

it('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('modules'))->toBeFalse();
});
