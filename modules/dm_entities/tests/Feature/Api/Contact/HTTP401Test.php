<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('401 > Unauthorized', function (): void {
    test('index api', apiTest(
        'GET',
        'contacts.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('countByCreatedLastWeek api', apiTest(
        'GET',
        'contacts.countByCreatedLastWeek',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('show api', apiTest(
        'SHOW',
        'contacts.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api with data', apiTest(
        'POST',
        'contacts.store',
        401,
        contactData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('store api empty json', apiTest(
        'POST',
        'contacts.store',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api with data', apiTest(
        'PUT',
        'users.update',
        401,
        updatedContactData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('update api empty json', apiTest(
        'PUT',
        'contacts.update',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('destroy api', apiTest(
        'DELETE',
        'contacts.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
