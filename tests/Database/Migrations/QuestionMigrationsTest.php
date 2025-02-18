<?php

use Illuminate\Support\Facades\Schema;

it('can create table', function () {
    expect(Schema::hasTable('questions'))->toBeTrue()
        ->and(Schema::hasColumns('questions', [
            'id', 'user_id', 'index', 'content', 'answer', 'category', 'on_site', 'display', 'created_at', 'updated_at'
        ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('questions'))->toBeFalse();
});
