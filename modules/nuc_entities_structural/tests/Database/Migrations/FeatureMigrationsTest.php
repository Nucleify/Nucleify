
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('feature-migrations');

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('features'))
        ->toBeTrue()
        ->and(Schema::hasColumns('features', [
            'id',
            'icon',
            'header',
            'description',
            'category',
            'created_at',
            'updated_at',
        ]))
        ->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('features'))->toBeFalse();
});
