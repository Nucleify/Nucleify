<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('documentation-api-200');
uses()->group('api-200');

use App\Models\Documentation;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        Documentation::factory(3)->create();

        $this->getJson(route('documentation.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Documentation::factory(3)->create();

        $this->getJson(route('documentation.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('documentation.store'), documentationData)
            ->assertOk();
    });

    test('show api', function (): void {
        $model = Documentation::factory()->create();

        $this->getJson(route('documentation.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = Documentation::factory()->create();

        $this->putJson(route('documentation.update', $model->id), updatedDocumentationData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = Documentation::factory()->create();

        $this->deleteJson(route('documentation.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('documentation', ['id' => $model->id]);
    });
});
