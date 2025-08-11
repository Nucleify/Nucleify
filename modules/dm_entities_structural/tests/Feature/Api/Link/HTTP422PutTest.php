<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('link-api-422');
uses()->group('link-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedLinkData = updatedLinkData) {
    /**
     * DOWNLOAD TESTS
     */
    $updatedLinkData['download'] = 1;
    test('download > int', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['download']],
        ['errors' => [
            'download' => ['The download field must be a string.'],
        ]]
    ));

    $updatedLinkData['download'] = false;
    test('download > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['download']],
        ['errors' => [
            'download' => ['The download field must be a string.'],
        ]]
    ));

    $updatedLinkData['download'] = updatedLinkData['download'];

    /**
     * HREF TESTS
     */
    $updatedLinkData['href'] = '';
    test('href > empty', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => ['The href field is required.'],
        ]]
    ));

    $updatedLinkData['href'] = 1;
    test('href > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
                'The href field must be a valid URL.',
            ],
        ]]
    ));

    $updatedLinkData['href'] = false;
    test('href > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
                'The href field must be a valid URL.',
            ],
        ]]
    ));

    $updatedLinkData['href'] = true;
    test('href > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
                'The href field must be a valid URL.',
            ],
        ]]
    ));

    $updatedLinkData['href'] = [];
    test('href > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => ['The href field is required.'],
        ]]
    ));

    $updatedLinkData['href'] = updatedLinkData['href'];

    /**
     * CATEGORY TESTS
     */
    $updatedLinkData['category'] = '';
    test('content > empty', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));

    $updatedLinkData['category'] = 1;
    test('category > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['category'] = false;
    test('category > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['category'] = true;
    test('category > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['category'] = [];
    test('category > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));

    $updatedLinkData['category'] = updatedLinkData['category'];

    /**
     * SRC TESTS
     */
    $updatedLinkData['src'] = 1;
    test('src > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
                'The src field must be a valid URL.',
            ],
        ]]
    ));

    $updatedLinkData['src'] = false;
    test('src > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
                'The src field must be a valid URL.',
            ],
        ]]
    ));

    $updatedLinkData['src'] = true;
    test('src > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
                'The src field must be a valid URL.',
            ],
        ]]
    ));

    $updatedLinkData['src'] = [];
    test('src > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
                'The src field must be a valid URL.',
            ],
        ]]
    ));

    $updatedLinkData['src'] = updatedLinkData['src'];

    /**
     * ICON TESTS
     */
    $updatedLinkData['icon'] = 1;
    test('icon > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['icon'] = false;
    test('icon > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['icon'] = true;
    test('icon > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['icon'] = [];
    test('icon > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => ['The icon field must be a string.'],
        ]]
    ));

    $updatedLinkData['icon'] = updatedLinkData['icon'];

    /**
     * HREFLANG TESTS
     */
    $updatedLinkData['hreflang'] = 1;
    test('hreflang > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['hreflang']],
        ['errors' => [
            'hreflang' => [
                'The hreflang field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['hreflang'] = false;
    test('hreflang > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['hreflang']],
        ['errors' => [
            'hreflang' => [
                'The hreflang field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['hreflang'] = true;
    test('hreflang > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['hreflang']],
        ['errors' => [
            'hreflang' => [
                'The hreflang field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['hreflang'] = [];
    test('hreflang > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['hreflang']],
        ['errors' => [
            'hreflang' => ['The hreflang field must be a string.'],
        ]]
    ));

    $updatedLinkData['hreflang'] = updatedLinkData['hreflang'];

    /**
     * MEDIA TESTS
     */
    $updatedLinkData['media'] = 1;
    test('media > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['media']],
        ['errors' => [
            'media' => [
                'The media field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['media'] = false;
    test('media > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['media']],
        ['errors' => [
            'media' => [
                'The media field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['media'] = true;
    test('media > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['media']],
        ['errors' => [
            'media' => [
                'The media field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['media'] = [];
    test('media > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['media']],
        ['errors' => [
            'media' => ['The media field must be a string.'],
        ]]
    ));

    $updatedLinkData['media'] = updatedLinkData['media'];

    /**
     * PING TESTS
     */
    $updatedLinkData['ping'] = 1;
    test('ping > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['ping']],
        ['errors' => [
            'ping' => [
                'The ping field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['ping'] = false;
    test('ping > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['ping']],
        ['errors' => [
            'ping' => [
                'The ping field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['ping'] = true;
    test('ping > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['ping']],
        ['errors' => [
            'ping' => [
                'The ping field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['ping'] = [];
    test('ping > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['ping']],
        ['errors' => [
            'ping' => ['The ping field must be a string.'],
        ]]
    ));

    $updatedLinkData['ping'] = updatedLinkData['ping'];

    /**
     * REL TESTS
     */
    $updatedLinkData['rel'] = 1;
    test('rel > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['rel']],
        ['errors' => [
            'rel' => [
                'The rel field must be a string.',
                'The selected rel is invalid.',
            ],
        ]]
    ));

    $updatedLinkData['rel'] = false;
    test('rel > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['rel']],
        ['errors' => [
            'rel' => [
                'The rel field must be a string.',
                'The selected rel is invalid.',
            ],
        ]]
    ));

    $updatedLinkData['rel'] = true;
    test('rel > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['rel']],
        ['errors' => [
            'rel' => [
                'The rel field must be a string.',
                'The selected rel is invalid.',
            ],
        ]]
    ));

    $updatedLinkData['rel'] = [];
    test('rel > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['rel']],
        ['errors' => [
            'rel' => [
                'The rel field must be a string.',
                'The selected rel is invalid.',
            ],
        ]]
    ));

    $updatedLinkData['rel'] = updatedLinkData['rel'];

    /**
     * TARGET TESTS
     */
    $updatedLinkData['target'] = 1;
    test('target > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['target']],
        ['errors' => [
            'target' => [
                'The selected target is invalid.',
                'The target field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['target'] = false;
    test('target > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['target']],
        ['errors' => [
            'target' => [
                'The selected target is invalid.',
                'The target field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['target'] = true;
    test('target > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['target']],
        ['errors' => [
            'target' => [
                'The selected target is invalid.',
                'The target field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['target'] = [];
    test('target > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['target']],
        ['errors' => [
            'target' => [
                'The selected target is invalid.',
                'The target field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['target'] = updatedLinkData['target'];

    /**
     * TYPE TESTS
     */
    $updatedLinkData['type'] = 1;
    test('type > integer', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['type']],
        ['errors' => [
            'type' => [
                'The type field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['type'] = false;
    test('type > false', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['type']],
        ['errors' => [
            'type' => [
                'The type field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['type'] = true;
    test('type > true', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['type']],
        ['errors' => [
            'type' => [
                'The type field must be a string.',
            ],
        ]]
    ));

    $updatedLinkData['type'] = [];
    test('type > empty array', apiTest(
        'PUT',
        'links.update',
        422,
        $updatedLinkData,
        ['errors' => ['type']],
        ['errors' => [
            'type' => ['The type field must be a string.'],
        ]]
    ));

    $updatedLinkData['type'] = updatedLinkData['type'];
});
