<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('activity-api-401');
uses()->group('api-401');

describe('401', function (): void {
    test('index api', apiTest(
        'GET',
        'activity-log.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('countByCreatedLastWeek api', apiTest(
        'GET',
        'activity-log.countByCreatedLastWeek',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('show api', apiTest(
        'SHOW',
        'activity-log.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('destroy api', apiTest(
        'DELETE',
        'activity-log.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
