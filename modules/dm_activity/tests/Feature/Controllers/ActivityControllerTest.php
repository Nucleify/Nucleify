<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('activity-controller');

use App\Http\Controllers\ActivityController;
use App\Services\ActivityService;
use Database\Factories\ActivityFactory;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ActivityController::class, ['articleService' => app()->make(ActivityService::class)]);
});

describe('200', function (): void {
    test('index method', function (): void {
        $response = $this->controller->index();

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('countByCreatedLastWeek method', function (): void {
        $request = new Request;

        $response = $this->controller->countByCreatedLastWeek($request);

        expect($response->getStatusCode())->toEqual(200);
    });

    test('show method', function (): void {
        $activity = ActivityFactory::new()->create();

        $response = $this->controller->show($activity->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('delete method', function (): void {
        $activity = ActivityFactory::new()->create();

        $response = $this->controller->destroy($activity->id);

        expect($response->getStatusCode())->toEqual(200);
        $this->assertDatabaseMissing('activity_log', ['id' => $activity->id]);
    });
});
