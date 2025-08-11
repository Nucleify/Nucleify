<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-api-422');
uses()->group('contact-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedContactData = updatedContactData) {
    /**
     * USER ID TESTS
     */
    $updatedContactData['user_id'] = '';
    test('user_id > empty', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedContactData['user_id'] = 'user_id';
    test('user_id > string', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedContactData['user_id'] = false;
    test('user_id > false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedContactData['user_id'] = [];
    test('user_id > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedContactData['user_id'] = updatedContactData['user_id'];

    /**
     * FIRST NAME TESTS
     */
    $updatedContactData['first_name'] = '';
    test('first_name > empty', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field is required.'],
        ]]
    ));

    $updatedContactData['first_name'] = 1;
    test('first_name > integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['first_name'] = false;
    test('first_name > false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['first_name'] = true;
    test('first_name > true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['first_name'] = 'L';
    test('first_name > too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field must be at least 3 characters.'],
        ]]
    ));

    $updatedContactData['first_name'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('first_name > too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field must not be greater than 30 characters.'],
        ]]
    ));

    $updatedContactData['first_name'] = [];
    test('first_name > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field is required.'],
        ]]
    ));

    $updatedContactData['first_name'] = updatedContactData['first_name'];

    /**
     * LAST NAME TESTS
     */
    $updatedContactData['last_name'] = 1;
    test('last_name > integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['last_name'] = false;
    test('last_name > false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['last_name'] = true;
    test('last_name > true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['last_name'] = 'L';
    test('last_name > too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => ['The last name field must be at least 3 characters.'],
        ]]
    ));

    $updatedContactData['last_name'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('last_name > too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => ['The last name field must not be greater than 30 characters.'],
        ]]
    ));

    $updatedContactData['last_name'] = [];
    test('last_name > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['last_name'] = updatedContactData['last_name'];

    /**
     * EMAIL TESTS
     */
    $updatedContactData['email'] = 'admin.example.com';
    test('email > format', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.'],
        ]]
    ));

    $updatedContactData['email'] = 1;
    test('email > integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.',
            ],
        ]]
    ));

    $updatedContactData['email'] = false;
    test('email > false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.',
            ],
        ]]
    ));

    $updatedContactData['email'] = true;
    test('email > true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.',
            ],
        ]]
    ));

    $updatedContactData['email'] = [];
    test('email > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.',
            ],
        ]]
    ));

    $updatedContactData['email'] = updatedContactData['email'];

    /**
     * PERSONAL PHONE TESTS
     */
    $updatedContactData['personal_phone'] = false;
    test('personal_phone > false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $updatedContactData['personal_phone'] = true;
    test('personal_phone > true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $updatedContactData['personal_phone'] = '9876543';
    test('personal_phone > too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $updatedContactData['personal_phone'] = '98 76 543 210 123';
    test('personal_phone > too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must not be greater than 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $updatedContactData['personal_phone'] = [];
    test('personal_phone > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $updatedContactData['personal_phone'] = updatedContactData['personal_phone'];

    /**
     * WORK PHONE TESTS
     */
    $updatedContactData['work_phone'] = false;
    test('work_phone > false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.',
            ],
        ]]
    ));

    $updatedContactData['work_phone'] = true;
    test('work_phone > true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.',
            ],
        ]]
    ));

    $updatedContactData['work_phone'] = '9876543';
    test('work_phone > too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.',
            ],
        ]]
    ));

    $updatedContactData['work_phone'] = '98 76 543 210 123';
    test('work_phone > too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must not be greater than 9 characters.',
                'The work phone field format is invalid.',
            ],
        ]]
    ));

    $updatedContactData['work_phone'] = [];
    test('work_phone > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.',
            ],
        ]]
    ));

    $updatedContactData['work_phone'] = updatedContactData['work_phone'];

    /**
     * ADDRESS TESTS
     */
    $updatedContactData['address'] = 1;
    test('address > integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['address'] = false;
    test('address > false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['address'] = true;
    test('address > true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.',
            ],
        ]]
    ));

    $updatedContactData['address'] = 'Lorem ipsum.';
    test('address > too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => ['The address field must be at least 15 characters.'],
        ]]
    ));

    $updatedContactData['address'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
    test('address > too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => ['The address field must not be greater than 100 characters.'],
        ]]
    ));

    $updatedContactData['address'] = [];
    test('address > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.',
            ],
        ]]
    ));

    $updatedContactData['address'] = updatedContactData['address'];

    /**
     * BIRTHDAY TESTS
     */
    $updatedContactData['birthday'] = 1;
    test('birthday > integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $updatedContactData['birthday'] = 'birthday';
    test('birthday > string', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $updatedContactData['birthday'] = true;
    test('birthday > true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $updatedContactData['birthday'] = false;
    test('birthday > false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $updatedContactData['birthday'] = '30.30.2023';
    test('birthday > date', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $updatedContactData['birthday'] = [];
    test('birthday > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $updatedContactData['birthday'] = updatedContactData['birthday'];

    /**
     * CONTACT GROUPS TESTS
     */
    $updatedContactData['contact_groups'] = false;
    test('contact_groups > false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a string.'],
        ]]
    ));

    $updatedContactData['contact_groups'] = [];
    test('contact_groups > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a string.'],
        ]]
    ));

    $updatedContactData['contact_groups'] = updatedContactData['contact_groups'];

    /**
     * ROLE TESTS
     */
    $updatedContactData['role'] = 1;
    test('role > integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.',
            ],
        ]]
    ));

    $updatedContactData['role'] = 'example';
    test('role > example', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The selected role is invalid.',
            ],
        ]]
    ));

    $updatedContactData['role'] = [];
    test('role > empty array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.',
            ],
        ]]
    ));
});
