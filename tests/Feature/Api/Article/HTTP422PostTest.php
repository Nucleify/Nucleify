<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function($articleData = articleData) {
    /**
     * TITLE TESTS
     */
    $articleData['title'] = '';
    test('validation error no title', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.']
        ]]
    ));

    $articleData['title'] = [];
    test('validation error invalid title array', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.']
        ]]
    ));

    $articleData['title'] = 'ti';
    test('validation error title too short', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be at least 3 characters.']
        ]]
    ));


    $articleData['title'] = false;
    test('validation error invalid title false', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $articleData['title'] = true;
    test('validation error invalid title true', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));
    $articleData['title'] = articleData['title']; // reset title value



    /**
     * DESCRIPTION TESTS
     */
    $articleData['description'] = 'test';
    test('validation error description too short', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 10 characters.']
        ]]
    ));

    $articleData['email'] = [];
    test('validation error description array', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 10 characters.']
        ]]
    ));

    $articleData['email'] = 1;
    test('validation error description integer', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be at least 10 characters.'
            ]
        ]]
    ));

    $articleData['description'] = false;
    test('validation error description false', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.'
            ]
        ]]
    ));

    $articleData['description'] = true;
    test('validation error description true', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 10 characters.'
            ]
        ]]
    ));
    $articleData['description'] = articleData['description']; // reset description value

    /**
     * CATEGORY TESTS
     */
    $articleData['category'] = [];
    test('validation error category array', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = 1;
    test('validation error category integer', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = false;
    test('validation error category false', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = true;
    test('validation error category true', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));
});
