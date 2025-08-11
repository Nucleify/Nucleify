<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('feature-api-200');
uses()->group('api-200');

use App\Models\Feature;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
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
        $model = Feature::factory()->create();

        $this->getJson(route('features.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = Feature::factory()->create();

        $this->putJson(route('features.update', $model->id), featureData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = Feature::factory()->create();

        $this->deleteJson(route('features.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('features', ['id' => $model->id]);
    });
});
