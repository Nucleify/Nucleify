<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-api-422');
uses()->group('user-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($userData = userData) {
    /**
     * NAME TESTS
     */
    $userData['name'] = '';
    test('name > empty', apiTest(
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
    test('name > false', apiTest(
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
    test('name > true', apiTest(
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
    test('name > empty array', apiTest(
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
    test('email > email format', apiTest(
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
    test('email > integer', apiTest(
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
    test('email > false', apiTest(
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
    test('email > true', apiTest(
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
    test('email > too short', apiTest(
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
    test('email > too long', apiTest(
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
    test('email > empty array', apiTest(
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
    test('password > empty password', apiTest(
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
    test('password > integer', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => [
                'The password field must be at least 8 characters.',
                'The password field confirmation does not match.',
            ],
        ]]
    ));

    $userData['password'] = false;
    test('password > false', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => [
                'The password field must be at least 8 characters.',
                'The password field confirmation does not match.',
            ],
        ]]
    ));

    $userData['password'] = true;
    test('password > true', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => [
                'The password field must be at least 8 characters.',
                'The password field confirmation does not match.',
            ],
        ]]
    ));

    $userData['password'] = 'L';
    test('password > too short', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => [
                'The password field must be at least 8 characters.',
                'The password field confirmation does not match.',
            ],
        ]]
    ));

    $userData['password'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('password > too long', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => [
                'The password field must not be greater than 50 characters.',
                'The password field confirmation does not match.',
            ],
        ]]
    ));

    $userData['password'] = [];
    test('password > empty array', apiTest(
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
    test('role > empty', apiTest(
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
    test('role > integer', apiTest(
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
    test('role > invalid', apiTest(
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
    test('role > empty array', apiTest(
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
