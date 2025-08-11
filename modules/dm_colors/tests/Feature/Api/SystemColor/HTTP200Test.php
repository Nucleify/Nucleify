<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-200');
uses()->group('api-200');

use App\Models\SystemColor;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        SystemColor::factory(3)->create();

        $this->getJson(route('system-colors.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        SystemColor::factory(3)->create();

        $this->getJson(route('system-colors.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByName api', function (): void {
        SystemColor::factory(3)->create(['name' => 'article']);

        $this->getJson(route('system-colors.getByName', ['name' => 'article']))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('system-colors.store'), systemColorData)
            ->assertOk();
    });

    test('show api', function (): void {
        $model = SystemColor::factory()->create();

        $this->getJson(route('system-colors.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = SystemColor::factory()->create();

        $this->putJson(route('system-colors.update', $model->id), updatedSystemColorData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = SystemColor::factory()->create();

        $this->deleteJson(route('system-colors.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('system_colors', ['id' => $model->id]);
    });
});
