<?php

use App\Models\User;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function () {
    test('store api', function () {
        $this->postJson(route('users.store'), userData)
            ->assertOk();
    });

    test('index api', function () {
        $this->getJson(route('users.index'))
            ->assertOk();
    });

    test('show api', function () {
        $user = User::factory()->create();

        $this->getJson(route('users.show', $user->id))
            ->assertOk();
    });

    test('update api', function () {
        $user = User::factory()->create();

        $this->putJson(route('users.update', $user->id), updatedUserData)
            ->assertOk();
    });

    test('destroy api', function () {
        $user = User::factory()->create();

        $this->deleteJson(route('users.destroy', $user->id))
            ->assertOk();
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    });
});
