<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('401 > Unauthorized', function (): void {
    test('sitemap generate api', apiTest(
        'GET',
        'sitemap.generate',
        401,
        null,
        ['message'],
        ['message' => 'Unauthenticated.']
    ));
});
