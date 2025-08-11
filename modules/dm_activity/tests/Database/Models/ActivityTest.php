<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('activity-model');

use Database\Factories\ActivityFactory;
use Spatie\Activitylog\Models\Activity;

beforeEach(function (): void {
    $this->createUsers();
});

test('can be created', function (): void {
    $model = ActivityFactory::new()->create();

    expect($model)->toBeInstanceOf(Activity::class);
});
