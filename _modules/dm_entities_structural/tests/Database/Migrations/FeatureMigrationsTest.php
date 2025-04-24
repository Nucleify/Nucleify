
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Support\Facades\Schema;

it('can create table', function (): void {
    expect(Schema::hasTable('features'))->toBeTrue()
        ->and(Schema::hasColumns('features', [
            'id',
            'icon',
            'header',
            'description',
            'category',
            'created_at',
            'updated_at',
        ]))->toBeTrue();
});

it('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('features'))->toBeFalse();
});
