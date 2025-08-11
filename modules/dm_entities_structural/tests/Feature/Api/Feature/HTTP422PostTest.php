<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('feature-api-422');
uses()->group('feature-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($featureData = featureData) {
    /**
     * ICON TESTS
     */
    $featureData['icon'] = 1;
    test('icon > integer', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $featureData['icon'] = false;
    test('icon > false', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $featureData['icon'] = true;
    test('icon > true', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => [
                'The icon field must be a string.',
            ],
        ]]
    ));

    $featureData['icon'] = [];
    test('icon > empty array', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['icon']],
        ['errors' => [
            'icon' => ['The icon field is required.'],
        ]]
    ));

    $featureData['icon'] = featureData['icon'];

    /**
     * HEADER TESTS
     */
    $featureData['header'] = '';
    test('header > empty', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => ['The header field is required.'],
        ]]
    ));

    $featureData['header'] = 1;
    test('header > integer', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => [
                'The header field must be a string.',
            ],
        ]]
    ));

    $featureData['header'] = false;
    test('header > false', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => [
                'The header field must be a string.',
            ],
        ]]
    ));

    $featureData['header'] = true;
    test('header > true', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => [
                'The header field must be a string.',
            ],
        ]]
    ));

    $featureData['header'] = [];
    test('header > empty array', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['header']],
        ['errors' => [
            'header' => ['The header field is required.'],
        ]]
    ));

    $featureData['header'] = featureData['header'];

    /**
     * DESCRIPTION TESTS
     */
    $featureData['description'] = 1;
    test('description > integer', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
            ],
        ]]
    ));

    $featureData['description'] = false;
    test('description > false', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
            ],
        ]]
    ));

    $featureData['description'] = true;
    test('description > true', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
            ],
        ]]
    ));

    $featureData['description'] = [];
    test('description > empty array', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field is required.'],
        ]]
    ));

    $featureData['description'] = featureData['description'];

    /**
     * CATEGORY TESTS
     */
    $featureData['category'] = '';
    test('content > empty', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));

    $featureData['category'] = 1;
    test('category > integer', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $featureData['category'] = false;
    test('category > false', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $featureData['category'] = true;
    test('category > true', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => [
                'The category field must be a string.',
            ],
        ]]
    ));

    $featureData['category'] = [];
    test('category > empty array', apiTest(
        'POST',
        'features.store',
        422,
        $featureData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));
});
