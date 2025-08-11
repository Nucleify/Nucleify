<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('technology-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('technologies'))
        ->toBeTrue()
        ->and(Schema::hasColumns('technologies', [
            'id',
            'label',
            'description',
            'href',
            'src',
            'category',
            'display',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('technologies'))->toBeFalse();
});
