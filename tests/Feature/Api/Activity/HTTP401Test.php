<?php


describe('401', function () {
    test('unauthorized index api', apiTest(
        'GET',
        'activity-log.index',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized show api', apiTest(
        'SHOW',
        'activity-log.show',
        401,
        1,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));

    test('unauthorized destroy api', apiTest(
        'DELETE',
        'activity-log.destroy',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
