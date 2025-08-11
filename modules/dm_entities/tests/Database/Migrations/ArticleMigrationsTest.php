<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('article-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('articles'))
        ->toBeTrue()
        ->and(Schema::hasColumns('articles', [
            'id',
            'user_id',
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

    expect(Schema::hasTable('articles'))->toBeFalse();
});
