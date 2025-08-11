<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-api-422');
uses()->group('user-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedUserData = updatedUserData) {
    /**
     * NAME TESTS
     */
    $updatedUserData['name'] = '';
    test('name > empty', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $updatedUserData['name'] = false;
    test('name > false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedUserData['name'] = true;
    test('name > true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be a string.',
                'The name field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedUserData['name'] = [];
    test('name > empty array', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $updatedUserData['name'] = updatedUserData['name'];

    /**
     * EMAIL TESTS
     */
    $updatedUserData['email'] = 'admin.example.com';
    test('email > email format', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.'],
        ]]
    ));

    $updatedUserData['email'] = 1;
    test('email > integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedUserData['email'] = false;
    test('email > false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedUserData['email'] = true;
    test('email > true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedUserData['email'] = '@a';
    test('email > too short', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedUserData['email'] = 'loremipsumdolorsitametconsecteturadipiscingelitseddoetaliqualaborum@exampleemail.com';
    test('email > too long', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must not be greater than 70 characters.'],
        ]]
    ));

    $updatedUserData['email'] = [];
    test('email > empty array', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field is required.'],
        ]]
    ));

    $updatedUserData['email'] = updatedUserData['email'];

    /**
     * PASSWORD TESTS
     */
    $updatedUserData['password'] = '';
    test('password > empty password', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.'],
        ]]
    ));

    $updatedUserData['password'] = 1;
    test('password > integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.'],
        ]]
    ));

    $updatedUserData['password'] = false;
    test('password > false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.'],
        ]]
    ));

    $updatedUserData['password'] = true;
    test('password > true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.'],
        ]]
    ));

    $updatedUserData['password'] = 'L';
    test('password > too short', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.'],
        ]]
    ));

    $updatedUserData['password'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('password > too long', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must not be greater than 50 characters.'],
        ]]
    ));

    $updatedUserData['password'] = [];
    test('password > empty array', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.'],
        ]]
    ));

    $updatedUserData['password'] = updatedUserData['password'];

    /**
     * ROLE TESTS
     */
    $updatedUserData['role'] = '';
    test('role > empty', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The role field is required.'],
        ]]
    ));

    $updatedUserData['role'] = 1;
    test('role > integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.'],
        ]]
    ));

    $updatedUserData['role'] = 'invalid';
    test('role > invalid', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.'],
        ]]
    ));

    $updatedUserData['role'] = [];
    test('role > empty array', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The role field is required.'],
        ]]
    ));
});
