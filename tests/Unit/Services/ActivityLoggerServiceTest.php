<?php

use App\Services\ActivityLoggerService;
use App\Models\User;

it('successfully logs message with attributes for all entities and methods', function () {
    $activityLogger = new ActivityLoggerService();
    $causer = new User(['name' => 'Test Name']);

    $entities = ['Article', 'Contact', 'User'];
    $methods = ['created', 'updated', 'deleted'];

    foreach ($entities as $entity) {
        foreach ($methods as $method) {
            $model = getModelByEntity($entity);
            $log = $activityLogger->log($causer, getModelByEntity($entity), $entity, $method);
            $constructLogMessage = $activityLogger->constructLogMessage($causer, getModelByEntity($entity), $entity, $method);

            expect($log)->toBeString();
            expect($constructLogMessage)->toBeString();

            expectLogMessage($log, $model, $method, $causer, $entity);
            expectLogMessage($constructLogMessage, $model, $method, $causer, $entity);
        }
    }
});

it('successfully logs message', function () {
    $activityLogger = new ActivityLoggerService();

    $log = $activityLogger->logMessage('Example log message');

    expect($log)->toBeString();
});

it('does not render log message for unknown entity', function () {
    $activityLogger = new ActivityLoggerService();
    $causer = new User(['name' => 'Test Name']);
    $entity = 'Unknown';
    $method = 'created';

    $message = $activityLogger->constructLogMessage($causer, null, $entity, $method);

    expect($message)->not()->toContain($entity)->not()->toContain($method)->not()->toContain($causer->name);
});
