<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($featureData = featureData) {
    /**
     * ICON TESTS
     */
    $featureData['icon'] = 1;
    test('invalid icon > integer', apiTest(
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
    test('invalid icon > false', apiTest(
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
    test('invalid icon > true', apiTest(
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
    test('invalid icon > empty array', apiTest(
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
    test('invalid header > empty', apiTest(
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
    test('invalid header > integer', apiTest(
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
    test('invalid header > false', apiTest(
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
    test('invalid header > true', apiTest(
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
    test('invalid header > empty array', apiTest(
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
    test('invalid description > integer', apiTest(
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
    test('invalid description > false', apiTest(
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
    test('invalid description > true', apiTest(
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
    test('invalid description > empty array', apiTest(
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
    test('invalid content > empty', apiTest(
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
    test('invalid category > integer', apiTest(
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
    test('invalid category > false', apiTest(
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
    test('invalid category > true', apiTest(
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
    test('invalid category > empty array', apiTest(
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
