<?php

use Illuminate\Support\Facades\Schema;



it('can create table', function () {
    expect(Schema::hasTable('friendship_groups'))->toBeTrue();

    expect(Schema::hasColumns('friendship_groups', [
        'id', 'friendship_id', 'friend_id', 'friend_type', 'group_id'
    ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('friendship_groups'))->toBeFalse();
});
