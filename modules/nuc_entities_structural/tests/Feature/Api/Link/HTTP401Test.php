<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('link-api-401');
uses()->group('api-401');

describe('401', function (): void {
    test('index api', apiTest(
        'GET',
        'links.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('countByCreatedLastWeek api', apiTest(
        'GET',
        'links.countByCreatedLastWeek',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('show api', apiTest(
        'SHOW',
        'links.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api with data', apiTest(
        'POST',
        'links.store',
        401,
        questionData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api empty json', apiTest(
        'POST',
        'links.store',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api with data', apiTest(
        'PUT',
        'links.update',
        401,
        questionData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api empty json', apiTest(
        'PUT',
        'links.update',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('destroy api', apiTest(
        'DELETE',
        'links.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
