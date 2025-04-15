<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Technology;

uses()->group('technology-api-200');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
    test('index api', function (): void {
        Technology::factory(3)->create();

        $this->getJson(route('technologies.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Technology::factory(3)->create();

        $this->getJson(route('technologies.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByCategory api', function (): void {
        Technology::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('technologies.getByCategory', ['category' => 'technology']))
            ->assertOk();
    });

    test('getSiteTechnologies api', function (): void {
        Technology::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('technologies.getSiteTechnologies', ['site' => 'technology']))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('technologies.store'), technologyData)
            ->assertOk();
    });

    test('show api', function (): void {
        $technology = Technology::factory()->create();

        $this->getJson(route('technologies.show', $technology->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $technology = Technology::factory()->create();

        $this->putJson(route('technologies.update', $technology->id), updatedTechnologyData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $technology = Technology::factory()->create();

        $this->deleteJson(route('technologies.destroy', $technology->id))
            ->assertOk();
        $this->assertDatabaseMissing('technologies', ['id' => $technology->id]);
    });
});
