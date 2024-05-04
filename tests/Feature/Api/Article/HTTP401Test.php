<?php


describe('401', function () {
    test('unauthorized index api', apiTest(
        'GET',
        'articles.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized show api', apiTest(
        'SHOW',
        'articles.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized store api with data', apiTest(
        'POST',
        'articles.store',
        401,
        articleData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized store api empty json', apiTest(
        'POST',
        'articles.store',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized update api with data', apiTest(
        'PUT',
        'articles.update',
        401,
        articleData,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized update api empty json', apiTest(
        'PUT',
        'articles.update',
        401,
        [],
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized destroy api', apiTest(
        'DELETE',
        'articles.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
