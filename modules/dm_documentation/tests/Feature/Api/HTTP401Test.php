<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('documentation-api-401');
uses()->group('api-401');

describe('401', function (): void {
    test('index api', apiTest(
        'GET',
        'documentation.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('countByCreatedLastWeek api', apiTest(
        'GET',
        'documentation.countByCreatedLastWeek',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('show api', apiTest(
        'SHOW',
        'documentation.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api with data', apiTest(
        'POST',
        'documentation.store',
        401,
        documentationData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api empty json', apiTest(
        'POST',
        'documentation.store',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api with data', apiTest(
        'PUT',
        'documentation.update',
        401,
        documentationData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api empty json', apiTest(
        'PUT',
        'documentation.update',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('destroy api', apiTest(
        'DELETE',
        'documentation.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
