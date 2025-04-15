<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Support\Facades\Schema;

it('can create table', function (): void {
    expect(Schema::hasTable('cards'))->toBeTrue()
        ->and(Schema::hasColumns('cards', [
            'id',
            'src',
            'title',
            'description',
            'category',
            'component',
            'display',
            'created_at',
            'updated_at',
        ]))->toBeTrue();
});

it('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('cards'))->toBeFalse();
});
