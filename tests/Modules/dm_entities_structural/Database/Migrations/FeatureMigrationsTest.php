
<?php

use Illuminate\Support\Facades\Schema;

it('can create table', function () {
    expect(Schema::hasTable('features'))->toBeTrue()
        ->and(Schema::hasColumns('features', [
            'id',
            'header',
            'description',
            'category',
            'created_at',
            'updated_at'
        ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('features'))->toBeFalse();
});
