<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('401', function (): void {
    test('index api', apiTest(
        'GET',
        'files.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('show api', apiTest(
        'SHOW',
        'files.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('edit api', apiTest(
        'PUT',
        'files.edit',
        401,
        fileData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('destroy api', apiTest(
        'DELETE',
        'files.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
