<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('card-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('cards'))
        ->toBeTrue()
        ->and(Schema::hasColumns('cards', [
            'id',
            'src',
            'title',
            'description',
            'category',
            'component',
            'display',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('cards'))->toBeFalse();
});
