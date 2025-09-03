<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('link-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('links'))
        ->toBeTrue()
        ->and(Schema::hasColumns('links', [
            'id',
            'download',
            'href',
            'src',
            'icon',
            'category',
            'hreflang',
            'media',
            'ping',
            'referrerpolicy',
            'rel',
            'target',
            'type',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('links'))->toBeFalse();
});
