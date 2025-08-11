<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('technology-api-422');
uses()->group('technology-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedTechnologyData = updatedTechnologyData) {
    /**
     * LABEL TESTS
     */
    $updatedTechnologyData['label'] = '';
    test('label > empty', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => ['The label field is required.'],
        ]]
    ));

    $updatedTechnologyData['label'] = 1;
    test('label > integer', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => [
                'The label field must be a string.',
            ],
        ]]
    ));

    $updatedTechnologyData['label'] = false;
    test('label > false', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => [
                'The label field must be a string.',
            ],
        ]]
    ));

    $updatedTechnologyData['label'] = true;
    test('label > true', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => [
                'The label field must be a string.',
            ],
        ]]
    ));

    $updatedTechnologyData['label'] = [];
    test('label > empty array', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['label']],
        ['errors' => [
            'label' => ['The label field is required.'],
        ]]
    ));

    $updatedTechnologyData['label'] = updatedTechnologyData['label'];

    /**
     * DESCRIPTION TESTS
     */
    $updatedTechnologyData['description'] = 1;
    test('description > integer', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedTechnologyData['description'] = 't';
    test('description > too short', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 3 characters.'],
        ]]
    ));

    $updatedTechnologyData['description'] = false;
    test('description > false', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedTechnologyData['description'] = true;
    test('description > true', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedTechnologyData['description'] = [];
    test('description > empty array', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedTechnologyData['description'] = updatedTechnologyData['description'];

    /**
     * HREF TESTS
     */
    $updatedTechnologyData['href'] = '';
    test('href > empty', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => ['The href field is required.'],
        ]]
    ));

    $updatedTechnologyData['href'] = 1;
    test('href > integer', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
            ],
        ]]
    ));

    $updatedTechnologyData['href'] = false;
    test('href > false', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
            ],
        ]]
    ));

    $updatedTechnologyData['href'] = true;
    test('href > true', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => [
                'The href field must be a string.',
            ],
        ]]
    ));

    $updatedTechnologyData['href'] = [];
    test('href > empty array', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['href']],
        ['errors' => [
            'href' => ['The href field is required.'],
        ]]
    ));

    $updatedTechnologyData['href'] = updatedTechnologyData['href'];

    /**
     * SRC TESTS
     */
    $updatedTechnologyData['src'] = '';
    test('src > empty', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field is required.'],
        ]]
    ));

    $updatedTechnologyData['src'] = 1;
    test('src > integer', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
            ],
        ]]
    ));

    $updatedTechnologyData['src'] = false;
    test('src > false', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
            ],
        ]]
    ));

    $updatedTechnologyData['src'] = true;
    test('src > true', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => [
                'The src field must be a string.',
            ],
        ]]
    ));

    $updatedTechnologyData['src'] = [];
    test('src > empty array', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field is required.'],
        ]]
    ));

    $updatedTechnologyData['src'] = updatedTechnologyData['src'];

    /**
     * CATEGORY TESTS
     */
    $updatedTechnologyData['category'] = 1;
    test('category > integer', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedTechnologyData['category'] = false;
    test('category > false', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedTechnologyData['category'] = true;
    test('category > true', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedTechnologyData['category'] = [];
    test('category > empty array', apiTest(
        'PUT',
        'technologies.update',
        422,
        $updatedTechnologyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));
});
