<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function($articleData = articleData) {
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
            'title' => ['The title field is required.']
        ]]
    ));

    $articleData['title'] = 1;
    test('invalid title > positive integer', apiTest(
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

    $articleData['title'] = -1;
    test('invalid title > negative integer', apiTest(
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

    $articleData['title'] = 'ti';
    test('invalid title > too short', apiTest(
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
    test('invalid title > false', apiTest(
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
    test('invalid title > true', apiTest(
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

    $articleData['title'] = [];
    test('invalid title > empty array', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.']
        ]]
    ));

    $articleData['title'] = [1];
    test('invalid title > array with positive integer', apiTest(
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

    $articleData['title'] = [-1];
    test('invalid title > array with negative integer', apiTest(
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

    $articleData['title'] = [1, 1];
    test('invalid title > array with multiple same positive integers', apiTest(
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

    $articleData['title'] = [1, 2];
    test('invalid title > array with multiple different positive integers', apiTest(
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

    $articleData['title'] = [-1, -1];
    test('invalid title > array with multiple same negative integers', apiTest(
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

    $articleData['title'] = [-1, -2];
    test('invalid title > array with multiple different negative integers', apiTest(
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

    $articleData['title'] = ['title'];
    test('invalid title > array with string', apiTest(
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

    $articleData['title'] = ['title1', 'title1'];
    test('invalid title > array with multiple same strings', apiTest(
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

    $articleData['title'] = ['title1', 'title2'];
    test('invalid title > array with multiple different strings', apiTest(
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

    $articleData['title'] = [true];
    test('invalid title > array with true', apiTest(
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

    $articleData['title'] = [false];
    test('invalid title > array with false', apiTest(
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

    $articleData['title'] = [true, true];
    test('invalid title > array with multiple true', apiTest(
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

    $articleData['title'] = [false, false];
    test('invalid title > array with multiple false', apiTest(
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

    $articleData['title'] = [true , false];
    test('invalid title > array with true false', apiTest(
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
    $articleData['description'] = 1;
    test('invalid description > positive integer', apiTest(
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

    $articleData['description'] = -1;
    test('invalid description > negative integer', apiTest(
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

    $articleData['description'] = 'test';
    test('invalid description > too short', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 10 characters.']
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
                'The description field must be at least 10 characters.'
            ]
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
                'The description field must be at least 10 characters.'
            ]
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
            'description' => ['The description field is required.']
        ]]
    ));

    $articleData['description'] = [1];
    test('invalid description > array with positive integer', apiTest(
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

    $articleData['description'] = [-1];
    test('invalid description > array with negative integer', apiTest(
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

    $articleData['description'] = [1, 1];
    test('invalid description > array with multiple same positive integers', apiTest(
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

    $articleData['description'] = [1, 2];
    test('invalid description > array with multiple different positive integers', apiTest(
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

    $articleData['description'] = [-1, -1];
    test('invalid description > array with multiple same negative integers', apiTest(
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

    $articleData['description'] = [-1, -2];
    test('invalid description > array with multiple different negative integers', apiTest(
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

    $articleData['description'] = ['description'];
    test('invalid description > array with string', apiTest(
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

    $articleData['description'] = ['description1', 'description1'];
    test('invalid description > array with multiple same strings', apiTest(
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

    $articleData['description'] = ['description1', 'description2'];
    test('invalid description > array with multiple different strings', apiTest(
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

    $articleData['description'] = [true];
    test('invalid description > array with true', apiTest(
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

    $articleData['description'] = [false];
    test('invalid description > array with false', apiTest(
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

    $articleData['description'] = [true, true];
    test('invalid description > array with multiple true', apiTest(
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

    $articleData['description'] = [false, false];
    test('invalid description > array with multiple false', apiTest(
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

    $articleData['description'] = [true , false];
    test('invalid description > array with true false', apiTest(
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
    $articleData['category'] = 1;
    test('invalid category > positive integer', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = -1;
    test('invalid category > negative integer', apiTest(
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
    test('invalid category > false', apiTest(
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
    test('invalid category > true', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
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
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [1];
    test('invalid category > array with positive integer', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [-1];
    test('invalid category > array with negative integer', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [1, 1];
    test('invalid category > array with multiple same positive integers', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [1, 2];
    test('invalid category > array with multiple different positive integers', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [-1, -1];
    test('invalid category > array with multiple same negative integers', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [-1, -2];
    test('invalid category > array with multiple different negative integers', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = ['category'];
    test('invalid category > array with string', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = ['category1', 'category1'];
    test('invalid category > array with multiple same strings', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = ['category1', 'category2'];
    test('invalid category > array with multiple different strings', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [true];
    test('invalid category > array with true', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [false];
    test('invalid category > array with false', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [true, true];
    test('invalid category > array with multiple true', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [false, false];
    test('invalid category > array with multiple false', apiTest(
        'POST',
        'articles.store',
        422,
        $articleData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $articleData['category'] = [true , false];
    test('invalid category > array with true false', apiTest(
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
