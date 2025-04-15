<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($contactData = contactData) {
    /**
     * USER ID TESTS
     */
    $contactData['user_id'] = '';
    test('invalid user_id > empty', apiTest(
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
    test('invalid user_id > string', apiTest(
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
    test('invalid user_id > false', apiTest(
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
    test('invalid user_id > empty array', apiTest(
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
    test('invalid first_name > empty', apiTest(
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
    test('invalid first_name > integer', apiTest(
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
    test('invalid first_name > false', apiTest(
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
    test('invalid first_name > true', apiTest(
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
    test('invalid first_name > too short', apiTest(
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
    test('invalid first_name > too long', apiTest(
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
    test('invalid first_name > empty array', apiTest(
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
    test('invalid last_name > integer', apiTest(
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
    test('invalid last_name > false', apiTest(
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
    test('invalid last_name > true', apiTest(
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
    test('invalid last_name > too short', apiTest(
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
    test('invalid last_name > too long', apiTest(
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
    test('invalid last_name > empty array', apiTest(
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
    test('invalid email > format', apiTest(
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
    test('invalid email > integer', apiTest(
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
    test('invalid email > false', apiTest(
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
    test('invalid email > true', apiTest(
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
    test('invalid email > empty array', apiTest(
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
    test('invalid personal_phone > false', apiTest(
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
    test('invalid personal_phone > true', apiTest(
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
    test('invalid personal_phone > too short', apiTest(
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
    test('invalid personal_phone > too long', apiTest(
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
                'The personal phone field format is invalid.',
            ],
        ]]
    ));

    $contactData['personal_phone'] = contactData['personal_phone'];

    /**
     * WORK PHONE TESTS
     */
    $contactData['work_phone'] = false;
    test('invalid work_phone > false', apiTest(
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
    test('invalid work_phone > true', apiTest(
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
    test('invalid work_phone > too short', apiTest(
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
    test('invalid work_phone > too long', apiTest(
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
            ],
        ]]
    ));

    $contactData['work_phone'] = contactData['work_phone'];

    /**
     * ADDRESS TESTS
     */
    $contactData['address'] = 1;
    test('invalid address > integer', apiTest(
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
    test('invalid address > false', apiTest(
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
    test('invalid address > true', apiTest(
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
    test('invalid address > too short', apiTest(
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
    test('invalid address > too long', apiTest(
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
    test('invalid address > empty array', apiTest(
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
    test('invalid birthday > integer', apiTest(
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
    test('invalid birthday > string', apiTest(
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
    test('invalid birthday > true', apiTest(
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
    test('invalid birthday > false', apiTest(
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
    test('invalid birthday > invalid date', apiTest(
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
    test('invalid birthday > empty array', apiTest(
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
    test('invalid contact_groups > true', apiTest(
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
    test('invalid contact_groups > false', apiTest(
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
    test('invalid contact_groups > empty array', apiTest(
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
    test('invalid role > integer', apiTest(
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
    test('invalid role > example', apiTest(
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
    test('invalid role > empty array', apiTest(
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
