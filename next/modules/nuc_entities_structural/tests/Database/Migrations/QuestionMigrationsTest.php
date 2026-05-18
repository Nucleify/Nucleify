<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('question-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('questions'))
        ->toBeTrue()
        ->and(Schema::hasColumns('questions', [
            'id',
            'index',
            'content',
            'answer',
            'category',
            'on_site',
            'display',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('questions'))->toBeFalse();
});
