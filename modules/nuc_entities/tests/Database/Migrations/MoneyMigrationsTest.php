<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('money-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('money'))
        ->toBeTrue()
        ->and(Schema::hasColumns('money', [
            'id',
            'user_id',
            'sender',
            'receiver',
            'count',
            'title',
            'description',
            'category',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('money'))->toBeFalse();
});
