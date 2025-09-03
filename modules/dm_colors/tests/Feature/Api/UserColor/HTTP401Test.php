<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-api-401');
uses()->group('api-401');

describe('401', function (): void {
    test('index api', apiTest(
        'GET',
        'user-colors.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('countByCreatedLastWeek api', apiTest(
        'GET',
        'user-colors.countByCreatedLastWeek',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('show api', apiTest(
        'SHOW',
        'user-colors.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api with data', apiTest(
        'POST',
        'user-colors.store',
        401,
        technologyData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api empty json', apiTest(
        'POST',
        'user-colors.store',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api with data', apiTest(
        'PUT',
        'user-colors.update',
        401,
        colorData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api empty json', apiTest(
        'PUT',
        'user-colors.update',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('destroy api', apiTest(
        'DELETE',
        'user-colors.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
