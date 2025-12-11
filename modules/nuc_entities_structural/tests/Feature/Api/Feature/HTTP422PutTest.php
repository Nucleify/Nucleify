<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('feature-api-422');
uses()->group('feature-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedFeatureData = updatedFeatureData) {
    /**
     * ICON TESTS
     */
    $updatedFeatureData['icon'] = 1;
    test('icon > integer', apiTest(
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
    test('icon > false', apiTest(
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
    test('icon > true', apiTest(
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
    test('icon > empty array', apiTest(
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
    test('header > empty', apiTest(
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
    test('header > integer', apiTest(
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
    test('header > false', apiTest(
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
    test('header > true', apiTest(
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
    test('header > empty array', apiTest(
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
    test('description > integer', apiTest(
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
    test('description > false', apiTest(
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
    test('description > true', apiTest(
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
    test('description > empty array', apiTest(
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
    test('content > empty', apiTest(
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
    test('category > integer', apiTest(
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
    test('category > false', apiTest(
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
    test('category > true', apiTest(
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
    test('category > empty array', apiTest(
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
