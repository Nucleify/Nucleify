<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('link-api-422');
uses()->group('link-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($linkData = linkData) {
    /**
     * DOWNLOAD TESTS
     */
    $linkData['download'] = 1;
    test('download > int', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['download']],
        ['errors' => [
            'download' => ['The download field must be a string.'],
        ]]
    ));

    $linkData['download'] = false;
    test('download > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['download']],
        ['errors' => [
            'download' => ['The download field must be a string.'],
        ]]
    ));

    $linkData['download'] = 'dsdds';

    /**
     * HREF TESTS
     */
    $linkData['href'] = '';
    test('href > empty', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => ['The href field is required.'],
        ]]
    ));

    $linkData['href'] = 1;
    test('href > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
                'The href field must be a valid URL.',
            ],
        ]]
    ));

    $linkData['href'] = false;
    test('href > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
                'The href field must be a valid URL.',
            ],
        ]]
    ));

    $linkData['href'] = true;
    test('href > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
                'The href field must be a valid URL.',
            ],
        ]]
    ));

    $linkData['href'] = [];
    test('href > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => ['The href field is required.'],
        ]]
    ));

    $linkData['href'] = linkData['href'];

    /**
     * CATEGORY TESTS
     */
    $linkData['category'] = '';
    test('content > empty', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));

    $linkData['category'] = 1;
    test('category > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $linkData['category'] = false;
    test('category > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $linkData['category'] = true;
    test('category > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $linkData['category'] = [];
    test('category > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));

    $linkData['category'] = linkData['category'];

    /**
     * SRC TESTS
     */
    $linkData['src'] = 1;
    test('src > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
                'The src field must be a valid URL.',
            ],
        ]]
    ));

    $linkData['src'] = false;
    test('src > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
                'The src field must be a valid URL.',
            ],
        ]]
    ));

    $linkData['src'] = true;
    test('src > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
                'The src field must be a valid URL.',
            ],
        ]]
    ));

    $linkData['src'] = [];
    test('src > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
                'The src field must be a valid URL.',
            ],
        ]]
    ));

    $linkData['src'] = linkData['src'];

    /**
     * ICON TESTS
     */
    $linkData['icon'] = 1;
    test('icon > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $linkData['icon'] = false;
    test('icon > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $linkData['icon'] = true;
    test('icon > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $linkData['icon'] = [];
    test('icon > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => ['The icon field must be a string.'],
        ]]
    ));

    $linkData['icon'] = linkData['icon'];

    /**
     * HREFLANG TESTS
     */
    $linkData['hreflang'] = 1;
    test('hreflang > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['hreflang']],
        ['errors' => [
            'hreflang' => [
                'The hreflang field must be a string.',
            ],
        ]]
    ));

    $linkData['hreflang'] = false;
    test('hreflang > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['hreflang']],
        ['errors' => [
            'hreflang' => [
                'The hreflang field must be a string.',
            ],
        ]]
    ));

    $linkData['hreflang'] = true;
    test('hreflang > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['hreflang']],
        ['errors' => [
            'hreflang' => [
                'The hreflang field must be a string.',
            ],
        ]]
    ));

    $linkData['hreflang'] = [];
    test('hreflang > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['hreflang']],
        ['errors' => [
            'hreflang' => ['The hreflang field must be a string.'],
        ]]
    ));

    $linkData['hreflang'] = linkData['hreflang'];

    /**
     * MEDIA TESTS
     */
    $linkData['media'] = 1;
    test('media > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['media']],
        ['errors' => [
            'media' => [
                'The media field must be a string.',
            ],
        ]]
    ));

    $linkData['media'] = false;
    test('media > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['media']],
        ['errors' => [
            'media' => [
                'The media field must be a string.',
            ],
        ]]
    ));

    $linkData['media'] = true;
    test('media > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['media']],
        ['errors' => [
            'media' => [
                'The media field must be a string.',
            ],
        ]]
    ));

    $linkData['media'] = [];
    test('media > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['media']],
        ['errors' => [
            'media' => ['The media field must be a string.'],
        ]]
    ));

    $linkData['media'] = linkData['media'];

    /**
     * PING TESTS
     */
    $linkData['ping'] = 1;
    test('ping > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['ping']],
        ['errors' => [
            'ping' => [
                'The ping field must be a string.',
            ],
        ]]
    ));

    $linkData['ping'] = false;
    test('ping > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['ping']],
        ['errors' => [
            'ping' => [
                'The ping field must be a string.',
            ],
        ]]
    ));

    $linkData['ping'] = true;
    test('ping > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['ping']],
        ['errors' => [
            'ping' => [
                'The ping field must be a string.',
            ],
        ]]
    ));

    $linkData['ping'] = [];
    test('ping > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['ping']],
        ['errors' => [
            'ping' => ['The ping field must be a string.'],
        ]]
    ));

    $linkData['ping'] = linkData['ping'];

    /**
     * REL TESTS
     */
    $linkData['rel'] = 1;
    test('rel > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['rel']],
        ['errors' => [
            'rel' => [
                'The rel field must be a string.',
                'The selected rel is invalid.',
            ],
        ]]
    ));

    $linkData['rel'] = false;
    test('rel > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['rel']],
        ['errors' => [
            'rel' => [
                'The rel field must be a string.',
                'The selected rel is invalid.',
            ],
        ]]
    ));

    $linkData['rel'] = true;
    test('rel > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['rel']],
        ['errors' => [
            'rel' => [
                'The rel field must be a string.',
                'The selected rel is invalid.',
            ],
        ]]
    ));

    $linkData['rel'] = [];
    test('rel > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['rel']],
        ['errors' => [
            'rel' => [
                'The rel field must be a string.',
                'The selected rel is invalid.',
            ],
        ]]
    ));

    $linkData['rel'] = linkData['rel'];

    /**
     * TARGET TESTS
     */
    $linkData['target'] = 1;
    test('target > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['target']],
        ['errors' => [
            'target' => [
                'The selected target is invalid.',
                'The target field must be a string.',
            ],
        ]]
    ));

    $linkData['target'] = false;
    test('target > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['target']],
        ['errors' => [
            'target' => [
                'The selected target is invalid.',
                'The target field must be a string.',
            ],
        ]]
    ));

    $linkData['target'] = true;
    test('target > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['target']],
        ['errors' => [
            'target' => [
                'The selected target is invalid.',
                'The target field must be a string.',
            ],
        ]]
    ));

    $linkData['target'] = [];
    test('target > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['target']],
        ['errors' => [
            'target' => [
                'The selected target is invalid.',
                'The target field must be a string.',
            ],
        ]]
    ));

    $linkData['target'] = linkData['target'];

    /**
     * TYPE TESTS
     */
    $linkData['type'] = 1;
    test('type > integer', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['type']],
        ['errors' => [
            'type' => [
                'The type field must be a string.',
            ],
        ]]
    ));

    $linkData['type'] = false;
    test('type > false', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['type']],
        ['errors' => [
            'type' => [
                'The type field must be a string.',
            ],
        ]]
    ));

    $linkData['type'] = true;
    test('type > true', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['type']],
        ['errors' => [
            'type' => [
                'The type field must be a string.',
            ],
        ]]
    ));

    $linkData['type'] = [];
    test('type > empty array', apiTest(
        'POST',
        'links.store',
        422,
        $linkData,
        ['errors' => ['type']],
        ['errors' => [
            'type' => ['The type field must be a string.'],
        ]]
    ));

    $linkData['type'] = linkData['type'];
});
