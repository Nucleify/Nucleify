<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedModuleData = updatedModuleData) {

    /**
     * NAME
     */
    $updatedModuleData['name'] = '';
    test('name > empty string', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field is required.']]],
    ));

    $updatedModuleData['name'] = [];
    test('name > empty array', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field is required.']]],
    ));

    $updatedModuleData['name'] = false;
    test('name > false', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]],
    ));

    $updatedModuleData['name'] = true;
    test('name > true', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]],
    ));

    $updatedModuleData['name'] = 1;
    test('name > integer', apiTest(
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
    test('description > integer', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]],
    ));

    $updatedModuleData['description'] = false;
    test('description > false', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]],
    ));

    $updatedModuleData['description'] = true;
    test('description > true', apiTest(
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
    test('category > empty array', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]],
    ));

    $updatedModuleData['category'] = null;
    test('category > null', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]],
    ));

    $updatedModuleData['category'] = true;
    test('category > true', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]],
    ));

    $updatedModuleData['category'] = false;
    test('category > false', apiTest(
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
    test('version > empty array', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field is required.']]],
    ));

    $updatedModuleData['version'] = 1.1;
    test('version > float', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]],

    ));

    $updatedModuleData['version'] = true;
    test('version > true', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]],
    ));

    $updatedModuleData['version'] = false;
    test('version > false', apiTest(
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
    test('enabled > string', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field must be true or false.']]],
    ));

    $updatedModuleData['enabled'] = '';
    test('enabled > empty string', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]],
    ));

    $updatedModuleData['enabled'] = [];
    test('enabled > empty array', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]],
    ));

    $updatedModuleData['enabled'] = null;
    test('enabled > null', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]],
    ));

    $updatedModuleData['enabled'] = updatedModuleData['enabled'];

    /**
     * INSTALLED
     */
    $updatedModuleData['installed'] = 'string';
    test('installed > string', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['installed']],
        ['errors' => ['installed' => ['The installed field must be true or false.']]],
    ));

    $updatedModuleData['installed'] = '';
    test('installed > empty string', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['installed']],
        ['errors' => ['installed' => ['The installed field is required.']]],
    ));

    $updatedModuleData['installed'] = [];
    test('installed > empty array', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['installed']],
        ['errors' => ['installed' => ['The installed field is required.']]],
    ));

    $updatedModuleData['installed'] = null;
    test('installed > null', apiTest(
        'PUT',
        'modules.update',
        422,
        $updatedModuleData,
        ['errors' => ['installed']],
        ['errors' => ['installed' => ['The installed field is required.']]],
    ));

    $updatedModuleData['installed'] = updatedModuleData['installed'];
});
