<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedLinkData = updatedLinkData) {
    /**
     * DOWNLOAD TESTS
     */
    $updatedLinkData['download'] = 1;
    test('invalid download > int', apiTest(
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
    test('invalid download > false', apiTest(
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
    test('invalid href > empty', apiTest(
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
    test('invalid href > integer', apiTest(
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
    test('invalid href > false', apiTest(
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
    test('invalid href > true', apiTest(
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
    test('invalid href > empty array', apiTest(
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
    test('invalid content > empty', apiTest(
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
    test('invalid category > integer', apiTest(
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
    test('invalid category > false', apiTest(
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
    test('invalid category > true', apiTest(
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
    test('invalid category > empty array', apiTest(
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
    test('invalid src > integer', apiTest(
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
    test('invalid src > false', apiTest(
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
    test('invalid src > true', apiTest(
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
    test('invalid src > empty array', apiTest(
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
    test('invalid icon > integer', apiTest(
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
    test('invalid icon > false', apiTest(
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
    test('invalid icon > true', apiTest(
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
    test('invalid icon > empty array', apiTest(
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
    test('invalid hreflang > integer', apiTest(
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
    test('invalid hreflang > false', apiTest(
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
    test('invalid hreflang > true', apiTest(
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
    test('invalid hreflang > empty array', apiTest(
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
    test('invalid media > integer', apiTest(
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
    test('invalid media > false', apiTest(
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
    test('invalid media > true', apiTest(
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
    test('invalid media > empty array', apiTest(
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
    test('invalid ping > integer', apiTest(
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
    test('invalid ping > false', apiTest(
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
    test('invalid ping > true', apiTest(
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
    test('invalid ping > empty array', apiTest(
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
    test('invalid rel > integer', apiTest(
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
    test('invalid rel > false', apiTest(
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
    test('invalid rel > true', apiTest(
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
    test('invalid rel > empty array', apiTest(
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
    test('invalid target > integer', apiTest(
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
    test('invalid target > false', apiTest(
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
    test('invalid target > true', apiTest(
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
    test('invalid target > empty array', apiTest(
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
    test('invalid type > integer', apiTest(
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
    test('invalid type > false', apiTest(
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
    test('invalid type > true', apiTest(
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
    test('invalid type > empty array', apiTest(
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
