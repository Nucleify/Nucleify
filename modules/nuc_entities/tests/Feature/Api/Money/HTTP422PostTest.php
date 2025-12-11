<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('money-api-422');
uses()->group('money-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($moneyData = moneyData) {
    /**
     * USER ID TESTS
     */
    $moneyData['user_id'] = '';
    test('user_id > empty', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $moneyData['user_id'] = 'user_id';
    test('user_id > string', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $moneyData['user_id'] = false;
    test('user_id > false', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $moneyData['user_id'] = [];
    test('user_id > empty array', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $moneyData['user_id'] = moneyData['user_id'];

    /**
     * COUNT TESTS
     */
    $moneyData['count'] = '';
    test('count > empty', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field is required.'],
        ]]
    ));

    $moneyData['count'] = 'count';
    test('count > string', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.'],
        ]]
    ));

    $moneyData['count'] = false;
    test('count > false', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.'],
        ]]
    ));

    $moneyData['count'] = [];
    test('count > empty array', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field is required.'],
        ]]
    ));

    $moneyData['count'] = moneyData['count'];

    /**
     * SENDER TESTS
     */
    $moneyData['sender'] = '';
    test('sender > empty', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => ['The sender field is required.'],
        ]]
    ));

    $moneyData['sender'] = 1;
    test('sender > integer', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ],
        ]]
    ));

    $moneyData['sender'] = false;
    test('sender > false', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ],
        ]]
    ));

    $moneyData['sender'] = true;
    test('sender > true', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ],
        ]]
    ));

    $moneyData['sender'] = [];
    test('sender > empty array', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field is required.',
            ],
        ]]
    ));

    $moneyData['sender'] = moneyData['sender'];

    /**
     * RECEIVER TESTS
     */
    $moneyData['receiver'] = '';
    test('receiver > empty', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => ['The receiver field is required.'],
        ]]
    ));

    $moneyData['receiver'] = 1;
    test('receiver > integer', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ],
        ]]
    ));

    $moneyData['receiver'] = false;
    test('receiver > false', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ],
        ]]
    ));

    $moneyData['receiver'] = true;
    test('receiver > true', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ],
        ]]
    ));

    $moneyData['receiver'] = [];
    test('receiver > empty array', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field is required.',
            ],
        ]]
    ));

    $moneyData['receiver'] = moneyData['receiver'];

    /**
     * TITLE TESTS
     */
    $moneyData['title'] = '';
    test('title > empty', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $moneyData['title'] = 1;
    test('title > integer', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $moneyData['title'] = 'ti';
    test('title > too short', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be at least 3 characters.'],
        ]]
    ));

    $moneyData['title'] = false;
    test('title > false', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $moneyData['title'] = true;
    test('title > true', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.',
            ],
        ]]
    ));

    $moneyData['title'] = [];
    test('title > empty array', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $moneyData['title'] = moneyData['title'];

    /**
     * DESCRIPTION TESTS
     */
    $moneyData['description'] = 1;
    test('description > integer', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $moneyData['description'] = 't';
    test('description > too short', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 3 characters.'],
        ]]
    ));

    $moneyData['description'] = false;
    test('description > false', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $moneyData['description'] = true;
    test('description > true', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.',
            ],
        ]]
    ));

    $moneyData['description'] = [];
    test('description > empty array', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field is required.'],
        ]]
    ));

    $moneyData['description'] = moneyData['description'];

    /**
     * CATEGORY TESTS
     */
    $moneyData['category'] = 1;
    test('category > integer', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $moneyData['category'] = false;
    test('category > false', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $moneyData['category'] = true;
    test('category > true', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $moneyData['category'] = [];
    test('category > empty array', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field is required.'],
        ]]
    ));
});
