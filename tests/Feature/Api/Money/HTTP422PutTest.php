<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function($updatedMoneyData = updatedMoneyData) {
    /**
     * USER ID TESTS
     */
    $updatedMoneyData['user_id'] = '';
    test('invalid empty user_id', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = 'user_id';
    test('invalid user_id string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = false;
    test('invalid user_id false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
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
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [1];
    test('invalid user_id > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [-1];
    test('invalid user_id > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [1, 1];
    test('invalid user_id > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [1, 2];
    test('invalid user_id > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [-1, -1];
    test('invalid user_id > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [-1, -2];
    test('invalid user_id > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = ['receiver_id'];
    test('invalid user_id > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = ['receiver_id1', 'receiver_id1'];
    test('invalid user_id > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = ['receiver_id1', 'receiver_id2'];
    test('invalid user_id > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [true];
    test('invalid user_id > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [false];
    test('invalid user_id > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [true, true];
    test('invalid user_id > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [false, false];
    test('invalid user_id > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = [true , false];
    test('invalid user_id > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedMoneyData['user_id'] = updatedMoneyData['user_id']; // reset user_id value



    /**
     * COUNT TESTS
     */
    $updatedMoneyData['count'] = '';
    test('invalid empty count', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field is required.']
        ]]
    ));

    $updatedMoneyData['count'] = 'count';
    test('invalid count string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = false;
    test('invalid count false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
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
            'count' => ['The count field is required.']
        ]]
    ));

    $updatedMoneyData['count'] = [1];
    test('invalid count > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [-1];
    test('invalid count > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [1, 1];
    test('invalid count > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [1, 2];
    test('invalid count > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [-1, -1];
    test('invalid count > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [-1, -2];
    test('invalid count > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = ['count'];
    test('invalid count > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = ['count1', 'count1'];
    test('invalid count > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = ['count1', 'count2'];
    test('invalid count > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [true];
    test('invalid count > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [false];
    test('invalid count > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [true, true];
    test('invalid count > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [false, false];
    test('invalid count > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));

    $updatedMoneyData['count'] = [true , false];
    test('invalid count > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['count']],
        ['errors' => [
            'count' => ['The count field must be an integer.']
        ]]
    ));
    $updatedMoneyData['count'] = updatedMoneyData['count']; // reset count value



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
            'sender' => ['The sender field is required.']
        ]]
    ));

    $updatedMoneyData['sender'] = 1;
    test('invalid sender > positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = -1;
    test('invalid sender > negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
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
            ]
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
            ]
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
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [1];
    test('invalid sender > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [-1];
    test('invalid sender > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [1, 1];
    test('invalid sender > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [1, 2];
    test('invalid sender > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [-1, -1];
    test('invalid sender > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [-1, -2];
    test('invalid sender > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = ['sender'];
    test('invalid sender > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = ['sender1', 'sender1'];
    test('invalid sender > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = ['sender1', 'sender2'];
    test('invalid sender > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [true];
    test('invalid sender > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [false];
    test('invalid sender > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [true, true];
    test('invalid sender > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [false, false];
    test('invalid sender > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = [true , false];
    test('invalid sender > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['sender']],
        ['errors' => [
            'sender' => [
                'The sender field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['sender'] = updatedMoneyData['sender']; // reset sender value



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
            'receiver' => ['The receiver field is required.']
        ]]
    ));

    $updatedMoneyData['receiver'] = 1;
    test('invalid receiver > positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = -1;
    test('invalid receiver > negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
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
            ]
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
            ]
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
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [1];
    test('invalid receiver > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [-1];
    test('invalid receiver > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [1, 1];
    test('invalid receiver > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [1, 2];
    test('invalid receiver > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [-1, -1];
    test('invalid receiver > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [-1, -2];
    test('invalid receiver > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = ['receiver'];
    test('invalid receiver > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = ['receiver1', 'receiver1'];
    test('invalid receiver > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = ['receiver1', 'receiver2'];
    test('invalid receiver > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [true];
    test('invalid receiver > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [false];
    test('invalid receiver > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [true, true];
    test('invalid receiver > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [false, false];
    test('invalid receiver > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = [true , false];
    test('invalid receiver > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['receiver']],
        ['errors' => [
            'receiver' => [
                'The receiver field must be a string.',
            ]
        ]]
    ));

    $updatedMoneyData['receiver'] = updatedMoneyData['receiver']; // reset receiver value



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
            'title' => ['The title field is required.']
        ]]
    ));

    $updatedMoneyData['title'] = 1;
    test('invalid title > positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = -1;
    test('invalid title > negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
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
            'title' => ['The title field must be at least 3 characters.']
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
                'The title field must be at least 3 characters.'
            ]
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
                'The title field must be at least 3 characters.'
            ]
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
            'title' => ['The title field is required.']
        ]]
    ));

    $updatedMoneyData['title'] = [1];
    test('invalid title > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [-1];
    test('invalid title > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [1, 1];
    test('invalid title > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [1, 2];
    test('invalid title > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [-1, -1];
    test('invalid title > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [-1, -2];
    test('invalid title > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = ['title'];
    test('invalid title > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = ['title1', 'title1'];
    test('invalid title > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = ['title1', 'title2'];
    test('invalid title > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [true];
    test('invalid title > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [false];
    test('invalid title > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [true, true];
    test('invalid title > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [false, false];
    test('invalid title > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = [true , false];
    test('invalid title > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => [
                'The title field must be a string.',
                'The title field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['title'] = updatedMoneyData['title']; // reset title value



    /**
     * DESCRIPTION TESTS
     */
    $updatedMoneyData['description'] = 1;
    test('invalid description > positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = -1;
    test('invalid description > negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
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
            'description' => ['The description field must be at least 3 characters.']
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
                'The description field must be at least 3 characters.'
            ]
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
                'The description field must be at least 3 characters.'
            ]
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
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [1];
    test('invalid description > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [-1];
    test('invalid description > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [1, 1];
    test('invalid description > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [1, 2];
    test('invalid description > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [-1, -1];
    test('invalid description > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [-1, -2];
    test('invalid description > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = ['description'];
    test('invalid description > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = ['description1', 'description1'];
    test('invalid description > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = ['description1', 'description2'];
    test('invalid description > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [true];
    test('invalid description > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [false];
    test('invalid description > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [true, true];
    test('invalid description > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [false, false];
    test('invalid description > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = [true , false];
    test('invalid description > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => [
                'The description field must be a string.',
                'The description field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedMoneyData['description'] = updatedMoneyData['description']; // reset description value



    /**
     * CATEGORY TESTS
     */
    $updatedMoneyData['category'] = 1;
    test('invalid category > positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = -1;
    test('invalid category > negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
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
            'category' => ['The category field must be a string.']
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
            'category' => ['The category field must be a string.']
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
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [1];
    test('invalid category > array with positive integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [-1];
    test('invalid category > array with negative integer', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [1, 1];
    test('invalid category > array with multiple same positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [1, 2];
    test('invalid category > array with multiple different positive integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [-1, -1];
    test('invalid category > array with multiple same negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [-1, -2];
    test('invalid category > array with multiple different negative integers', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = ['category'];
    test('invalid category > array with string', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = ['category1', 'category1'];
    test('invalid category > array with multiple same strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = ['category1', 'category2'];
    test('invalid category > array with multiple different strings', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [true];
    test('invalid category > array with true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [false];
    test('invalid category > array with false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [true, true];
    test('invalid category > array with multiple true', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [false, false];
    test('invalid category > array with multiple false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedMoneyData['category'] = [true , false];
    test('invalid category > array with true false', apiTest(
        'PUT',
        'money.update',
        422,
        $updatedMoneyData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));
});
