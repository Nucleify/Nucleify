<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('technology-api-422');
uses()->group('technology-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($technologyData = technologyData) {
    /**
     * LABEL TESTS
     */
    $technologyData['label'] = '';
    test('label > empty', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => ['The label field is required.'],
        ]]
    ));

    $technologyData['label'] = 1;
    test('label > integer', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => [
                'The label field must be a string.',
            ],
        ]]
    ));

    $technologyData['label'] = false;
    test('label > false', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => [
                'The label field must be a string.',
            ],
        ]]
    ));

    $technologyData['label'] = true;
    test('label > true', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => [
                'The label field must be a string.',
            ],
        ]]
    ));

    $technologyData['label'] = [];
    test('label > empty array', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => ['The label field is required.'],
        ]]
    ));

    $technologyData['label'] = technologyData['label'];

    /**
     * DESCRIPTION TESTS
     */
    $technologyData['description'] = 1;
    test('description > integer', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $technologyData['description'] = 't';
    test('description > too short', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 3 characters.'],
        ]]
    ));

    $technologyData['description'] = false;
    test('description > false', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $technologyData['description'] = true;
    test('description > true', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $technologyData['description'] = [];
    test('description > empty array', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $technologyData['description'] = technologyData['description'];

    /**
     * HREF TESTS
     */
    $technologyData['href'] = '';
    test('href > empty', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => ['The href field is required.'],
        ]]
    ));

    $technologyData['href'] = 1;
    test('href > integer', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
            ],
        ]]
    ));

    $technologyData['href'] = false;
    test('href > false', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
            ],
        ]]
    ));

    $technologyData['href'] = true;
    test('href > true', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
            ],
        ]]
    ));

    $technologyData['href'] = [];
    test('href > empty array', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => ['The href field is required.'],
        ]]
    ));

    $technologyData['href'] = technologyData['href'];

    /**
     * SRC TESTS
     */
    $technologyData['src'] = '';
    test('src > empty', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field is required.'],
        ]]
    ));

    $technologyData['src'] = 1;
    test('src > integer', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
            ],
        ]]
    ));

    $technologyData['src'] = false;
    test('src > false', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
            ],
        ]]
    ));

    $technologyData['src'] = true;
    test('src > true', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
            ],
        ]]
    ));

    $technologyData['src'] = [];
    test('src > empty array', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field is required.'],
        ]]
    ));

    $technologyData['src'] = technologyData['src'];

    /**
     * CATEGORY TESTS
     */
    $technologyData['category'] = 1;
    test('category > integer', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $technologyData['category'] = false;
    test('category > false', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $technologyData['category'] = true;
    test('category > true', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $technologyData['category'] = [];
    test('category > empty array', apiTest(
        'POST',
        'technologies.store',
        422,
        $technologyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));
});
