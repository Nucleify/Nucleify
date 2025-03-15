<?php

use Illuminate\Support\Facades\Schema;

it('can create table', function () {
    expect(Schema::hasTable('colors'))->toBeTrue()
        ->and(Schema::hasColumns('colors', [
            'id', 'user_id', 'entity', 'value', 'new', 'created_at', 'updated_at'
        ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('colors'))->toBeFalse();
});
