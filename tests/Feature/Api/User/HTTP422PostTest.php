<?php

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function($userData = userData) {
    /**
     * NAME TESTS
     */
    $userData['name'] = '';
    test('invalid name > empty', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.']
        ]]
    ));

    $userData['name'] = false;
    test('invalid name > false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = true;
    test('invalid name > true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [];
    test('invalid name > empty array', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.']
        ]]
    ));

    $userData['name'] = [1];
    test('invalid name > array with positive integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [-1];
    test('invalid name > array with negative integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [1, 1];
    test('invalid name > array with multiple same positive integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [1, 2];
    test('invalid name > array with multiple different positive integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [-1, -1];
    test('invalid name > array with multiple same negative integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [-1, -2];
    test('invalid name > array with multiple different negative integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = ['name'];
    test('invalid name > array with string', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = ['name1', 'name1'];
    test('invalid name > array with multiple same strings', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = ['name1', 'name2'];
    test('invalid name > array with multiple different strings', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [true];
    test('invalid name > array with true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [false];
    test('invalid name > array with false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [true, true];
    test('invalid name > array with multiple true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [false, false];
    test('invalid name > array with multiple false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = [true , false];
    test('invalid name > array with true false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['name'] = userData['name']; // reset name value



    /**
     * EMAIL TESTS
     */
    $userData['email'] = 'admin.example.com';
    test('invalid email > email format', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.']
        ]]
    ));

    $userData['email'] = 1;
    test('invalid email > positive integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = -1;
    test('invalid email > negative integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = false;
    test('invalid email > false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = true;
    test('invalid email > true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = '@a';
    test('invalid email > too short', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = 'loremipsumdolorsitametconsecteturadipiscingelitseddoetaliqualaborum@exampleemail.com';
    test('invalid email > too long', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must not be greater than 70 characters.']
        ]]
    ));

    $userData['email'] = [];
    test('invalid email > empty array', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field is required.']
        ]]
    ));

    $userData['email'] = [1];
    test('invalid email > array with positive integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [-1];
    test('invalid email > array with negative integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [1, 1];
    test('invalid email > array with multiple same positive integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [1, 2];
    test('invalid email > array with multiple different positive integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [-1, -1];
    test('invalid email > array with multiple same negative integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [-1, -2];
    test('invalid email > array with multiple different negative integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = ['email'];
    test('invalid email > array with string', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = ['email1', 'email1'];
    test('invalid email > array with multiple same strings', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = ['email1', 'email2'];
    test('invalid email > array with multiple different strings', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [true];
    test('invalid email > array with true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [false];
    test('invalid email > array with false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [true, true];
    test('invalid email > array with multiple true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [false, false];
    test('invalid email > array with multiple false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = [true , false];
    test('invalid email > array with true false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $userData['email'] = userData['email']; // reset email value



    /**
     * PASSWORD TESTS
     */
    $userData['password'] = '';
    test('invalid password > empty password', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field is required.']
        ]]
    ));

    $userData['password'] = 1;
    test('invalid password > positive integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = -1;
    test('invalid password > negative integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = false;
    test('invalid password > false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = true;
    test('invalid password > true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = 'L';
    test('invalid password > too short', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('invalid password > too long', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must not be greater than 50 characters.']
        ]]
    ));

    $userData['password'] = [];
    test('invalid password > empty array', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field is required.']
        ]]
    ));

    $userData['password'] = [1];
    test('invalid password > array with positive integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [-1];
    test('invalid password > array with negative integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [1, 1];
    test('invalid password > array with multiple same positive integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [1, 2];
    test('invalid password > array with multiple different positive integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [-1, -1];
    test('invalid password > array with multiple same negative integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [-1, -2];
    test('invalid password > array with multiple different negative integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = ['password'];
    test('invalid password > array with string', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = ['password1', 'password1'];
    test('invalid password > array with multiple same strings', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = ['password1', 'password2'];
    test('invalid password > array with multiple different strings', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [true];
    test('invalid password > array with true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [false];
    test('invalid password > array with false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [true, true];
    test('invalid password > array with multiple true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [false, false];
    test('invalid password > array with multiple false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = [true , false];
    test('invalid password > array with true false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $userData['password'] = userData['password']; // reset password value



    /**
     * ROLE TESTS
     */
    $userData['role'] = '';
    test('invalid role > empty', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The role field is required.']
        ]]
    ));

    $userData['role'] = 1;
    test('invalid role > positive integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = -1;
    test('invalid role > negative integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = 'invalid';
    test('invalid role > invalid', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [];
    test('invalid role > empty array', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The role field is required.']
        ]]
    ));

    $userData['role'] = [1];
    test('invalid role > array with positive integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [-1];
    test('invalid role > array with negative integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [1, 1];
    test('invalid role > array with multiple same positive integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [1, 2];
    test('invalid role > array with multiple different positive integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [-1, -1];
    test('invalid role > array with multiple same negative integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [-1, -2];
    test('invalid role > array with multiple different negative integers', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = ['role'];
    test('invalid role > array with string', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = ['role1', 'role1'];
    test('invalid role > array with multiple same strings', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = ['role1', 'role2'];
    test('invalid role > array with multiple different strings', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [true];
    test('invalid role > array with true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [false];
    test('invalid role > array with false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [true, true];
    test('invalid role > array with multiple true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [false, false];
    test('invalid role > array with multiple false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $userData['role'] = [true , false];
    test('invalid role > array with true false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));
});
