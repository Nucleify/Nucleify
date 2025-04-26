<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Support\Facades\Schema;

it('can create table', function (): void {
    expect(Schema::hasTable('friendship_groups'))->toBeTrue()
        ->and(Schema::hasColumns('friendship_groups', [
            'id', 'friendship_id', 'friend_id', 'friend_type', 'group_id',
        ]))->toBeTrue();
});

it('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('friendship_groups'))->toBeFalse();
});
