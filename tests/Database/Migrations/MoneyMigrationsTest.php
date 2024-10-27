<?php

use Illuminate\Support\Facades\Schema;

it('can create table', function () {
    expect(Schema::hasTable('money'))->toBeTrue()
        ->and(Schema::hasColumns('money', [
            'id', 'count', 'sender_id', 'receiver_id', 'created_at', 'updated_at'
        ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('money'))->toBeFalse();
});
