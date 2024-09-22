<?php

use Database\Factories\ActivityFactory;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function () {
    test('index api', function () {
        ActivityFactory::new()->count(10)->create();

        $this->getJson(route('activity-log.index'))
            ->assertOk();
    });

    test('show api', function () {
        $activity = ActivityFactory::new()->create();

        $this->getJson(route('activity-log.show', $activity->id))
            ->assertOk();
    });

    test('destroy api', function () {
        $activity = ActivityFactory::new()->create();

        $this->deleteJson(route('activity-log.destroy', $activity->id))
            ->assertOk();
        $this->assertDatabaseMissing('activity_log', ['id' => $activity->id]);
    });
});
