<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('activity-service');

use App\Models\User;
use App\Services\LoggerService;

test('can successfully log message with attributes for all entities and methods', function (): void {
    $activityLogger = new LoggerService;
    $causer = new User(['name' => 'Test Name']);

    $entities = ['article', 'contact', 'money', 'user'];
    $methods = ['created', 'updated', 'deleted'];

    foreach ($entities as $entity) {
        foreach ($methods as $method) {
            $model = getModelByEntity($entity);
            $log = $activityLogger->log($causer, $entity, $entity, $method);
            $constructLogMessage = $activityLogger->constructLogMessage($causer->name, getModelByEntity($entity), $entity, $method);

            expect($log, $constructLogMessage)->toBeString();

            expectLogMessage($log, $model, $method, $causer, $entity);
            expectLogMessage($constructLogMessage, $model, $method, $causer, $entity);
        }
    }
});

test('can successfully log message', function (): void {
    $activityLogger = new LoggerService;

    $log = $activityLogger->logMessage('Example log message');

    expect($log)->toBeString();
});

test('can\'t render log message for unknown entity', function (): void {
    $activityLogger = new LoggerService;
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
