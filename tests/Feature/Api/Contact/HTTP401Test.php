<?php


describe('401', function() {
    test('unauthorized index api', apiTest(
        'GET',
        'contacts.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
    test('unauthorized show api', apiTest(
        'SHOW',
        'contacts.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized store api with data', apiTest(
        'POST',
        'contacts.store',
        401,
        contactData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized store api empty json', apiTest(
        'POST',
        'contacts.store',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized update api with data', apiTest(
        'PUT',
        'users.update',
        401,
        updatedContactData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized update api empty json', apiTest(
        'PUT',
        'contacts.update',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized destroy api', apiTest(
        'DELETE',
        'contacts.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
