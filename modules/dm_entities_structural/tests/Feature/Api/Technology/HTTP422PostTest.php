<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($technologyData = technologyData) {
    /**
     * LABEL TESTS
     */
    $technologyData['label'] = '';
    test('invalid label > empty', apiTest(
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
    test('invalid label > integer', apiTest(
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
    test('invalid label > false', apiTest(
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
    test('invalid label > true', apiTest(
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
    test('invalid label > empty array', apiTest(
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
    test('invalid description > integer', apiTest(
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
    test('invalid description > too short', apiTest(
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
    test('invalid description > false', apiTest(
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
    test('invalid description > true', apiTest(
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
    test('invalid description > empty array', apiTest(
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
    test('invalid href > empty', apiTest(
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
    test('invalid href > integer', apiTest(
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
    test('invalid href > false', apiTest(
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
    test('invalid href > true', apiTest(
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
    test('invalid href > empty array', apiTest(
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
    test('invalid src > empty', apiTest(
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
    test('invalid src > integer', apiTest(
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
    test('invalid src > false', apiTest(
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
    test('invalid src > true', apiTest(
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
    test('invalid src > empty array', apiTest(
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
    test('invalid category > integer', apiTest(
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
    test('invalid category > false', apiTest(
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
    test('invalid category > true', apiTest(
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
    test('invalid category > empty array', apiTest(
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
