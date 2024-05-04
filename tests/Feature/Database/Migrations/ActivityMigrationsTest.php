<?php

use Illuminate\Support\Facades\Schema;

it('can create table', function () {
    expect(Schema::hasTable('activity_log'))->toBeTrue();

    expect(Schema::hasColumns('activity_log', [
        'id', 'log_name', 'description', 'subject_type', 'event', 'subject_id', 'causer_type',
        'causer_id', 'properties', 'batch_uuid', 'created_at', 'updated_at'
    ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('activity_log'))->toBeFalse();
});
