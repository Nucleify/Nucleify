<?php

use App\Http\Controllers\Entities\ActivityController;
use App\Services\ActivityService;
use Database\Factories\ActivityFactory;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ActivityController::class, ['articleService' => app()->make(ActivityService::class)]);
});

it('runs index method successfully', function () {
    $response = $this->controller->index();

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs show method successfully', function () {
    $activity = ActivityFactory::new()->create();

    $response = $this->controller->show($activity->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs delete method successfully', function () {
    $activity = ActivityFactory::new()->create();

    $response = $this->controller->destroy($activity->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('activity_log', ['id' => $activity->id]);
});
