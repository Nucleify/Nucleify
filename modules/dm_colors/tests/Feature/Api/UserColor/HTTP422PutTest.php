<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-api-422');
uses()->group('user-color-api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedUserColorData = updatedUserColorData) {
    /**
     * USER ID TESTS
     */
    $updatedUserColorData['user_id'] = '';
    test('invalid user_id > empty', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedUserColorData['user_id'] = 'user_id';
    test('invalid user_id > string', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedUserColorData['user_id'] = false;
    test('invalid user_id > false', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedUserColorData['user_id'] = [];
    test('invalid user_id > empty array', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedUserColorData['user_id'] = updatedUserColorData['user_id'];

    /**
     * NAME TESTS
     */
    $updatedUserColorData['name'] = '';
    test('invalid name > empty', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $updatedUserColorData['name'] = 1;
    test('invalid name > integer', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $updatedUserColorData['name'] = false;
    test('invalid name > false', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $updatedUserColorData['name'] = true;
    test('invalid name > true', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $updatedUserColorData['name'] = [];
    test('invalid name > empty array', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $updatedUserColorData['name'] = updatedUserColorData['name'];

    /**
     * VALUE TESTS
     */
    $updatedUserColorData['value'] = '';
    test('invalid value > empty', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $updatedUserColorData['value'] = 1;
    test('invalid value > integer', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $updatedUserColorData['value'] = false;
    test('invalid value > false', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $updatedUserColorData['value'] = true;
    test('invalid value > true', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $updatedUserColorData['value'] = [];
    test('invalid value > empty array', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $updatedUserColorData['value'] = updatedUserColorData['value'];

    /**
     * NEW TESTS
     */
    $updatedUserColorData['new'] = '';
    test('invalid new > empty', apiTest(
        'PUT',
        'user-colors.update',
        422, $updatedUserColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $updatedUserColorData['new'] = 'not_a_boolean';
    test('invalid new > string', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field must be true or false.'],
        ]]
    ));

    $updatedUserColorData['new'] = [];
    test('invalid new > empty array', apiTest(
        'PUT',
        'user-colors.update',
        422,
        $updatedUserColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $updatedUserColorData['new'] = updatedUserColorData['new'];
});
