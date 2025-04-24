<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($linkData = linkData) {
    /**
     * DOWNLOAD TESTS
     */
    $linkData['download'] = 1;
    test('invalid download > int', apiTest(
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
    test('invalid download > false', apiTest(
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
    test('invalid href > empty', apiTest(
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
    test('invalid href > integer', apiTest(
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
    test('invalid href > false', apiTest(
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
    test('invalid href > true', apiTest(
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
    test('invalid href > empty array', apiTest(
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
    test('invalid content > empty', apiTest(
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
    test('invalid category > integer', apiTest(
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
    test('invalid category > false', apiTest(
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
    test('invalid category > true', apiTest(
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
    test('invalid category > empty array', apiTest(
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
    test('invalid src > integer', apiTest(
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
    test('invalid src > false', apiTest(
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
    test('invalid src > true', apiTest(
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
    test('invalid src > empty array', apiTest(
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
    test('invalid icon > integer', apiTest(
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
    test('invalid icon > false', apiTest(
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
    test('invalid icon > true', apiTest(
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
    test('invalid icon > empty array', apiTest(
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
    test('invalid hreflang > integer', apiTest(
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
    test('invalid hreflang > false', apiTest(
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
    test('invalid hreflang > true', apiTest(
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
    test('invalid hreflang > empty array', apiTest(
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
    test('invalid media > integer', apiTest(
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
    test('invalid media > false', apiTest(
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
    test('invalid media > true', apiTest(
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
    test('invalid media > empty array', apiTest(
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
    test('invalid ping > integer', apiTest(
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
    test('invalid ping > false', apiTest(
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
    test('invalid ping > true', apiTest(
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
    test('invalid ping > empty array', apiTest(
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
    test('invalid rel > integer', apiTest(
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
    test('invalid rel > false', apiTest(
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
    test('invalid rel > true', apiTest(
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
    test('invalid rel > empty array', apiTest(
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
    test('invalid target > integer', apiTest(
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
    test('invalid target > false', apiTest(
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
    test('invalid target > true', apiTest(
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
    test('invalid target > empty array', apiTest(
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
    test('invalid type > integer', apiTest(
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
    test('invalid type > false', apiTest(
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
    test('invalid type > true', apiTest(
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
    test('invalid type > empty array', apiTest(
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
