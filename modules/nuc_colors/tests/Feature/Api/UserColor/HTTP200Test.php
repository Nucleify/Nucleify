<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-api-200');
uses()->group('api-200');

use App\Models\UserColor;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        UserColor::factory(3)->create();

        $this->getJson(route('user-colors.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        UserColor::factory(3)->create();

        $this->getJson(route('user-colors.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByName api', function (): void {
        UserColor::factory(3)->create(['name' => 'article']);

        $this->getJson(route('user-colors.getByName', ['name' => 'article']))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('user-colors.store'), userColorData)
            ->assertOk();
    });

    test('show api', function (): void {
        $model = UserColor::factory()->create();

        $this->getJson(route('user-colors.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = UserColor::factory()->create();

        $this->putJson(route('user-colors.update', $model->id), updatedUserColorData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = UserColor::factory()->create();

        $this->deleteJson(route('user-colors.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('user_colors', ['id' => $model->id]);
    });
});
