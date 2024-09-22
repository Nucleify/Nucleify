<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function($updatedArticleData = updatedArticleData) {
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
            'title' => ['The title field is required.']
        ]]
    ));

    $updatedArticleData['title'] = 1;
    test('invalid title > positive integer', apiTest(
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

    $updatedArticleData['title'] = -1;
    test('invalid title > negative integer', apiTest(
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

    $updatedArticleData['title'] = 'ti';
    test('invalid title > too short', apiTest(
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
    test('invalid title > false', apiTest(
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
    test('invalid title > true', apiTest(
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

    $updatedArticleData['title'] = [];
    test('invalid title > empty array', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.']
        ]]
    ));

    $updatedArticleData['title'] = [1];
    test('invalid title > array with positive integer', apiTest(
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

    $updatedArticleData['title'] = [-1];
    test('invalid title > array with negative integer', apiTest(
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

    $updatedArticleData['title'] = [1, 1];
    test('invalid title > array with multiple same positive integers', apiTest(
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

    $updatedArticleData['title'] = [1, 2];
    test('invalid title > array with multiple different positive integers', apiTest(
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

    $updatedArticleData['title'] = [-1, -1];
    test('invalid title > array with multiple same negative integers', apiTest(
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

    $updatedArticleData['title'] = [-1, -2];
    test('invalid title > array with multiple different negative integers', apiTest(
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

    $updatedArticleData['title'] = ['title'];
    test('invalid title > array with string', apiTest(
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

    $updatedArticleData['title'] = ['title1', 'title1'];
    test('invalid title > array with multiple same strings', apiTest(
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

    $updatedArticleData['title'] = ['title1', 'title2'];
    test('invalid title > array with multiple different strings', apiTest(
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

    $updatedArticleData['title'] = [true];
    test('invalid title > array with true', apiTest(
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

    $updatedArticleData['title'] = [false];
    test('invalid title > array with false', apiTest(
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

    $updatedArticleData['title'] = [true, true];
    test('invalid title > array with multiple true', apiTest(
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

    $updatedArticleData['title'] = [false, false];
    test('invalid title > array with multiple false', apiTest(
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

    $updatedArticleData['title'] = [true , false];
    test('invalid title > array with true false', apiTest(
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

    $updatedArticleData['title'] = articleData['title']; // reset title value



    /**
     * DESCRIPTION TESTS
     */
    $updatedArticleData['description'] = 1;
    test('invalid description > positive integer', apiTest(
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

    $updatedArticleData['description'] = -1;
    test('invalid description > negative integer', apiTest(
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

    $updatedArticleData['description'] = 'test';
    test('invalid description > too short', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 10 characters.']
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
                'The description field must be at least 10 characters.'
            ]
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
                'The description field must be at least 10 characters.'
            ]
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
            'description' => ['The description field is required.']
        ]]
    ));

    $updatedArticleData['description'] = [1];
    test('invalid description > array with positive integer', apiTest(
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

    $updatedArticleData['description'] = [-1];
    test('invalid description > array with negative integer', apiTest(
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

    $updatedArticleData['description'] = [1, 1];
    test('invalid description > array with multiple same positive integers', apiTest(
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

    $updatedArticleData['description'] = [1, 2];
    test('invalid description > array with multiple different positive integers', apiTest(
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

    $updatedArticleData['description'] = [-1, -1];
    test('invalid description > array with multiple same negative integers', apiTest(
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

    $updatedArticleData['description'] = [-1, -2];
    test('invalid description > array with multiple different negative integers', apiTest(
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

    $updatedArticleData['description'] = ['description'];
    test('invalid description > array with string', apiTest(
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

    $updatedArticleData['description'] = ['description1', 'description1'];
    test('invalid description > array with multiple same strings', apiTest(
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

    $updatedArticleData['description'] = ['description1', 'description2'];
    test('invalid description > array with multiple different strings', apiTest(
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

    $updatedArticleData['description'] = [true];
    test('invalid description > array with true', apiTest(
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

    $updatedArticleData['description'] = [false];
    test('invalid description > array with false', apiTest(
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

    $updatedArticleData['description'] = [true, true];
    test('invalid description > array with multiple true', apiTest(
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

    $updatedArticleData['description'] = [false, false];
    test('invalid description > array with multiple false', apiTest(
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

    $updatedArticleData['description'] = [true , false];
    test('invalid description > array with true false', apiTest(
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

    $updatedArticleData['description'] = articleData['description']; // reset description value



    /**
     * CATEGORY TESTS
     */
    $updatedArticleData['category'] = 1;
    test('invalid category > positive integer', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = -1;
    test('invalid category > negative integer', apiTest(
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
    test('invalid category > false', apiTest(
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
    test('invalid category > true', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
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
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [1];
    test('invalid category > array with positive integer', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [-1];
    test('invalid category > array with negative integer', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [1, 1];
    test('invalid category > array with multiple same positive integers', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [1, 2];
    test('invalid category > array with multiple different positive integers', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [-1, -1];
    test('invalid category > array with multiple same negative integers', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [-1, -2];
    test('invalid category > array with multiple different negative integers', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = ['category'];
    test('invalid category > array with string', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = ['category1', 'category1'];
    test('invalid category > array with multiple same strings', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = ['category1', 'category2'];
    test('invalid category > array with multiple different strings', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [true];
    test('invalid category > array with true', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [false];
    test('invalid category > array with false', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [true, true];
    test('invalid category > array with multiple true', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [false, false];
    test('invalid category > array with multiple false', apiTest(
        'PUT',
        'articles.update',
        422,
        $updatedArticleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedArticleData['category'] = [true , false];
    test('invalid category > array with true false', apiTest(
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
