<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function($updatedArticleData = updatedArticleData) {
    /**
     * TITLE TESTS
     */
    $updatedArticleData['title'] = '';
    test('validation error no title', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.']
        ]]
    ));

    $updatedArticleData['title'] = [];
    test('validation error invalid title array', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.']
        ]]
    ));

    $updatedArticleData['title'] = 'ti';
    test('validation error title too short', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be at least 3 characters.']
        ]]
    ));


    $updatedArticleData['title'] = false;
    test('validation error invalid title false', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedArticleData['title'] = true;
    test('validation error invalid title true', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));
    $updatedArticleData['title'] = updatedArticleData['title']; // reset title value



    /**
     * DESCRIPTION TESTS
     */
    $updatedArticleData['description'] = 'test';
    test('validation error description too short', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 10 characters.']
        ]]
    ));

    $updatedArticleData['email'] = [];
    test('validation error description array', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 10 characters.']
        ]]
    ));

    $updatedArticleData['email'] = 1;
    test('validation error description integer', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be at least 10 characters.'
            ]
        ]]
    ));

    $updatedArticleData['description'] = false;
    test('validation error description false', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.'
            ]
        ]]
    ));

    $updatedArticleData['description'] = true;
    test('validation error description true', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.'
            ]
        ]]
    ));
    $updatedArticleData['description'] = updatedArticleData['description']; // reset description value

    /**
     * CATEGORY TESTS
     */
    $updatedArticleData['category'] = [];
    test('validation error category array', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = 1;
    test('validation error category integer', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = false;
    test('validation error category false', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = true;
    test('validation error category true', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));
});
