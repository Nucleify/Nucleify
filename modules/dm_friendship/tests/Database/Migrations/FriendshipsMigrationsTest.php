<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Support\Facades\Schema;

test('can create table', function (): void {
    expect(Schema::hasTable('friendships'))->toBeTrue()
        ->and(Schema::hasColumns('friendships', [
            'id', 'sender_id', 'sender_type', 'recipient_id', 'recipient_type', 'status', 'created_at', 'updated_at',
        ]))->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('friendships'))->toBeFalse();
});
