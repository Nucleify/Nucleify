<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('article-api-422');
uses()->group('article-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($articleData = articleData) {
    /**
     * TITLE TESTS
     */
    $articleData['title'] = '';
    test('title > empty', apiTest(
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
    test('title > integer', apiTest(
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
    test('title > too short', apiTest(
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
    test('title > false', apiTest(
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
    test('title > true', apiTest(
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
    test('title > empty array', apiTest(
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
    test('description > integer', apiTest(
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
    test('description > too short', apiTest(
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
    test('description > false', apiTest(
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
    test('description > true', apiTest(
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
    test('description > empty array', apiTest(
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
    test('category > integer', apiTest(
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
    test('category > false', apiTest(
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
    test('category > true', apiTest(
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
    test('category > empty array', apiTest(
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
