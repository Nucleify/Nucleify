<?php

use Illuminate\Support\Facades\Schema;


it('can create table', function () {
    expect(Schema::hasTable('friendships'))->toBeTrue();

    expect(Schema::hasColumns('friendships', [
        'id', 'sender_id', 'sender_type', 'recipient_id', 'recipient_type', 'status', 'created_at', 'updated_at'
    ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('friendships'))->toBeFalse();
});
