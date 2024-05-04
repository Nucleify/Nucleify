<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function($contactData = contactData) {
    /**
     * USER ID TESTS
     */
    $contactData['user_id'] = '';
    test('validation error no user_id', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.']
        ]]
    ));

    $contactData['user_id'] = [];
    test('validation error invalid user_id array', apiTest(
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
    test('validation error invalid user_id string', apiTest(
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
    test('validation error invalid user_id false', apiTest(
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
    test('validation error no first_name', apiTest(
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
    test('validation error first_name array', apiTest(
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
    test('validation error first_name integer', apiTest(
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
    test('validation error first_name false', apiTest(
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
    test('validation error first_name true', apiTest(
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
    test('validation error first_name too short', apiTest(
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
    test('validation error first_name too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field must not be greater than 30 characters.']
        ]]
    ));
    $contactData['first_name'] = contactData['first_name']; // reset first_name value


    /**
     * LAST NAME TESTS
     */
    $contactData['last_name'] = [];
    test('validation error last_name array', apiTest(
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

    $contactData['last_name'] = 1;
    test('validation error last_name integer', apiTest(
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
    test('validation error last_name false', apiTest(
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
    test('validation error last_name true', apiTest(
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
    test('validation error last_name too short', apiTest(
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
    test('validation error last_name too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => ['The last name field must not be greater than 30 characters.']
        ]]
    ));
    $contactData['last_name'] = contactData['last_name']; // reset last_name value



    /**
     * EMAIL TESTS
     */
    $contactData['email'] = 'admin.example.com';
    test('validation error wrong email format', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.']
        ]]
    ));

    $contactData['email'] = [];
    test('validation error email array', apiTest(
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

    $contactData['email'] = 1;
    test('validation error email integer', apiTest(
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
    test('validation error email false', apiTest(
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
    test('validation error email true', apiTest(
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
    $contactData['email'] = contactData['email']; // reset email value



    /**
     * PERSONAL PHONE TESTS
     */
    $contactData['personal_phone'] = [];
    test('validation error personal_phone array', apiTest(
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

    $contactData['personal_phone'] = false;
    test('validation error personal_phone false', apiTest(
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
    test('validation error personal_phone true', apiTest(
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
    test('validation error personal_phone too short', apiTest(
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
    test('validation error personal_phone too long', apiTest(
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
    $contactData['personal_phone'] = contactData['personal_phone']; // reset personal_phone value



    /**
     * WORK PHONE TESTS
     */
    $contactData['work_phone'] = [];
    test('validation error work_phone array', apiTest(
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

    $contactData['work_phone'] = false;
    test('validation error work_phone false', apiTest(
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
    test('validation error work_phone true', apiTest(
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
    test('validation error work_phone too short', apiTest(
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
    test('validation error work_phone too long', apiTest(
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
    $contactData['work_phone'] = contactData['work_phone']; // reset work_phone value



    /**
     * ADDRESS TESTS
     */
    $contactData['address'] = [];
    test('validation error address array', apiTest(
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
    test('validation error address integer', apiTest(
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
    test('validation error address false', apiTest(
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
    test('validation error address true', apiTest(
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
    test('validation error address too short', apiTest(
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
    test('validation error address too long', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => ['The address field must not be greater than 100 characters.']
        ]]
    ));
    $contactData['address'] = contactData['address']; // reset address value



    /**
     * BIRTHDAY TESTS
     */
    $contactData['birthday'] = [];
    test('validation error birthday array', apiTest(
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
    test('validation error birthday string', apiTest(
        'POST',
        'contacts.store',
        422,
        $contactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $contactData['birthday'] = 1;
    test('validation error birthday integer', apiTest(
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
    test('validation error birthday false', apiTest(
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
    test('validation error birthday true', apiTest(
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
    test('validation error birthday invalid date', apiTest(
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
    $contactData['contact_groups'] = [];
    test('validation error contact groups array', apiTest(
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
    test('validation error contact groups array integer', apiTest(
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
    test('validation error contact groups string', apiTest(
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
    $contactData['role'] = [];
    test('validation error role array', apiTest(
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

    $contactData['role'] = 1;
    test('validation error role integer', apiTest(
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

    $contactData['role'] = 'invalid';
    test('validation error role invalid', apiTest(
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
});
