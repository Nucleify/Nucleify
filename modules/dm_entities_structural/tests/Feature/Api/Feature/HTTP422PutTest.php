<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedFeatureData = updatedFeatureData) {
    /**
     * ICON TESTS
     */
    $updatedFeatureData['icon'] = 1;
    test('invalid icon > integer', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['icon'] = false;
    test('invalid icon > false', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['icon'] = true;
    test('invalid icon > true', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['icon'] = [];
    test('invalid icon > empty array', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => ['The icon field is required.'],
        ]]
    ));

    $updatedFeatureData['icon'] = updatedFeatureData['icon'];

    /**
     * HEADER TESTS
     */
    $updatedFeatureData['header'] = '';
    test('invalid header > empty', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => ['The header field is required.'],
        ]]
    ));

    $updatedFeatureData['header'] = 1;
    test('invalid header > integer', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => [
                'The header field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['header'] = false;
    test('invalid header > false', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => [
                'The header field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['header'] = true;
    test('invalid header > true', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => [
                'The header field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['header'] = [];
    test('invalid header > empty array', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => ['The header field is required.'],
        ]]
    ));

    $updatedFeatureData['header'] = updatedFeatureData['header'];

    /**
     * DESCRIPTION TESTS
     */
    $updatedFeatureData['description'] = 1;
    test('invalid description > integer', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['description'] = false;
    test('invalid description > false', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['description'] = true;
    test('invalid description > true', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['description'] = [];
    test('invalid description > empty array', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field is required.'],
        ]]
    ));

    $updatedFeatureData['description'] = updatedFeatureData['description'];

    /**
     * CATEGORY TESTS
     */
    $updatedFeatureData['category'] = '';
    test('invalid content > empty', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));

    $updatedFeatureData['category'] = 1;
    test('invalid category > integer', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['category'] = false;
    test('invalid category > false', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['category'] = true;
    test('invalid category > true', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $updatedFeatureData['category'] = [];
    test('invalid category > empty array', apiTest(
        'PUT',
        'features.update',
        422,
        $updatedFeatureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));
});
