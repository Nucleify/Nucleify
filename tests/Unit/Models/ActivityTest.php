<?php

use Spatie\Activitylog\Models\Activity;
use Database\Factories\ActivityFactory;

beforeEach(function () {
    $this->createUsers();
});

it('can be created', function () {
    $activity = ActivityFactory::new()->create();

    expect($activity)->toBeInstanceOf(Activity::class);
});

