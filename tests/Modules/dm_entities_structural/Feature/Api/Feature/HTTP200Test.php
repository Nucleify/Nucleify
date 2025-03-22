<?php

use App\Models\Feature;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function () {
    test('index api', function () {
        Feature::factory(3)->create();

        $this->getJson(route('features.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function () {
        Feature::factory(3)->create();

        $this->getJson(route('features.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByCategory api', function () {
        Feature::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('features.getByCategory', ['category' => 'technology']))
            ->assertOk();
    });


    test('store api', function () {
        $this->postJson(route('features.store'), featureData)
            ->assertOk();
    });

    test('show api', function () {
        $feature = Feature::factory()->create();

        $this->getJson(route('features.show', $feature->id))
            ->assertOk();
    });

    test('update api', function () {
        $feature = Feature::factory()->create();

        $this->putJson(route('features.update', $feature->id), featureData)
            ->assertOk();
    });

    test('destroy api', function () {
        $feature = Feature::factory()->create();

        $this->deleteJson(route('features.destroy', $feature->id))
            ->assertOk();
        $this->assertDatabaseMissing('features', ['id' => $feature->id]);
    });
});
