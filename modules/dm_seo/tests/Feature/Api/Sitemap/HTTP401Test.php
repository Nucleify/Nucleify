<?php

describe('401 > Unauthorized', function () {
    test('sitemap generate api', apiTest(
        'GET',
        'sitemap.generate',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
