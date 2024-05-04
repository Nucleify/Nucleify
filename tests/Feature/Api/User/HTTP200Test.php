<?php

use App\Models\User;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function () {
    test('authorized store api', function () {
        $this->postJson(route('users.store'), userData)
            ->assertOk();
    });

    test('authorized index api', function () {
        $this->getJson(route('users.index'))
            ->assertOk();
    });

    test('authorized show api', function () {
        $user = User::factory()->create();

        $this->getJson(route('users.show', $user->id))
            ->assertOk();
    });

    test('authorized update api', function () {
        $user = User::factory()->create();

        $this->putJson(route('users.update', $user->id), updatedUserData)
            ->assertOk();
    });

    test('authorized destroy api', function () {
        $user = User::factory()->create();

        $this->deleteJson(route('users.destroy', $user->id))
            ->assertOk();
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    });
});
