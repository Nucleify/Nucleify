<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-api-422');
uses()->group('contact-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($contactData = contactData) {
    /**
     * USER ID TESTS
     */
    $contactData['user_id'] = '';
    test('user_id > empty', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $contactData['user_id'] = 'user_id';
    test('user_id > string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $contactData['user_id'] = false;
    test('user_id > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $contactData['user_id'] = [];
    test('user_id > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $contactData['user_id'] = contactData['user_id'];

    /**
     * FIRST NAME TESTS
     */
    $contactData['first_name'] = '';
    test('first_name > empty', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field is required.'],
        ]]
    ));

    $contactData['first_name'] = 1;
    test('first_name > integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.',
            ],
        ]]
    ));

    $contactData['first_name'] = false;
    test('first_name > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.',
            ],
        ]]
    ));

    $contactData['first_name'] = true;
    test('first_name > true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be at least 3 characters.',
                'The first name field must be a string.',
            ],
        ]]
    ));

    $contactData['first_name'] = 'L';
    test('first_name > too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field must be at least 3 characters.'],
        ]]
    ));

    $contactData['first_name'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('first_name > too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field must not be greater than 30 characters.'],
        ]]
    ));

    $contactData['first_name'] = [];
    test('first_name > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field is required.'],
        ]]
    ));

    $contactData['first_name'] = contactData['first_name'];

    /**
     * LAST NAME TESTS
     */
    $contactData['last_name'] = 1;
    test('last_name > integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.',
            ],
        ]]
    ));

    $contactData['last_name'] = false;
    test('last_name > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.',
            ],
        ]]
    ));

    $contactData['last_name'] = true;
    test('last_name > true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.',
            ],
        ]]
    ));

    $contactData['last_name'] = 'L';
    test('last_name > too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => ['The last name field must be at least 3 characters.'],
        ]]
    ));

    $contactData['last_name'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('last_name > too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => ['The last name field must not be greater than 30 characters.'],
        ]]
    ));

    $contactData['last_name'] = [];
    test('last_name > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be at least 3 characters.',
                'The last name field must be a string.',
            ],
        ]]
    ));

    $contactData['last_name'] = contactData['last_name'];

    /**
     * EMAIL TESTS
     */
    $contactData['email'] = 'admin.example.com';
    test('email > format', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.'],
        ]]
    ));

    $contactData['email'] = 1;
    test('email > integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.',
            ],
        ]]
    ));

    $contactData['email'] = false;
    test('email > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.',
            ],
        ]]
    ));

    $contactData['email'] = true;
    test('email > true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be at least 3 characters.',
                'The email field must be a valid email address.',
            ],
        ]]
    ));

    $contactData['email'] = [];
    test('email > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.',
            ],
        ]]
    ));

    $contactData['email'] = contactData['email'];

    /**
     * PERSONAL PHONE TESTS
     */
    $contactData['personal_phone'] = false;
    test('personal_phone > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['personal_phone'] = true;
    test('personal_phone > true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['personal_phone'] = '9876543';
    test('personal_phone > too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['personal_phone'] = '98 76 543 210 123';
    test('personal_phone > too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must not be greater than 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['personal_phone'] = [];
    test('personal_phone > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['personal_phone'] = contactData['personal_phone'];

    /**
     * WORK PHONE TESTS
     */
    $contactData['work_phone'] = false;
    test('work_phone > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['work_phone'] = true;
    test('work_phone > true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['work_phone'] = '9876543';
    test('work_phone > too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['work_phone'] = '98 76 543 210 123';
    test('work_phone > too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must not be greater than 9 characters.',
                'The work phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['work_phone'] = [];
    test('work_phone > empty array', apiTest(
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
            ],
        ]]
    ));

    $contactData['work_phone'] = contactData['work_phone'];

    /**
     * ADDRESS TESTS
     */
    $contactData['address'] = 1;
    test('address > integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.',
            ],
        ]]
    ));

    $contactData['address'] = false;
    test('address > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.',
            ],
        ]]
    ));

    $contactData['address'] = true;
    test('address > true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be at least 15 characters.',
                'The address field must be a string.',
            ],
        ]]
    ));

    $contactData['address'] = 'Lorem ipsum.';
    test('address > too short', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => ['The address field must be at least 15 characters.'],
        ]]
    ));

    $contactData['address'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
    test('address > too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => ['The address field must not be greater than 100 characters.'],
        ]]
    ));

    $contactData['address'] = [];
    test('address > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.',
            ],
        ]]
    ));

    $contactData['address'] = contactData['address'];

    /**
     * BIRTHDAY TESTS
     */
    $contactData['birthday'] = 1;
    test('birthday > integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $contactData['birthday'] = 'birthday';
    test('birthday > string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $contactData['birthday'] = true;
    test('birthday > true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $contactData['birthday'] = false;
    test('birthday > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $contactData['birthday'] = '30.30.2023';
    test('birthday > date', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $contactData['birthday'] = [];
    test('birthday > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.'],
        ]]
    ));

    $contactData['birthday'] = contactData['birthday'];

    /**
     * CONTACT GROUPS TESTS
     */
    $contactData['contact_groups'] = true;
    test('contact_groups > true', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a string.'],
        ]]
    ));

    $contactData['contact_groups'] = false;
    test('contact_groups > false', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a string.'],
        ]]
    ));

    $contactData['contact_groups'] = [];
    test('contact_groups > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a string.'],
        ]]
    ));

    $contactData['contact_groups'] = contactData['contact_groups'];

    /**
     * ROLE TESTS
     */
    $contactData['role'] = 1;
    test('role > integer', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.',
            ],
        ]]
    ));

    $contactData['role'] = 'example';
    test('role > example', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The selected role is invalid.',
            ],
        ]]
    ));

    $contactData['role'] = [];
    test('role > empty array', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.',
            ],
        ]]
    ));
});
