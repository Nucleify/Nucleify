<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-api-200');
uses()->group('api-200');

use App\Models\User;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        $this->getJson(route('users.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        User::factory(3)->create();

        $this->getJson(route('users.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('users.store'), userData)
            ->assertOk();
    });

    test('show api', function (): void {
        $model = User::factory()->create();

        $this->getJson(route('users.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = User::factory()->create();

        $this->putJson(route('users.update', $model->id), updatedUserData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = User::factory()->create();

        $this->deleteJson(route('users.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('users', ['id' => $model->id]);
    });
});
