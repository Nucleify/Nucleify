<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-api-422');
uses()->group('user-color-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedUserColorData = updatedUserColorData) {
    /**
     * USER ID TESTS
     */
    $updatedUserColorData['user_id'] = '';
    test('user_id > empty', apiTest(
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
    test('user_id > string', apiTest(
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
    test('user_id > false', apiTest(
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
    test('user_id > empty array', apiTest(
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
    test('name > empty', apiTest(
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
    test('name > integer', apiTest(
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
    test('name > false', apiTest(
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
    test('name > true', apiTest(
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
    test('name > empty array', apiTest(
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
    test('value > empty', apiTest(
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
    test('value > integer', apiTest(
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
    test('value > false', apiTest(
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
    test('value > true', apiTest(
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
    test('value > empty array', apiTest(
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
    test('new > empty', apiTest(
        'PUT',
        'user-colors.update',
        422, $updatedUserColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $updatedUserColorData['new'] = 'not_a_boolean';
    test('new > string', apiTest(
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
    test('new > empty array', apiTest(
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
