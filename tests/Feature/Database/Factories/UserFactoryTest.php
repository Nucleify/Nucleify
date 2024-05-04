<?php

use App\Models\User;

it('creates record successfully', function () {
    $user = User::factory()->create();

    $this->assertDatabaseCount('users', 1);
    $this->assertDatabaseHas('users', ['id' => $user->id]);
});

it('creates multiple records successfully', function () {
    $users = User::factory()->count(3)->create();

    $this->assertDatabaseCount('users', 3);
    foreach ($users as $user) {
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }
});
