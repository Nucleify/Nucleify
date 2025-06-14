<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-api-422');
uses()->group('user-color-api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($userColorData = userColorData) {
    /**
     * USER ID TESTS
     */
    $userColorData['user_id'] = '';
    test('invalid user_id > empty', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $userColorData['user_id'] = 'user_id';
    test('invalid user_id > string', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $userColorData['user_id'] = false;
    test('invalid user_id > false', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $userColorData['user_id'] = [];
    test('invalid user_id > empty array', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $userColorData['user_id'] = userColorData['user_id'];

    /**
     * NAME TESTS
     */
    $userColorData['name'] = '';
    test('invalid name > empty', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $userColorData['name'] = 1;
    test('invalid name > integer', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $userColorData['name'] = false;
    test('invalid name > false', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $userColorData['name'] = true;
    test('invalid name > true', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $userColorData['name'] = [];
    test('invalid name > empty array', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $userColorData['name'] = userColorData['name'];

    /**
     * VALUE TESTS
     */
    $userColorData['value'] = '';
    test('invalid value > empty', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $userColorData['value'] = 1;
    test('invalid value > integer', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $userColorData['value'] = false;
    test('invalid value > false', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $userColorData['value'] = true;
    test('invalid value > true', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $userColorData['value'] = [];
    test('invalid value > empty array', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $userColorData['value'] = userColorData['value'];

    /**
     * NEW TESTS
     */
    $userColorData['new'] = '';
    test('invalid new > empty', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $userColorData['new'] = 'not_a_boolean';
    test('invalid new > string', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field must be true or false.'],
        ]]
    ));

    $userColorData['new'] = [];
    test('invalid new > empty array', apiTest(
        'POST',
        'user-colors.store',
        422,
        $userColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $userColorData['new'] = userColorData['new'];
});
