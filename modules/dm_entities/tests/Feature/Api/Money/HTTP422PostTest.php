<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($moneyData = moneyData) {
    /**
     * USER ID TESTS
     */
    $moneyData['user_id'] = '';
    test('invalid user_id > empty', apiTest(
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
    test('invalid user_id > string', apiTest(
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
    test('invalid user_id > false', apiTest(
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
    test('invalid user_id > empty array', apiTest(
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
    test('invalid count > empty', apiTest(
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
    test('invalid count > string', apiTest(
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
    test('invalid count > false', apiTest(
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
    test('invalid count > empty array', apiTest(
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
    test('invalid sender > empty', apiTest(
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
    test('invalid sender > integer', apiTest(
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
    test('invalid sender > false', apiTest(
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
    test('invalid sender > true', apiTest(
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
    test('invalid sender > empty array', apiTest(
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
    test('invalid receiver > empty', apiTest(
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
    test('invalid receiver > integer', apiTest(
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
    test('invalid receiver > false', apiTest(
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
    test('invalid receiver > true', apiTest(
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
    test('invalid receiver > empty array', apiTest(
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
    test('invalid title > empty', apiTest(
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
    test('invalid title > integer', apiTest(
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
    test('invalid title > too short', apiTest(
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
    test('invalid title > false', apiTest(
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
    test('invalid title > true', apiTest(
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
    test('invalid title > empty array', apiTest(
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
    test('invalid description > integer', apiTest(
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
    test('invalid description > too short', apiTest(
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
    test('invalid description > false', apiTest(
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
    test('invalid description > true', apiTest(
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
    test('invalid description > empty array', apiTest(
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

    $moneyData['description'] = moneyData['description'];

    /**
     * CATEGORY TESTS
     */
    $moneyData['category'] = 1;
    test('invalid category > integer', apiTest(
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
    test('invalid category > false', apiTest(
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
    test('invalid category > true', apiTest(
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
    test('invalid category > empty array', apiTest(
        'POST',
        'money.store',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));
});
