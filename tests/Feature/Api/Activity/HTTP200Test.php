<?php

use Database\Factories\ActivityFactory;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function () {
    test('authorized index api', function () {
        ActivityFactory::new()->count(10)->create();

        $this->getJson(route('activity-log.index'))
            ->assertOk();
    });

    test('authorized show api', function () {
        $activity = ActivityFactory::new()->create();

        $this->getJson(route('activity-log.show', $activity->id))
            ->assertOk();
    });


    test('authorized destroy api', function () {
        $activity = ActivityFactory::new()->create();

        $this->deleteJson(route('activity-log.destroy', $activity->id))
            ->assertOk();
        $this->assertDatabaseMissing('activity_log', ['id' => $activity->id]);
    });
});
