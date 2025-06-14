<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\SystemColor;

uses()->group('system-color-api-200');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
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
        $color = SystemColor::factory()->create();

        $this->getJson(route('system-colors.show', $color->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $color = SystemColor::factory()->create();

        $this->putJson(route('system-colors.update', $color->id), updatedSystemColorData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $color = SystemColor::factory()->create();

        $this->deleteJson(route('system-colors.destroy', $color->id))
            ->assertOk();
        $this->assertDatabaseMissing('system_colors', ['id' => $color->id]);
    });
});
