<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($colorData = colorData) {
    /**
     * USER ID TESTS
     */
    $colorData['user_id'] = '';
    test('invalid user_id > empty', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $colorData['user_id'] = 'user_id';
    test('invalid user_id > string', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $colorData['user_id'] = false;
    test('invalid user_id > false', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $colorData['user_id'] = [];
    test('invalid user_id > empty array', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $colorData['user_id'] = colorData['user_id'];

    /**
     * ENTITY TESTS
     */
    $colorData['entity'] = '';
    test('invalid entity > empty', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['entity']],
        ['errors' => [
            'entity' => ['The entity field is required.'],
        ]]
    ));

    $colorData['entity'] = 1;
    test('invalid entity > integer', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['entity']],
        ['errors' => [
            'entity' => ['The entity field must be a string.'],
        ]]
    ));

    $colorData['entity'] = false;
    test('invalid entity > false', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['entity']],
        ['errors' => [
            'entity' => ['The entity field must be a string.'],
        ]]
    ));

    $colorData['entity'] = true;
    test('invalid entity > true', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['entity']],
        ['errors' => [
            'entity' => ['The entity field must be a string.'],
        ]]
    ));

    $colorData['entity'] = [];
    test('invalid entity > empty array', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['entity']],
        ['errors' => [
            'entity' => ['The entity field is required.'],
        ]]
    ));

    $colorData['entity'] = colorData['entity'];

    /**
     * VALUE TESTS
     */
    $colorData['value'] = '';
    test('invalid value > empty', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $colorData['value'] = 1;
    test('invalid value > integer', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $colorData['value'] = false;
    test('invalid value > false', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $colorData['value'] = true;
    test('invalid value > true', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.'],
        ]]
    ));

    $colorData['value'] = [];
    test('invalid value > empty array', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.'],
        ]]
    ));

    $colorData['value'] = colorData['value'];

    /**
     * NEW TESTS
     */
    $colorData['new'] = '';
    test('invalid new > empty', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $colorData['new'] = 'not_a_boolean';
    test('invalid new > string', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field must be true or false.'],
        ]]
    ));

    $colorData['new'] = [];
    test('invalid new > empty array', apiTest(
        'POST',
        'colors.store',
        422,
        $colorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.'],
        ]]
    ));

    $colorData['new'] = colorData['new'];
});
