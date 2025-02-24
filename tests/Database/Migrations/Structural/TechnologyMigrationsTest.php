<?php

use Illuminate\Support\Facades\Schema;

it('can create table', function () {
    expect(Schema::hasTable('technologies'))->toBeTrue()
        ->and(Schema::hasColumns('technologies', [
            'id', 'user_id', 'href', 'src', 'label', 'description', 'category', 'display', 'created_at', 'updated_at'
        ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('technologies'))->toBeFalse();
});
