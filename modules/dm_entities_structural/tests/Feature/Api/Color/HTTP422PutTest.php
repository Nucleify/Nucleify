<?php if (!defined('PEST_RUNNING')) return; 


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedColorData = updatedColorData) {
    /**
     * USER ID TESTS
     */
    $updatedColorData['user_id'] = '';
    test('invalid user_id > empty', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedColorData['user_id'] = 'user_id';
    test('invalid user_id > string', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedColorData['user_id'] = false;
    test('invalid user_id > false', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedColorData['user_id'] = [];
    test('invalid user_id > empty array', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.']
        ]]
    ));

    $updatedColorData['user_id'] = updatedColorData['user_id'];



    /**
     * ENTITY TESTS
     */
    $updatedColorData['entity'] = '';
    test('invalid entity > empty', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['entity']],
        ['errors' => [
            'entity' => ['The entity field is required.']
        ]]
    ));

    $updatedColorData['entity'] = 1;
    test('invalid entity > integer', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['entity']],
        ['errors' => [
            'entity' => ['The entity field must be a string.']
        ]]
    ));

    $updatedColorData['entity'] = false;
    test('invalid entity > false', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['entity']],
        ['errors' => [
            'entity' => ['The entity field must be a string.']
        ]]
    ));

    $updatedColorData['entity'] = true;
    test('invalid entity > true', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['entity']],
        ['errors' => [
         'entity' => ['The entity field must be a string.']
        ]]
    ));

    $updatedColorData['entity'] = [];
    test('invalid entity > empty array', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['entity']],
        ['errors' => [
            'entity' => ['The entity field is required.']
        ]]
    ));

    $updatedColorData['entity'] = updatedColorData['entity'];



    /**
     * VALUE TESTS
     */
    $updatedColorData['value'] = '';
    test('invalid value > empty', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.']
        ]]
    ));

    $updatedColorData['value'] = 1;
    test('invalid value > integer', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.']
        ]]
    ));

    $updatedColorData['value'] = false;
    test('invalid value > false', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.']
        ]]
    ));

    $updatedColorData['value'] = true;
    test('invalid value > true', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field must be a string.']
        ]]
    ));

    $updatedColorData['value'] = [];
    test('invalid value > empty array', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['value']],
        ['errors' => [
            'value' => ['The value field is required.']
        ]]
    ));

    $updatedColorData['value'] = updatedColorData['value'];



    /**
     * NEW TESTS
     */
    $updatedColorData['new'] = '';
    test('invalid new > empty', apiTest(
        'PUT',
        'colors.update',
        422
        , $updatedColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.']
        ]]
    ));

    $updatedColorData['new'] = 'not_a_boolean';
    test('invalid new > string', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field must be true or false.']
        ]]
    ));

    $updatedColorData['new'] = [];
    test('invalid new > empty array', apiTest(
        'PUT',
        'colors.update',
        422,
        $updatedColorData,
        ['errors' => ['new']],
        ['errors' => [
            'new' => ['The new field is required.']
        ]]
    ));

    $updatedColorData['new'] = updatedColorData['new'];
});
