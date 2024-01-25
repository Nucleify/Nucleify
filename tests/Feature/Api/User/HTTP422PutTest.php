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
    test('validation error no name', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.']
        ]]
    ));

    $updatedUserData['name'] = [];
    test('validation error invalid name array', apiTest(
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
    test('validation error invalid name false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be at least 3 characters.',
                'The name field must be a string.'
            ]
        ]]
    ));

    $updatedUserData['name'] = true;
    test('validation error invalid name true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => [
                'The name field must be at least 3 characters.',
                'The name field must be a string.'
            ]
        ]]
    ));
    $updatedUserData['name'] = updatedUserData['name']; // reset name value


    /**
     * EMAIL TESTS
     */
    $updatedUserData['email'] = 'admin.example.com';
    test('validation error wrong email format', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.']
        ]]
    ));

    $updatedUserData['email'] = [];
    test('validation error email array', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field is required.']
        ]]
    ));

    $updatedUserData['email'] = 1;
    test('validation error email integer', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.'
            ]
        ]]
    ));

    $updatedUserData['email'] = false;
    test('validation error email false', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.'
            ]
        ]]
    ));

    $updatedUserData['email'] = true;
    test('validation error email true', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.'
            ]
        ]]
    ));

    $updatedUserData['email'] = '@a';
    test('validation error email too short', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.'
            ]
        ]]
    ));

    $updatedUserData['email'] = 'loremipsumdolorsitametconsecteturadipiscingelitseddoetaliqualaborum@exampleemail.com';
    test('validation error email too long', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must not be greater than 70 characters.']
        ]]
    ));
    $updatedUserData['email'] = updatedUserData['email']; // reset email value


    /**
     * PASSWORD TESTS
     */
    $updatedUserData['password'] = '';
    test('validation error no password', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must be at least 8 characters.']
        ]]
    ));

    $updatedUserData['password'] = [];
    test('validation error password array', apiTest(
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
    test('validation error password integer', apiTest(
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
    test('validation error password false', apiTest(
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
    test('validation error password true', apiTest(
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
    test('validation error password too short', apiTest(
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
    test('validation error password too long', apiTest(
        'PUT',
        'users.update',
        422,
        $updatedUserData,
        ['errors' => ['password']],
        ['errors' => [
            'password' => ['The password field must not be greater than 50 characters.']
        ]]
    ));
    $updatedUserData['password'] = updatedUserData['password']; // reset password value


    /**
     * ROLE TESTS
     */
    $updatedUserData['role'] = [];
    test('validation error role array', apiTest(
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
    test('validation error role integer', apiTest(
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
    test('validation error role invalid', apiTest(
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
