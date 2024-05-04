<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function($updatedContactData = updatedContactData) {
    /**
     * USER ID TESTS
     */
    $updatedContactData['user_id'] = '';
    test('validation error no user_id', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedContactData['user_id'] = [];
    test('validation error invalid user_id array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedContactData['user_id'] = 'user_id';
    test('validation error invalid user_id string', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedContactData['user_id'] = false;
    test('validation error invalid user_id false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));
    $updatedContactData['user_id'] = updatedContactData['user_id']; // reset user_id value


    /**
     * FIRST NAME TESTS
     */
    $updatedContactData['first_name'] = '';
    test('validation error no first_name', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field is required.']
        ]]
    ));

    $updatedContactData['first_name'] = [];
    test('validation error first_name array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field is required.']
        ]]
    ));

    $updatedContactData['first_name'] = 1;
    test('validation error first_name integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be a string.',
                'The first name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['first_name'] = false;
    test('validation error first_name false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be a string.',
                'The first name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['first_name'] = true;
    test('validation error first_name true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => [
                'The first name field must be a string.',
                'The first name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['first_name'] = 'L';
    test('validation error first_name too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field must be at least 3 characters.']
        ]]
    ));

    $updatedContactData['first_name'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('validation error first_name too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['first_name']],
        ['errors' => [
            'first_name' => ['The first name field must not be greater than 30 characters.']
        ]]
    ));
    $updatedContactData['first_name'] = updatedContactData['first_name']; // reset first_name value


    /**
     * LAST NAME TESTS
     */
    $updatedContactData['last_name'] = [];
    test('validation error last_name array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be a string.',
                'The last name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['last_name'] = 1;
    test('validation error last_name integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be a string.',
                'The last name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['last_name'] = false;
    test('validation error last_name false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be a string.',
                'The last name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['last_name'] = true;
    test('validation error last_name true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => [
                'The last name field must be a string.',
                'The last name field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['last_name'] = 'L';
    test('validation error last_name too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => ['The last name field must be at least 3 characters.']
        ]]
    ));

    $updatedContactData['last_name'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.';
    test('validation error last_name too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['last_name']],
        ['errors' => [
            'last_name' => ['The last name field must not be greater than 30 characters.']
        ]]
    ));
    $updatedContactData['last_name'] = updatedContactData['last_name']; // reset last_name value



    /**
     * EMAIL TESTS
     */
    $updatedContactData['email'] = 'admin.example.com';
    test('validation error wrong email format', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.']
        ]]
    ));

    $updatedContactData['email'] = [];
    test('validation error email array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['email'] = 1;
    test('validation error email integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['email'] = false;
    test('validation error email false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));

    $updatedContactData['email'] = true;
    test('validation error email true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => [
                'The email field must be a valid email address.',
                'The email field must be at least 3 characters.'
            ]
        ]]
    ));
    $updatedContactData['email'] = updatedContactData['email']; // reset email value



    /**
     * PERSONAL PHONE TESTS
     */
    $updatedContactData['personal_phone'] = [];
    test('validation error personal_phone array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $updatedContactData['personal_phone'] = false;
    test('validation error personal_phone false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $updatedContactData['personal_phone'] = true;
    test('validation error personal_phone true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be a string.',
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $updatedContactData['personal_phone'] = '9876543';
    test('validation error personal_phone too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must be at least 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));

    $updatedContactData['personal_phone'] = '98 76 543 210 123';
    test('validation error personal_phone too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['personal_phone']],
        ['errors' => [
            'personal_phone' => [
                'The personal phone field must not be greater than 9 characters.',
                'The personal phone field format is invalid.'
            ]
        ]]
    ));
    $updatedContactData['personal_phone'] = updatedContactData['personal_phone']; // reset personal_phone value



    /*
     * WORK PHONE TESTS
     */
    $updatedContactData['work_phone'] = [];
    test('validation error work_phone array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.'
            ]
        ]]
    ));

    $updatedContactData['work_phone'] = false;
    test('validation error work_phone false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.'
            ]
        ]]
    ));

    $updatedContactData['work_phone'] = true;
    test('validation error work_phone true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field must be a string.',
                'The work phone field must be at least 9 characters.',
                'The work phone field format is invalid.'
            ]
        ]]
    ));

    $updatedContactData['work_phone'] = '9876543';
    test('validation error work_phone too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field format is invalid.',
                'The work phone field must be at least 9 characters.'
            ]
        ]]
    ));

    $updatedContactData['work_phone'] = '98 76 543 210 123';
    test('validation error work_phone too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['work_phone']],
        ['errors' => [
            'work_phone' => [
                'The work phone field format is invalid.',
                'The work phone field must not be greater than 9 characters.'
            ]
        ]]
    ));
    $updatedContactData['work_phone'] = updatedContactData['work_phone']; // reset work_phone value



    /**
     * ADDRESS TESTS
     */
    $updatedContactData['address'] = [];
    test('validation error address array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $updatedContactData['address'] = 1;
    test('validation error address integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $updatedContactData['address'] = false;
    test('validation error address false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $updatedContactData['address'] = true;
    test('validation error address true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => [
                'The address field must be a string.',
                'The address field must be at least 15 characters.'
            ]
        ]]
    ));

    $updatedContactData['address'] = 'Lorem ipsum.';
    test('validation error address too short', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => ['The address field must be at least 15 characters.']
        ]]
    ));

    $updatedContactData['address'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
    test('validation error address too long', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['address']],
        ['errors' => [
            'address' => ['The address field must not be greater than 100 characters.']
        ]]
    ));
    $updatedContactData['address'] = updatedContactData['address']; // reset address value



    /**
     * BIRTHDAY TESTS
     */
    $updatedContactData['birthday'] = [];
    test('validation error birthday array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $updatedContactData['birthday'] = 'birthday';
    test('validation error birthday string', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $updatedContactData['birthday'] = 1;
    test('validation error birthday integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $updatedContactData['birthday'] = false;
    test('validation error birthday false', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $updatedContactData['birthday'] = true;
    test('validation error birthday true', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));

    $updatedContactData['birthday'] = '30.30.2023';
    test('validation error birthday invalid date', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['birthday']],
        ['errors' => [
            'birthday' => ['The birthday field must be a valid date.']
        ]]
    ));
    $updatedContactData['birthday'] = updatedContactData['birthday']; // reset birthday value



    /*
     * CONTACT GROUPS TESTS
     */
    $updatedContactData['contact_groups'] = [];
    test('validation error contact groups array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $updatedContactData['contact_groups'] = [1];
    test('validation error contact groups array integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));

    $updatedContactData['contact_groups'] = 'contact_groups';
    test('validation error contact groups string', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['contact_groups']],
        ['errors' => [
            'contact_groups' => ['The contact groups field must be a valid JSON string.']
        ]]
    ));
    $updatedContactData['contact_groups'] = updatedContactData['contact_groups']; // reset contact_groups value



    /**
     * ROLE TESTS
     */
    $updatedContactData['role'] = [];
    test('validation error role array', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $updatedContactData['role'] = 1;
    test('validation error role integer', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => [
                'The role field must be a string.',
                'The selected role is invalid.'
            ]
        ]]
    ));

    $updatedContactData['role'] = 'invalid';
    test('validation error role invalid', apiTest(
        'PUT',
        'contacts.update',
        422,
        $updatedContactData,
        ['errors' => ['role']],
        ['errors' => [
            'role' => ['The selected role is invalid.']
        ]]
    ));
});
