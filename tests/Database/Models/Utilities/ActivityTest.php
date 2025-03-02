<?php

use Database\Factories\Utilities\ActivityFactory;
use Spatie\Activitylog\Models\Activity;

beforeEach(function () {
    $this->createUsers();
});

it('can be created', function () {
    $activity = ActivityFactory::new()->create();

    expect($activity)->toBeInstanceOf(Activity::class);
});
