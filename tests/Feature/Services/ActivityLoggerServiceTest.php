<?php

use App\Models\User;
use App\Services\Utilities\Activity\LoggerService;

it('successfully logs message with attributes for all entities and methods', function () {
    $activityLogger = new LoggerService();
    $causer = new User(['name' => 'Test Name']);

    $entities = ['article', 'contact', 'money', 'user'];
    $methods = ['created', 'updated', 'deleted'];

    foreach ($entities as $entity) {
        foreach ($methods as $method) {
            $model = getModelByEntity($entity);
            $log = $activityLogger->log($causer, $entity, $entity, $method);
            $constructLogMessage = $activityLogger->constructLogMessage($causer->name, getModelByEntity($entity), $entity, $method);

            expect($log)->toBeString();
            expect($constructLogMessage)->toBeString();

            expectLogMessage($log, $model, $method, $causer, $entity);
            expectLogMessage($constructLogMessage, $model, $method, $causer, $entity);
        }
    }
});

it('successfully logs message', function () {
    $activityLogger = new LoggerService();

    $log = $activityLogger->logMessage('Example log message');

    expect($log)->toBeString();
});

it('does not render log message for unknown entity', function () {
    $activityLogger = new LoggerService();
    $causer = new User(['name' => 'Test Name']);
    $entity = 'Unknown';
    $method = 'created';

    $message = $activityLogger->constructLogMessage($causer, null, $entity, $method);

    expect($message)
        ->not()
        ->toContain($entity)
        ->not()
        ->toContain($method)
        ->not()
        ->toContain($causer->name);
});
