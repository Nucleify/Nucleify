<?php

beforeEach(function () {
  $this->createUsers();
  $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function($featureData = featureData) {
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
            'header' => ['The header field is required.']
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
            ]
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
            ]
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
            ]
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
            'header' => ['The header field is required.']
        ]]
    ));

    $featureData['header'] = featureData['header']; // reset content value



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
            ]
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
            ]
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
            ]
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
            'description' => ['The description field is required.']
        ]]
    ));

    $featureData['description'] = featureData['description']; // reset content value



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
            'category' => ['The category field is required.']
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
            ]
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
            ]
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
            ]
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
            'category' => ['The category field is required.']
        ]]
    ));

    $featureData['category'] = featureData['category']; // reset content value

});
