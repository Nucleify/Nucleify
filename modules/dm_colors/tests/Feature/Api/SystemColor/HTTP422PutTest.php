<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-422');
uses()->group('system-color-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedSystemColorData = updatedSystemColorData) {
    /**
     * NAME TESTS
     */
    $updatedSystemColorData['name'] = '';
    test('name > empty', apiTest(
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
    test('name > integer', apiTest(
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
    test('name > false', apiTest(
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
    test('name > true', apiTest(
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
    test('name > empty array', apiTest(
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
    test('value > empty', apiTest(
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
    test('value > integer', apiTest(
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
    test('value > false', apiTest(
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
    test('value > true', apiTest(
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
    test('value > empty array', apiTest(
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
    test('new > empty', apiTest(
        'PUT',
        'system-colors.update',
        422, $updatedSystemColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $updatedSystemColorData['new'] = 'not_a_boolean';
    test('new > string', apiTest(
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
    test('new > empty array', apiTest(
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
