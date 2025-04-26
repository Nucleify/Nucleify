<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Database\Factories\ActivityFactory;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
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
        $activity = ActivityFactory::new()->create();

        $this->getJson(route('activity-log.show', $activity->id))
            ->assertOk();
    });

    test('destroy api', function (): void {
        $activity = ActivityFactory::new()->create();

        $this->deleteJson(route('activity-log.destroy', $activity->id))
            ->assertOk();
        $this->assertDatabaseMissing('activity_log', ['id' => $activity->id]);
    });
});
