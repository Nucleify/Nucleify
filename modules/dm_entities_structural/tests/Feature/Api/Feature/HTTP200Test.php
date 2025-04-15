<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Feature;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
    test('index api', function (): void {
        Feature::factory(3)->create();

        $this->getJson(route('features.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Feature::factory(3)->create();

        $this->getJson(route('features.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByCategory api', function (): void {
        Feature::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('features.getByCategory', ['category' => 'technology']))
            ->assertOk();
    });

    test('getSiteFeatures api', function (): void {
        Feature::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('features.getSiteFeatures', ['site' => 'technology']))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('features.store'), featureData)
            ->assertOk();
    });

    test('show api', function (): void {
        $feature = Feature::factory()->create();

        $this->getJson(route('features.show', $feature->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $feature = Feature::factory()->create();

        $this->putJson(route('features.update', $feature->id), featureData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $feature = Feature::factory()->create();

        $this->deleteJson(route('features.destroy', $feature->id))
            ->assertOk();
        $this->assertDatabaseMissing('features', ['id' => $feature->id]);
    });
});
