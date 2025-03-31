<?php

use App\Models\User;

it('can create record', function () {
    $user = User::factory()->create();

    $this->assertDatabaseCount('users', 1);
    $this->assertDatabaseHas('users', ['id' => $user->id]);
});

it('can create multiple records', function () {
    $users = User::factory()->count(3)->create();

    $this->assertDatabaseCount('users', 3);
    foreach ($users as $user) {
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }
});
