<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedTechnologyData = updatedTechnologyData) {
    /**
     * LABEL TESTS
     */
    $updatedTechnologyData['label'] = '';
    test('invalid label > empty', apiTest(
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
    test('invalid label > integer', apiTest(
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
    test('invalid label > false', apiTest(
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
    test('invalid label > true', apiTest(
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
    test('invalid label > empty array', apiTest(
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
    test('invalid description > integer', apiTest(
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
    test('invalid description > too short', apiTest(
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
    test('invalid description > false', apiTest(
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
    test('invalid description > true', apiTest(
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
    test('invalid description > empty array', apiTest(
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
    test('invalid href > empty', apiTest(
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
    test('invalid href > integer', apiTest(
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
    test('invalid href > false', apiTest(
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
    test('invalid href > true', apiTest(
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
    test('invalid href > empty array', apiTest(
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
    test('invalid src > empty', apiTest(
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
    test('invalid src > integer', apiTest(
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
    test('invalid src > false', apiTest(
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
    test('invalid src > true', apiTest(
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
    test('invalid src > empty array', apiTest(
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
    test('invalid category > integer', apiTest(
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
    test('invalid category > false', apiTest(
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
    test('invalid category > true', apiTest(
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
    test('invalid category > empty array', apiTest(
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
