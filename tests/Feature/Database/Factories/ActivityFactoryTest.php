<?php

use Database\Factories\ActivityFactory;

beforeEach(function () {
    $this->createUsers();
});

it('creates record successfully', function () {
    $activity = ActivityFactory::new()->create();

    $this->assertDatabaseCount('activity_log', 1);
    $this->assertDatabaseHas('activity_log', ['id' => $activity->id]);
});

it('creates multiple records successfully', function () {
    $activities = ActivityFactory::new()->count(3)->create();

    $this->assertDatabaseCount('activity_log', 3);
    foreach ($activities as $activity) {
        $this->assertDatabaseHas('activity_log', ['id' => $activity->id]);
    }
});

it('creates wrong record unsuccessfully', function () {
    try {
        ActivityFactory::new()->create(['causer_id' => 'causer_id']);
    } catch (Exception $e) {
        dump($e);
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
});

it('creates multiple wrong records unsuccessfully', function () {
    try {
        ActivityFactory::new()->count(2)->create(['causer_id' => 'causer_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
});
