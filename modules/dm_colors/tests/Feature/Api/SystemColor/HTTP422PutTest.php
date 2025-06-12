<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-422');
uses()->group('system-color-api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedSystemColorData = updatedSystemColorData) {
    /**
     * NAME TESTS
     */
    $updatedSystemColorData['name'] = '';
    test('invalid name > empty', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $updatedSystemColorData['name'] = 1;
    test('invalid name > integer', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $updatedSystemColorData['name'] = false;
    test('invalid name > false', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $updatedSystemColorData['name'] = true;
    test('invalid name > true', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $updatedSystemColorData['name'] = [];
    test('invalid name > empty array', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $updatedSystemColorData['name'] = updatedSystemColorData['name'];

    /**
     * VALUE TESTS
     */
    $updatedSystemColorData['value'] = '';
    test('invalid value > empty', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $updatedSystemColorData['value'] = 1;
    test('invalid value > integer', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $updatedSystemColorData['value'] = false;
    test('invalid value > false', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $updatedSystemColorData['value'] = true;
    test('invalid value > true', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $updatedSystemColorData['value'] = [];
    test('invalid value > empty array', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $updatedSystemColorData['value'] = updatedSystemColorData['value'];

    /**
     * NEW TESTS
     */
    $updatedSystemColorData['new'] = '';
    test('invalid new > empty', apiTest(
        'PUT',
        'system-colors.update',
        422, $updatedSystemColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $updatedSystemColorData['new'] = 'not_a_boolean';
    test('invalid new > string', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field must be true or false.'],
        ]]
    ));

    $updatedSystemColorData['new'] = [];
    test('invalid new > empty array', apiTest(
        'PUT',
        'system-colors.update',
        422,
        $updatedSystemColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $updatedSystemColorData['new'] = updatedSystemColorData['new'];
});
