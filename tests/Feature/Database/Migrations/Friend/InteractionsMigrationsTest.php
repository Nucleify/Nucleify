<?php
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;


it('can create table', function () {
    Artisan::call('migrate');

    expect(Schema::hasTable('interactions'))->toBeTrue();

    expect(Schema::hasColumns('interactions', [
        'id', 'user_id', 'subject_id', 'subject_type', 'relation', 'relation_value', 'relation_type', 'created_at', 'updated_at'
    ]))->toBeTrue();
});

it('can be rolled back', function () {
    Artisan::call('migrate');

    Artisan::call('migrate:rollback', ['--step' => 1]);

    expect(Schema::hasTable('interactions'))->toBeFalse();
});
