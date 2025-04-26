<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($userData = userData) {
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
            'name' => ['The name field is required.'],
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
                'The name field must be at least 3 characters.',
            ],
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
                'The name field must be at least 3 characters.',
            ],
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
            'name' => ['The name field is required.'],
        ]]
    ));

    $userData['name'] = userData['name'];

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
            'email' => ['The email field must be a valid email address.'],
        ]]
    ));

    $userData['email'] = 1;
    test('invalid email > integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.',
            ],
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
                'The email field must be at least 3 characters.',
            ],
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
                'The email field must be at least 3 characters.',
            ],
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
                'The email field must be at least 3 characters.',
            ],
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
            'email' => ['The email field must not be greater than 70 characters.'],
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
            'email' => ['The email field is required.'],
        ]]
    ));

    $userData['email'] = userData['email'];

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
            'password' => ['The password field is required.'],
        ]]
    ));

    $userData['password'] = 1;
    test('invalid password > integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.'],
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
            'password' => ['The password field must be at least 8 characters.'],
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
            'password' => ['The password field must be at least 8 characters.'],
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
            'password' => ['The password field must be at least 8 characters.'],
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
            'password' => ['The password field must not be greater than 50 characters.'],
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
            'password' => ['The password field is required.'],
        ]]
    ));

    $userData['password'] = userData['password'];

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
            'role' => ['The role field is required.'],
        ]]
    ));

    $userData['role'] = 1;
    test('invalid role > integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.'],
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
            'role' => ['The selected role is invalid.'],
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
            'role' => ['The role field is required.'],
        ]]
    ));
});
