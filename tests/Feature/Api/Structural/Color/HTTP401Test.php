<?php

uses()->group('colors-api-302');

describe('401 > Unauthorized', function () {
    test('index api', apiTest(
        'GET',
        'colors.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('countByCreatedLastWeek api', apiTest(
        'GET',
        'colors.countByCreatedLastWeek',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('show api', apiTest(
        'SHOW',
        'colors.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api with data', apiTest(
        'POST',
        'colors.store',
        401,
        technologyData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api empty json', apiTest(
        'POST',
        'colors.store',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api with data', apiTest(
        'PUT',
        'colors.update',
        401,
        colorData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api empty json', apiTest(
        'PUT',
        'colors.update',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('destroy api', apiTest(
        'DELETE',
        'colors.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
