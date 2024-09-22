<?php

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedUserData = updatedUserData) {
    /**
     * NAME TESTS
     */
    $updatedUserData['name'] = '';
    test('invalid name > empty', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.']
        ]]
    ));

    $updatedUserData['name'] = false;
    test('invalid name > false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = true;
    test('invalid name > true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [];
    test('invalid name > empty array', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.']
        ]]
    ));

    $updatedUserData['name'] = [1];
    test('invalid name > array with positive integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [-1];
    test('invalid name > array with negative integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [1, 1];
    test('invalid name > array with multiple same positive integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [1, 2];
    test('invalid name > array with multiple different positive integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [-1, -1];
    test('invalid name > array with multiple same negative integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [-1, -2];
    test('invalid name > array with multiple different negative integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = ['name'];
    test('invalid name > array with string', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = ['name1', 'name1'];
    test('invalid name > array with multiple same strings', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = ['name1', 'name2'];
    test('invalid name > array with multiple different strings', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [true];
    test('invalid name > array with true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [false];
    test('invalid name > array with false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [true, true];
    test('invalid name > array with multiple true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [false, false];
    test('invalid name > array with multiple false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = [true , false];
    test('invalid name > array with true false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['name'] = updatedUserData['name']; // reset name value



    /**
     * EMAIL TESTS
     */
    $updatedUserData['email'] = 'admin.example.com';
    test('invalid email > email format', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.']
        ]]
    ));

    $updatedUserData['email'] = 1;
    test('invalid email > positive integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = -1;
    test('invalid email > negative integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = false;
    test('invalid email > false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = true;
    test('invalid email > true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = '@a';
    test('invalid email > too short', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = 'loremipsumdolorsitametconsecteturadipiscingelitseddoetaliqualaborum@exampleemail.com';
    test('invalid email > too long', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must not be greater than 70 characters.']
        ]]
    ));

    $updatedUserData['email'] = [];
    test('invalid email > empty array', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field is required.']
        ]]
    ));

    $updatedUserData['email'] = [1];
    test('invalid email > array with positive integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [-1];
    test('invalid email > array with negative integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [1, 1];
    test('invalid email > array with multiple same positive integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [1, 2];
    test('invalid email > array with multiple different positive integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [-1, -1];
    test('invalid email > array with multiple same negative integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [-1, -2];
    test('invalid email > array with multiple different negative integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = ['email'];
    test('invalid email > array with string', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = ['email1', 'email1'];
    test('invalid email > array with multiple same strings', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = ['email1', 'email2'];
    test('invalid email > array with multiple different strings', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [true];
    test('invalid email > array with true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [false];
    test('invalid email > array with false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [true, true];
    test('invalid email > array with multiple true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [false, false];
    test('invalid email > array with multiple false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = [true , false];
    test('invalid email > array with true false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedUserData['email'] = updatedUserData['email']; // reset email value



    /**
     * PASSWORD TESTS
     */
    $updatedUserData['password'] = '';
    test('invalid password > empty password', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = 1;
    test('invalid password > positive integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = -1;
    test('invalid password > negative integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = false;
    test('invalid password > false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = true;
    test('invalid password > true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = 'L';
    test('invalid password > too short', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('invalid password > too long', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must not be greater than 50 characters.']
        ]]
    ));

    $updatedUserData['password'] = [];
    test('invalid password > empty array', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [1];
    test('invalid password > array with positive integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [-1];
    test('invalid password > array with negative integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [1, 1];
    test('invalid password > array with multiple same positive integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [1, 2];
    test('invalid password > array with multiple different positive integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [-1, -1];
    test('invalid password > array with multiple same negative integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [-1, -2];
    test('invalid password > array with multiple different negative integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = ['password'];
    test('invalid password > array with string', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = ['password1', 'password1'];
    test('invalid password > array with multiple same strings', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = ['password1', 'password2'];
    test('invalid password > array with multiple different strings', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [true];
    test('invalid password > array with true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [false];
    test('invalid password > array with false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [true, true];
    test('invalid password > array with multiple true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [false, false];
    test('invalid password > array with multiple false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [true , false];
    test('invalid password > array with true false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = updatedUserData['password']; // reset password value



    /**
     * ROLE TESTS
     */
    $updatedUserData['role'] = '';
    test('invalid role > empty', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The role field is required.']
        ]]
    ));

    $updatedUserData['role'] = 1;
    test('invalid role > positive integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = -1;
    test('invalid role > negative integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = 'invalid';
    test('invalid role > invalid', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [];
    test('invalid role > empty array', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The role field is required.']
        ]]
    ));

    $updatedUserData['role'] = [1];
    test('invalid role > array with positive integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [-1];
    test('invalid role > array with negative integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [1, 1];
    test('invalid role > array with multiple same positive integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [1, 2];
    test('invalid role > array with multiple different positive integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [-1, -1];
    test('invalid role > array with multiple same negative integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [-1, -2];
    test('invalid role > array with multiple different negative integers', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = ['role'];
    test('invalid role > array with string', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = ['role1', 'role1'];
    test('invalid role > array with multiple same strings', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = ['role1', 'role2'];
    test('invalid role > array with multiple different strings', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [true];
    test('invalid role > array with true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [false];
    test('invalid role > array with false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [true, true];
    test('invalid role > array with multiple true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [false, false];
    test('invalid role > array with multiple false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));

    $updatedUserData['role'] = [true , false];
    test('invalid role > array with true false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));
});
