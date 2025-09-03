<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('activity-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('activity_log'))
        ->toBeTrue()
        ->and(Schema::hasColumns('activity_log', [
            'id',
            'log_name',
            'description',
            'subject_type',
            'event',
            'subject_id',
            'causer_type',
            'causer_id',
            'properties',
            'batch_uuid',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('activity_log'))->toBeFalse();
});
