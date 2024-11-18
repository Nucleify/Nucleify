<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function($moneyData = moneyData) {
    /**
     * COUNT TESTS
     */
    $moneyData['count'] = '';
    test('invalid empty count', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field is required.']
        ]]
    ));

    $moneyData['count'] = 'count';
    test('invalid count string', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = false;
    test('invalid count false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [];
    test('invalid count > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field is required.']
        ]]
    ));

    $moneyData['count'] = [1];
    test('invalid count > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [-1];
    test('invalid count > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [1, 1];
    test('invalid count > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [1, 2];
    test('invalid count > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [-1, -1];
    test('invalid count > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [-1, -2];
    test('invalid count > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = ['count'];
    test('invalid count > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = ['count1', 'count1'];
    test('invalid count > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = ['count1', 'count2'];
    test('invalid count > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [true];
    test('invalid count > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [false];
    test('invalid count > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [true, true];
    test('invalid count > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [false, false];
    test('invalid count > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $moneyData['count'] = [true , false];
    test('invalid count > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));
    $moneyData['count'] = moneyData['count']; // reset count value


    /**
     * SENDER ID TESTS
     */
    $moneyData['sender_id'] = '';
    test('invalid empty sender_id', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field is required.']
        ]]
    ));

    $moneyData['sender_id'] = 'sender_id';
    test('invalid sender_id string', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = false;
    test('invalid sender_id false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [];
    test('invalid sender_id > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field is required.']
        ]]
    ));

    $moneyData['sender_id'] = [1];
    test('invalid sender_id > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [-1];
    test('invalid sender_id > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [1, 1];
    test('invalid sender_id > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [1, 2];
    test('invalid sender_id > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [-1, -1];
    test('invalid sender_id > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [-1, -2];
    test('invalid sender_id > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = ['receiver_id'];
    test('invalid sender_id > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = ['receiver_id1', 'receiver_id1'];
    test('invalid sender_id > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = ['receiver_id1', 'receiver_id2'];
    test('invalid sender_id > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [true];
    test('invalid sender_id > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [false];
    test('invalid sender_id > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [true, true];
    test('invalid sender_id > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [false, false];
    test('invalid sender_id > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = [true , false];
    test('invalid sender_id > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['sender_id']],
        ['errors' => [
            'sender_id' => ['The sender id field must be an integer.']
        ]]
    ));

    $moneyData['sender_id'] = moneyData['sender_id']; // reset receiver_id value



    /**
     * receiver id TESTS
     */
    $moneyData['receiver_id'] = '';
    test('invalid empty receiver_id', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field is required.']
        ]]
    ));

    $moneyData['receiver_id'] = 'receiver_id';
    test('invalid receiver_id string', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = false;
    test('invalid receiver_id false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [];
    test('invalid receiver_id > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field is required.']
        ]]
    ));

    $moneyData['receiver_id'] = [1];
    test('invalid receiver_id > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [-1];
    test('invalid receiver_id > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [1, 1];
    test('invalid receiver_id > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [1, 2];
    test('invalid receiver_id > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [-1, -1];
    test('invalid receiver_id > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [-1, -2];
    test('invalid receiver_id > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = ['receiver_id'];
    test('invalid receiver_id > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = ['receiver_id1', 'receiver_id1'];
    test('invalid receiver_id > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = ['receiver_id1', 'receiver_id2'];
    test('invalid receiver_id > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [true];
    test('invalid receiver_id > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [false];
    test('invalid receiver_id > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [true, true];
    test('invalid receiver_id > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [false, false];
    test('invalid receiver_id > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = [true , false];
    test('invalid receiver_id > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['receiver_id']],
        ['errors' => [
            'receiver_id' => ['The receiver id field must be an integer.']
        ]]
    ));

    $moneyData['receiver_id'] = moneyData['receiver_id']; // reset receiver_id value



    /**
     * TITLE TESTS
     */
    $moneyData['title'] = '';
    test('invalid title > empty', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.']
        ]]
    ));

    $moneyData['title'] = 1;
    test('invalid title > positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = -1;
    test('invalid title > negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = 'ti';
    test('invalid title > too short', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be at least 3 characters.']
        ]]
    ));

    $moneyData['title'] = false;
    test('invalid title > false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = true;
    test('invalid title > true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [];
    test('invalid title > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.']
        ]]
    ));

    $moneyData['title'] = [1];
    test('invalid title > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [-1];
    test('invalid title > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [1, 1];
    test('invalid title > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [1, 2];
    test('invalid title > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [-1, -1];
    test('invalid title > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [-1, -2];
    test('invalid title > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = ['title'];
    test('invalid title > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = ['title1', 'title1'];
    test('invalid title > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = ['title1', 'title2'];
    test('invalid title > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [true];
    test('invalid title > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [false];
    test('invalid title > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [true, true];
    test('invalid title > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [false, false];
    test('invalid title > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = [true , false];
    test('invalid title > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['title'] = moneyData['title']; // reset title value



    /**
     * DESCRIPTION TESTS
     */
    $moneyData['description'] = 1;
    test('invalid description > positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = -1;
    test('invalid description > negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = 't';
    test('invalid description > too short', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be at least 3 characters.']
        ]]
    ));

    $moneyData['description'] = false;
    test('invalid description > false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = true;
    test('invalid description > true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [];
    test('invalid description > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [1];
    test('invalid description > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [-1];
    test('invalid description > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [1, 1];
    test('invalid description > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [1, 2];
    test('invalid description > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [-1, -1];
    test('invalid description > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [-1, -2];
    test('invalid description > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = ['description'];
    test('invalid description > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = ['description1', 'description1'];
    test('invalid description > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = ['description1', 'description2'];
    test('invalid description > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [true];
    test('invalid description > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [false];
    test('invalid description > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [true, true];
    test('invalid description > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [false, false];
    test('invalid description > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = [true , false];
    test('invalid description > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $moneyData['description'] = moneyData['description']; // reset description value



    /**
     * CATEGORY TESTS
     */
    $moneyData['category'] = 1;
    test('invalid category > positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = -1;
    test('invalid category > negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));


    $moneyData['category'] = false;
    test('invalid category > false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = true;
    test('invalid category > true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [];
    test('invalid category > empty array', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [1];
    test('invalid category > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [-1];
    test('invalid category > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [1, 1];
    test('invalid category > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [1, 2];
    test('invalid category > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [-1, -1];
    test('invalid category > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [-1, -2];
    test('invalid category > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = ['category'];
    test('invalid category > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = ['category1', 'category1'];
    test('invalid category > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = ['category1', 'category2'];
    test('invalid category > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [true];
    test('invalid category > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [false];
    test('invalid category > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [true, true];
    test('invalid category > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [false, false];
    test('invalid category > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $moneyData['category'] = [true , false];
    test('invalid category > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $moneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));
});
