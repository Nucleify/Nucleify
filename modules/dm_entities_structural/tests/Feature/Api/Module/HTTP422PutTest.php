<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedModuleData = updatedModuleData) {

    /**
     * NAME
     */
    $updatedModuleData['name'] = '';
    test('invalid name > empty string', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field is required.']]],
    ));

    $updatedModuleData['name'] = [];
    test('invalid name > empty array', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field is required.']]],
    ));

    $updatedModuleData['name'] = false;
    test('invalid name > false', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]],
    ));

    $updatedModuleData['name'] = true;
    test('invalid name > true', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]],
    ));

    $updatedModuleData['name'] = 1;
    test('invalid name > integer', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]],
    ));

    $updatedModuleData['name'] = updatedModuleData['name'];

    /**
     * DESCRIPTION
     */
    $updatedModuleData['description'] = 12345;
    test('invalid description > integer', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]],
    ));

    $updatedModuleData['description'] = false;
    test('invalid description > false', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]],
    ));

    $updatedModuleData['description'] = true;
    test('invalid description > true', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]],
    ));

    $updatedModuleData['description'] = updatedModuleData['description'];

    /**
     * CATEGORY
     */
    $updatedModuleData['category'] = [];
    test('invalid category > empty array', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]],
    ));

    $updatedModuleData['category'] = null;
    test('invalid category > null', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]],
    ));

    $updatedModuleData['category'] = true;
    test('invalid category > true', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]],
    ));

    $updatedModuleData['category'] = false;
    test('invalid category > false', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]],
    ));

    $updatedModuleData['category'] = updatedModuleData['category'];

    /**
     * VERSION
     */
    $updatedModuleData['version'] = [];
    test('invalid version > empty array', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field is required.']]],
    ));

    $updatedModuleData['version'] = 1.1;
    test('invalid version > float', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]],

    ));

    $updatedModuleData['version'] = true;
    test('invalid version > true', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]],
    ));

    $updatedModuleData['version'] = false;
    test('invalid version > false', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]],
    ));

    $updatedModuleData['version'] = updatedModuleData['version'];

    /**
     * ENABLED
     */
    $updatedModuleData['enabled'] = 'string';
    test('invalid enabled > string', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field must be true or false.']]],
    ));

    $updatedModuleData['enabled'] = '';
    test('invalid enabled > empty string', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]],
    ));

    $updatedModuleData['enabled'] = [];
    test('invalid enabled > empty array', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]],
    ));

    $updatedModuleData['enabled'] = null;
    test('invalid enabled > null', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]],
    ));
});
