<?php

use App\Models\Structural\Color;

uses()->group('color-api-200');

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function () {
    test('index api', function () {
        Color::factory(3)->create();

        $this->getJson(route('colors.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function () {
        Color::factory(3)->create();

        $this->getJson(route('colors.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByEntity api', function () {
        Color::factory(3)->create(['entity' => 'article']);

        $this->getJson(route('colors.getByEntity', ['entity' => 'article']))
            ->assertOk();
    });

    test('getSiteColors api', function () {
        Color::factory(3)->create(['entity' => 'article']);

        $this->getJson(route('colors.getSiteColors', ['site' => 'article']))
            ->assertOk();
    });

    test('store api', function () {
        $this->postJson(route('colors.store'), colorData)
            ->assertOk();
    });

    test('show api', function () {
        $color = Color::factory()->create();

        $this->getJson(route('colors.show', $color->id))
            ->assertOk();
    });

    test('update api', function () {
        $color = Color::factory()->create();

        $this->putJson(route('colors.update', $color->id), updatedColorData)
            ->assertOk();
    });

    test('destroy api', function () {
        $color = Color::factory()->create();

        $this->deleteJson(route('colors.destroy', $color->id))
            ->assertOk();
        $this->assertDatabaseMissing('colors', ['id' => $color->id]);
    });
});
