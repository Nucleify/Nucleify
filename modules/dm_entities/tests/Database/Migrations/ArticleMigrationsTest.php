<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Support\Facades\Schema;

it('can create table', function (): void {
    expect(Schema::hasTable('articles'))->toBeTrue()
        ->and(Schema::hasColumns('articles', [
            'id',
            'user_id',
            'title',
            'description',
            'category',
            'created_at',
            'updated_at',
        ]))->toBeTrue();
});

it('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('articles'))->toBeFalse();
});
