<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-migrations');

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    Artisan::call('migrate');

    expect(Schema::hasTable('interactions'))->toBeTrue()
        ->and(Schema::hasColumns('interactions', [
            'id', 'user_id', 'subject_id', 'subject_type', 'relation', 'relation_value', 'relation_type', 'created_at', 'updated_at',
        ]))->toBeTrue();
});

test('can be rolled back', function (): void {
    Artisan::call('migrate');

    Artisan::call('migrate:rollback');

    expect(Schema::hasTable('interactions'))->toBeFalse();
});
