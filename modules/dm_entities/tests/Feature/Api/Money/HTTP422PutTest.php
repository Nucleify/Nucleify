<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedMoneyData = updatedMoneyData) {
    /**
     * USER ID TESTS
     */
    $updatedMoneyData['user_id'] = '';
    test('invalid user_id > empty', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedMoneyData['user_id'] = 'user_id';
    test('invalid user_id > string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedMoneyData['user_id'] = false;
    test('invalid user_id > false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedMoneyData['user_id'] = [];
    test('invalid user_id > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedMoneyData['user_id'] = updatedMoneyData['user_id'];

    /**
     * COUNT TESTS
     */
    $updatedMoneyData['count'] = '';
    test('invalid count > empty', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field is required.'],
        ]]
    ));

    $updatedMoneyData['count'] = 'count';
    test('invalid count > string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.'],
        ]]
    ));

    $updatedMoneyData['count'] = false;
    test('invalid count > false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.'],
        ]]
    ));

    $updatedMoneyData['count'] = [];
    test('invalid count > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field is required.'],
        ]]
    ));

    $updatedMoneyData['count'] = updatedMoneyData['count'];

    /**
     * SENDER TESTS
     */
    $updatedMoneyData['sender'] = '';
    test('invalid sender > empty', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => ['The sender field is required.'],
        ]]
    ));

    $updatedMoneyData['sender'] = 1;
    test('invalid sender > integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ],
        ]]
    ));

    $updatedMoneyData['sender'] = false;
    test('invalid sender > false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ],
        ]]
    ));

    $updatedMoneyData['sender'] = true;
    test('invalid sender > true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ],
        ]]
    ));

    $updatedMoneyData['sender'] = [];
    test('invalid sender > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field is required.',
            ],
        ]]
    ));

    $updatedMoneyData['sender'] = updatedMoneyData['sender'];

    /**
     * RECEIVER TESTS
     */
    $updatedMoneyData['receiver'] = '';
    test('invalid receiver > empty', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => ['The receiver field is required.'],
        ]]
    ));

    $updatedMoneyData['receiver'] = 1;
    test('invalid receiver > integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ],
        ]]
    ));

    $updatedMoneyData['receiver'] = false;
    test('invalid receiver > false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ],
        ]]
    ));

    $updatedMoneyData['receiver'] = true;
    test('invalid receiver > true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ],
        ]]
    ));

    $updatedMoneyData['receiver'] = [];
    test('invalid receiver > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field is required.',
            ],
        ]]
    ));

    $updatedMoneyData['receiver'] = updatedMoneyData['receiver'];

    /**
     * TITLE TESTS
     */
    $updatedMoneyData['title'] = '';
    test('invalid title > empty', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $updatedMoneyData['title'] = 1;
    test('invalid title > integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedMoneyData['title'] = 'ti';
    test('invalid title > too short', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be at least 3 characters.'],
        ]]
    ));

    $updatedMoneyData['title'] = false;
    test('invalid title > false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedMoneyData['title'] = true;
    test('invalid title > true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedMoneyData['title'] = [];
    test('invalid title > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $updatedMoneyData['title'] = updatedMoneyData['title'];

    /**
     * DESCRIPTION TESTS
     */
    $updatedMoneyData['description'] = 1;
    test('invalid description > integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedMoneyData['description'] = 't';
    test('invalid description > too short', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 3 characters.'],
        ]]
    ));

    $updatedMoneyData['description'] = false;
    test('invalid description > false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedMoneyData['description'] = true;
    test('invalid description > true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedMoneyData['description'] = [];
    test('invalid description > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedMoneyData['description'] = updatedMoneyData['description'];

    /**
     * CATEGORY TESTS
     */
    $updatedMoneyData['category'] = 1;
    test('invalid category > integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedMoneyData['category'] = false;
    test('invalid category > false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedMoneyData['category'] = true;
    test('invalid category > true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedMoneyData['category'] = [];
    test('invalid category > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));
});
