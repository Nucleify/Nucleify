<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('documentation-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {

    expect(Schema::hasTable('documentation'))
        ->toBeTrue()
        ->and(Schema::hasColumns('documentation', [
            'id',
            'name',
            'category',
            'version',
            'file',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('documentation'))->toBeFalse();
});
