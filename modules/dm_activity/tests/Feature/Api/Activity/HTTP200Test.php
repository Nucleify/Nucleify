<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('activity-api-200');
uses()->group('api-200');

use Database\Factories\ActivityFactory;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        ActivityFactory::new()->count(10)->create();

        $this->getJson(route('activity-log.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        ActivityFactory::new()->count(10)->create();

        $this->getJson(route('activity-log.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('show api', function (): void {
        $model = ActivityFactory::new()->create();

        $this->getJson(route('activity-log.show', $model->id))
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = ActivityFactory::new()->create();

        $this->deleteJson(route('activity-log.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('activity_log', ['id' => $model->id]);
    });
});
