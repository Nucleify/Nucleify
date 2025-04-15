<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedArticleData = updatedArticleData) {
    /**
     * TITLE TESTS
     */
    $updatedArticleData['title'] = '';
    test('invalid title > empty', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $updatedArticleData['title'] = 1;
    test('invalid title > integer', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedArticleData['title'] = 'ti';
    test('invalid title > too short', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be at least 3 characters.'],
        ]]
    ));

    $updatedArticleData['title'] = false;
    test('invalid title > false', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedArticleData['title'] = true;
    test('invalid title > true', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedArticleData['title'] = [];
    test('invalid title > empty array', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $updatedArticleData['title'] = articleData['title'];

    /**
     * DESCRIPTION TESTS
     */
    $updatedArticleData['description'] = 1;
    test('invalid description > integer', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.',
            ],
        ]]
    ));

    $updatedArticleData['description'] = 'test';
    test('invalid description > too short', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 10 characters.'],
        ]]
    ));

    $updatedArticleData['description'] = false;
    test('invalid description > false', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.',
            ],
        ]]
    ));

    $updatedArticleData['description'] = true;
    test('invalid description > true', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.',
            ],
        ]]
    ));

    $updatedArticleData['description'] = [];
    test('invalid description > empty array', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field is required.'],
        ]]
    ));

    $updatedArticleData['description'] = articleData['description'];

    /**
     * CATEGORY TESTS
     */
    $updatedArticleData['category'] = 1;
    test('invalid category > integer', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedArticleData['category'] = false;
    test('invalid category > false', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedArticleData['category'] = true;
    test('invalid category > true', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedArticleData['category'] = [];
    test('invalid category > empty array', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));
});
