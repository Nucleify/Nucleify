<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($moduleData = moduleData) {

    /**
     * NAME
     */
    $moduleData['name'] = '';
    test('name > empty string', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field is required.']]]
    ));

    $moduleData['name'] = [];
    test('name > empty array', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field is required.']]]
    ));

    $moduleData['name'] = false;
    test('name > false', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]]
    ));

    $moduleData['name'] = true;
    test('name > true', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]]
    ));

    $moduleData['name'] = 1;
    test('name > integer', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]]
    ));

    $moduleData['name'] = moduleData['name'];

    /**
     * DESCRIPTION
     */
    $moduleData['description'] = 12345;
    test('description > integer', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]]
    ));

    $moduleData['description'] = false;
    test('description > false', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]]
    ));

    $moduleData['description'] = true;
    test('description > true', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]]
    ));

    $moduleData['description'] = moduleData['description'];

    /**
     * CATEGORY
     */
    $moduleData['category'] = [];
    test('category > empty array', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]]
    ));

    $moduleData['category'] = null;
    test('category > null', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]]
    ));

    $moduleData['category'] = true;
    test('category > true', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]]
    ));

    $moduleData['category'] = false;
    test('category > false', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]]
    ));

    $moduleData['category'] = moduleData['category'];

    /**
     * VERSION
     */
    $moduleData['version'] = [];
    test('version > empty array', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field is required.']]]
    ));

    $moduleData['version'] = 1.1;
    test('version > float', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]]
    ));
    $moduleData['version'] = true;
    test('version > true', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]]
    ));

    $moduleData['version'] = false;
    test('version > false', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]]
    ));

    $moduleData['version'] = moduleData['version'];

    /**
     * ENABLED
     */
    $moduleData['enabled'] = 'string';
    test('enabled > string', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field must be true or false.']]]
    ));

    $moduleData['enabled'] = '';
    test('enabled > empty string', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]]
    ));

    $moduleData['enabled'] = [];
    test('enabled > empty array', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]]
    ));

    $moduleData['enabled'] = null;
    test('enabled > null', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]]
    ));

    $moduleData['enabled'] = moduleData['enabled'];

    /**
     * INSTALLED
     */
    $moduleData['installed'] = 'string';
    test('installed > string', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['installed']],
        ['errors' => ['installed' => ['The installed field must be true or false.']]]
    ));

    $moduleData['installed'] = '';
    test('installed > empty string', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['installed']],
        ['errors' => ['installed' => ['The installed field is required.']]]
    ));

    $moduleData['installed'] = [];
    test('installed > empty array', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['installed']],
        ['errors' => ['installed' => ['The installed field is required.']]]
    ));

    $moduleData['installed'] = null;
    test('installed > null', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['installed']],
        ['errors' => ['installed' => ['The installed field is required.']]]
    ));

    $moduleData['installed'] = moduleData['installed'];
});
