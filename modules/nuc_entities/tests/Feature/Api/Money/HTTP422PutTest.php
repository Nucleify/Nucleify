<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('money-api-422');
uses()->group('money-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedMoneyData = updatedMoneyData) {
    /**
     * USER ID TESTS
     */
    $updatedMoneyData['user_id'] = '';
    test('user_id > empty', apiTest(
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
    test('user_id > string', apiTest(
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
    test('user_id > false', apiTest(
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
    test('user_id > empty array', apiTest(
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
    test('count > empty', apiTest(
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
    test('count > string', apiTest(
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
    test('count > false', apiTest(
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
    test('count > empty array', apiTest(
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
    test('sender > empty', apiTest(
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
    test('sender > integer', apiTest(
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
    test('sender > false', apiTest(
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
    test('sender > true', apiTest(
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
    test('sender > empty array', apiTest(
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
    test('receiver > empty', apiTest(
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
    test('receiver > integer', apiTest(
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
    test('receiver > false', apiTest(
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
    test('receiver > true', apiTest(
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
    test('receiver > empty array', apiTest(
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
    test('title > empty', apiTest(
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
    test('title > integer', apiTest(
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
    test('title > too short', apiTest(
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
    test('title > false', apiTest(
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
    test('title > true', apiTest(
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
    test('title > empty array', apiTest(
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
    test('description > integer', apiTest(
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
    test('description > too short', apiTest(
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
    test('description > false', apiTest(
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
    test('description > true', apiTest(
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
    test('description > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field is required.'],
        ]]
    ));

    $updatedMoneyData['description'] = updatedMoneyData['description'];

    /**
     * CATEGORY TESTS
     */
    $updatedMoneyData['category'] = 1;
    test('category > integer', apiTest(
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
    test('category > false', apiTest(
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
    test('category > true', apiTest(
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
    test('category > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));
});
