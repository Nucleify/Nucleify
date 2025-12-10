<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('article-api-422');
uses()->group('article-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedArticleData = updatedArticleData) {
    /**
     * TITLE TESTS
     */
    $updatedArticleData['title'] = '';
    test('title > empty', apiTest(
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
    test('title > integer', apiTest(
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
    test('title > too short', apiTest(
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
    test('title > false', apiTest(
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
    test('title > true', apiTest(
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
    test('title > empty array', apiTest(
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
    test('description > integer', apiTest(
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
    test('description > too short', apiTest(
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
    test('description > false', apiTest(
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
    test('description > true', apiTest(
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
    test('description > empty array', apiTest(
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
    test('category > integer', apiTest(
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
    test('category > false', apiTest(
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
    test('category > true', apiTest(
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
    test('category > empty array', apiTest(
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
