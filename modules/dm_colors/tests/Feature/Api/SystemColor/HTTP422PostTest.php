<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-422');
uses()->group('system-color-api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($systemColorData = systemColorData) {
    /**
     * NAME TESTS
     */
    $systemColorData['name'] = '';
    test('invalid name > empty', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $systemColorData['name'] = 1;
    test('invalid name > integer', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $systemColorData['name'] = false;
    test('invalid name > false', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $systemColorData['name'] = true;
    test('invalid name > true', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $systemColorData['name'] = [];
    test('invalid name > empty array', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $systemColorData['name'] = systemColorData['name'];

    /**
     * VALUE TESTS
     */
    $systemColorData['value'] = '';
    test('invalid value > empty', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $systemColorData['value'] = 1;
    test('invalid value > integer', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $systemColorData['value'] = false;
    test('invalid value > false', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $systemColorData['value'] = true;
    test('invalid value > true', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $systemColorData['value'] = [];
    test('invalid value > empty array', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $systemColorData['value'] = systemColorData['value'];

    /**
     * NEW TESTS
     */
    $systemColorData['new'] = '';
    test('invalid new > empty', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $systemColorData['new'] = 'not_a_boolean';
    test('invalid new > string', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field must be true or false.'],
        ]]
    ));

    $systemColorData['new'] = [];
    test('invalid new > empty array', apiTest(
        'POST',
        'system-colors.store',
        422,
        $systemColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $systemColorData['new'] = systemColorData['new'];
});
