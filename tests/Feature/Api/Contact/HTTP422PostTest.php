<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function($contactData = contactData) {
    /**
     * USER ID TESTS
     */
    $contactData['user_id'] = '';
    test('invalid empty user_id', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.']
        ]]
    ));

    $contactData['user_id'] = 'user_id';
    test('invalid user_id string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = false;
    test('invalid user_id false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [];
    test('invalid user_id > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.']
        ]]
    ));

    $contactData['user_id'] = [1];
    test('invalid user_id > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [-1];
    test('invalid user_id > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [1, 1];
    test('invalid user_id > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [1, 2];
    test('invalid user_id > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [-1, -1];
    test('invalid user_id > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [-1, -2];
    test('invalid user_id > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = ['user_id'];
    test('invalid user_id > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = ['user_id1', 'user_id1'];
    test('invalid user_id > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = ['user_id1', 'user_id2'];
    test('invalid user_id > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [true];
    test('invalid user_id > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [false];
    test('invalid user_id > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [true, true];
    test('invalid user_id > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [false, false];
    test('invalid user_id > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = [true , false];
    test('invalid user_id > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $contactData['user_id'] = contactData['user_id']; // reset user_id value


    /**
     * FIRST NAME TESTS
     */
    $contactData['first_name'] = '';
    test('invalid empty first_name', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field is required.']
        ]]
    ));

    $contactData['first_name'] = [];
    test('invalid first_name array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field is required.']
        ]]
    ));

    $contactData['first_name'] = 1;
    test('invalid first_name integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = false;
    test('invalid first_name false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = true;
    test('invalid first_name true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = 'L';
    test('invalid first_name too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field must be at least 3 characters.']
        ]]
    ));

    $contactData['first_name'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('invalid first_name too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field must not be greater than 30 characters.']
        ]]
    ));

    $contactData['first_name'] = [];
    test('invalid first_name > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field is required.']
        ]]
    ));

    $contactData['first_name'] = [1];
    test('invalid first_name > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [-1];
    test('invalid first_name > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [1, 1];
    test('invalid first_name > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [1, 2];
    test('invalid first_name > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [-1, -1];
    test('invalid first_name > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [-1, -2];
    test('invalid first_name > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = ['first_name'];
    test('invalid first_name > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = ['first_name1', 'first_name1'];
    test('invalid first_name > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = ['first_name1', 'first_name2'];
    test('invalid first_name > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [true];
    test('invalid first_name > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [false];
    test('invalid first_name > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [true, true];
    test('invalid first_name > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [false, false];
    test('invalid first_name > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = [true , false];
    test('invalid first_name > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.'
            ]
        ]]
    ));

    $contactData['first_name'] = contactData['first_name']; // reset first_name value


    /**
     * LAST NAME TESTS
     */
    $contactData['last_name'] = 1;
    test('invalid last_name integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = false;
    test('invalid last_name false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = true;
    test('invalid last_name true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = 'L';
    test('invalid last_name too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => ['The last name field must be at least 3 characters.']
        ]]
    ));

    $contactData['last_name'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('invalid last_name too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => ['The last name field must not be greater than 30 characters.']
        ]]
    ));

    $contactData['last_name'] = [];
    test('invalid last_name > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' =>[
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [1];
    test('invalid last_name > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [-1];
    test('invalid last_name > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [1, 1];
    test('invalid last_name > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [1, 2];
    test('invalid last_name > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [-1, -1];
    test('invalid last_name > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [-1, -2];
    test('invalid last_name > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = ['last_name'];
    test('invalid last_name > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = ['last_name1', 'last_name1'];
    test('invalid last_name > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = ['last_name1', 'last_name2'];
    test('invalid last_name > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [true];
    test('invalid last_name > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [false];
    test('invalid last_name > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [true, true];
    test('invalid last_name > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [false, false];
    test('invalid last_name > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = [true , false];
    test('invalid last_name > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.'
            ]
        ]]
    ));

    $contactData['last_name'] = contactData['last_name']; // reset last_name value



    /**
     * EMAIL TESTS
     */
    $contactData['email'] = 'admin.example.com';
    test('invalid email format', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.']
        ]]
    ));

    $contactData['email'] = 1;
    test('invalid email integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.'
            ]
        ]]
    ));

    $contactData['email'] = false;
    test('invalid email false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.'
            ]
        ]]
    ));

    $contactData['email'] = true;
    test('invalid email true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.'
            ]
        ]]
    ));

    $contactData['email'] = [];
    test('invalid email > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [1];
    test('invalid email > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [-1];
    test('invalid email > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [1, 1];
    test('invalid email > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [1, 2];
    test('invalid email > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [-1, -1];
    test('invalid email > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [-1, -2];
    test('invalid email > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = ['email'];
    test('invalid email > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = ['email1', 'email1'];
    test('invalid email > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = ['email1', 'email2'];
    test('invalid email > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [true];
    test('invalid email > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [false];
    test('invalid email > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [true, true];
    test('invalid email > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [false, false];
    test('invalid email > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = [true , false];
    test('invalid email > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $contactData['email'] = contactData['email']; // reset email value



    /**
     * PERSONAL PHONE TESTS
     */
    $contactData['personal_phone'] = false;
    test('invalid personal_phone false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = true;
    test('invalid personal_phone true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = '9876543';
    test('invalid personal_phone too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = '98 76 543 210 123';
    test('invalid personal_phone too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must not be greater than 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [];
    test('invalid personal_phone > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [1];
    test('invalid personal_phone > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [-1];
    test('invalid personal_phone > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [1, 1];
    test('invalid personal_phone > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [1, 2];
    test('invalid personal_phone > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [-1, -1];
    test('invalid personal_phone > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [-1, -2];
    test('invalid personal_phone > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = ['personal_phone'];
    test('invalid personal_phone > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = ['personal_phone1', 'personal_phone1'];
    test('invalid personal_phone > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = ['personal_phone1', 'personal_phone2'];
    test('invalid personal_phone > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [true];
    test('invalid personal_phone > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [false];
    test('invalid personal_phone > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [true, true];
    test('invalid personal_phone > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [false, false];
    test('invalid personal_phone > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = [true , false];
    test('invalid personal_phone > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['personal_phone'] = contactData['personal_phone']; // reset personal_phone value



    /**
     * WORK PHONE TESTS
     */
    $contactData['work_phone'] = false;
    test('invalid work_phone false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['work_phone'] = true;
    test('invalid work_phone true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['work_phone'] = '9876543';
    test('invalid work_phone too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['work_phone'] = '98 76 543 210 123';
    test('invalid work_phone too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must not be greater than 9 characters.',
                'The work phone field format is invalid.'
            ]
        ]]
    ));

    $contactData['work_phone'] = [];
    test('invalid work_phone > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [1];
    test('invalid work_phone > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [-1];
    test('invalid work_phone > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [1, 1];
    test('invalid work_phone > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [1, 2];
    test('invalid work_phone > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [-1, -1];
    test('invalid work_phone > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [-1, -2];
    test('invalid work_phone > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = ['work_phone'];
    test('invalid work_phone > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = ['work_phone1', 'work_phone1'];
    test('invalid work_phone > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = ['work_phone1', 'work_phone2'];
    test('invalid work_phone > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [true];
    test('invalid work_phone > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [false];
    test('invalid work_phone > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [true, true];
    test('invalid work_phone > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [false, false];
    test('invalid work_phone > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = [true , false];
    test('invalid work_phone > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ]
        ]]
    ));

    $contactData['work_phone'] = contactData['work_phone']; // reset work_phone value



    /**
     * ADDRESS TESTS
     */
    $contactData['address'] = [];
    test('invalid address array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.'
            ]
        ]]
    ));

    $contactData['address'] = 1;
    test('invalid address integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.'
            ]
        ]]
    ));

    $contactData['address'] = false;
    test('invalid address false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.'
            ]
        ]]
    ));

    $contactData['address'] = true;
    test('invalid address true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.'
            ]
        ]]
    ));

    $contactData['address'] = 'Lorem ipsum.';
    test('invalid address too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => ['The address field must be at least 15 characters.']
        ]]
    ));

    $contactData['address'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
    test('invalid address too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => ['The address field must not be greater than 100 characters.']
        ]]
    ));

    $contactData['address'] = [];
    test('invalid address > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [1];
    test('invalid address > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [-1];
    test('invalid address > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [1, 1];
    test('invalid address > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [1, 2];
    test('invalid address > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [-1, -1];
    test('invalid address > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [-1, -2];
    test('invalid address > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = ['address'];
    test('invalid address > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = ['address1', 'address1'];
    test('invalid address > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = ['address1', 'address2'];
    test('invalid address > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [true];
    test('invalid address > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [false];
    test('invalid address > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [true, true];
    test('invalid address > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [false, false];
    test('invalid address > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = [true , false];
    test('invalid address > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $contactData['address'] = contactData['address']; // reset address value



    /**
     * BIRTHDAY TESTS
     */
    $contactData['birthday'] = 1;
    test('invalid birthday > positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = -1;
    test('invalid birthday > negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = 'birthday';
    test('invalid birthday > string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = true;
    test('invalid birthday > true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = false;
    test('invalid birthday > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = '30.30.2023';
    test('invalid birthday > invalid date', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [];
    test('invalid birthday > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [1];
    test('invalid birthday > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [-1];
    test('invalid birthday > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [1, 1];
    test('invalid birthday > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [1, 2];
    test('invalid birthday > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [-1, -1];
    test('invalid birthday > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [-1, -2];
    test('invalid birthday > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = ['birthday'];
    test('invalid birthday > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = ['birthday1', 'birthday1'];
    test('invalid birthday > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = ['birthday1', 'birthday2'];
    test('invalid birthday > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [true];
    test('invalid birthday > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [false];
    test('invalid birthday > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [true, true];
    test('invalid birthday > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [false, false];
    test('invalid birthday > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = [true , false];
    test('invalid birthday > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = contactData['birthday']; // reset birthday value



    /**
     * CONTACT GROUPS TESTS
     */
    $contactData['contact_groups'] = false;
    test('invalid contact_groups > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = 'contact_groups';
    test('invalid contact_groups > string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [];
    test('invalid contact_groups > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [1];
    test('invalid contact_groups > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [-1];
    test('invalid contact_groups > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [1, 1];
    test('invalid contact_groups > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [1, 2];
    test('invalid contact_groups > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [-1, -1];
    test('invalid contact_groups > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [-1, -2];
    test('invalid contact_groups > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = ['contact_groups'];
    test('invalid contact_groups > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = ['contact_groups1', 'contact_groups1'];
    test('invalid contact_groups > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = ['contact_groups1', 'contact_groups2'];
    test('invalid contact_groups > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [true];
    test('invalid contact_groups > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [false];
    test('invalid contact_groups > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [true, true];
    test('invalid contact_groups > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [false, false];
    test('invalid contact_groups > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = [true , false];
    test('invalid contact_groups > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $contactData['contact_groups'] = contactData['contact_groups']; // reset contact_groups value



    /**
     * ROLE TESTS
     */
    $contactData['role'] = 1;
    test('invalid role > integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = 'example';
    test('invalid role > example', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [];
    test('invalid role > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [1];
    test('invalid role > array with positive integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [-1];
    test('invalid role > array with negative integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [1, 1];
    test('invalid role > array with multiple same positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [1, 2];
    test('invalid role > array with multiple different positive integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [-1, -1];
    test('invalid role > array with multiple same negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [-1, -2];
    test('invalid role > array with multiple different negative integers', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = ['role'];
    test('invalid role > array with string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = ['role1', 'role1'];
    test('invalid role > array with multiple same strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = ['role1', 'role2'];
    test('invalid role > array with multiple different strings', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [true];
    test('invalid role > array with true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [false];
    test('invalid role > array with false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [true, true];
    test('invalid role > array with multiple true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [false, false];
    test('invalid role > array with multiple false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $contactData['role'] = [true , false];
    test('invalid role > array with true false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));
});
