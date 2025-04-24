<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($articleData = articleData) {
    /**
     * TITLE TESTS
     */
    $articleData['title'] = '';
    test('invalid title > empty', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $articleData['title'] = 1;
    test('invalid title > integer', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $articleData['title'] = 'ti';
    test('invalid title > too short', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be at least 3 characters.'],
        ]]
    ));

    $articleData['title'] = false;
    test('invalid title > false', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $articleData['title'] = true;
    test('invalid title > true', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $articleData['title'] = [];
    test('invalid title > empty array', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $articleData['title'] = articleData['title'];

    /**
     * DESCRIPTION TESTS
     */
    $articleData['description'] = 1;
    test('invalid description > integer', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.',
            ],
        ]]
    ));

    $articleData['description'] = 'test';
    test('invalid description > too short', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 10 characters.'],
        ]]
    ));

    $articleData['description'] = false;
    test('invalid description > false', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.',
            ],
        ]]
    ));

    $articleData['description'] = true;
    test('invalid description > true', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.',
            ],
        ]]
    ));

    $articleData['description'] = [];
    test('invalid description > empty array', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field is required.'],
        ]]
    ));

    $articleData['description'] = articleData['description'];

    /**
     * CATEGORY TESTS
     */
    $articleData['category'] = 1;
    test('invalid category > integer', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $articleData['category'] = false;
    test('invalid category > false', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $articleData['category'] = true;
    test('invalid category > true', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $articleData['category'] = [];
    test('invalid category > empty array', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));
});
