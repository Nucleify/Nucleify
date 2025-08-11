<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('files'))
        ->toBeTrue()
        ->and(Schema::hasColumns('files', [
            'id',
            'user_id',
            'path',
            'mime_type',
            'size',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('files'))->toBeFalse();
});
