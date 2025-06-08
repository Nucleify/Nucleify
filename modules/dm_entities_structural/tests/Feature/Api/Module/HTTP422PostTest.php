<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($moduleData = moduleData) {

    /**
     * NAME
     */
    $moduleData['name'] = '';
    test('invalid name > empty string', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field is required.']]]
    ));

    $moduleData['name'] = [];
    test('invalid name > empty array', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field is required.']]]
    ));

    $moduleData['name'] = false;
    test('invalid name > false', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]]
    ));

    $moduleData['name'] = true;
    test('invalid name > true', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['name']],
        ['errors' => ['name' => ['The name field must be a string.']]]
    ));

    $moduleData['name'] = 1;
    test('invalid name > integer', apiTest(
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
    test('invalid description > integer', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]]
    ));

    $moduleData['description'] = false;
    test('invalid description > false', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['description']],
        ['errors' => ['description' => ['The description field must be a string.']]]
    ));

    $moduleData['description'] = true;
    test('invalid description > true', apiTest(
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
    test('invalid category > empty array', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]]
    ));

    $moduleData['category'] = null;
    test('invalid category > null', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]]
    ));

    $moduleData['category'] = true;
    test('invalid category > true', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['category']],
        ['errors' => ['category' => ['The category field must be a string.']]]
    ));

    $moduleData['category'] = false;
    test('invalid category > false', apiTest(
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
    test('invalid version > empty array', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field is required.']]]
    ));

    $moduleData['version'] = 1.1;
    test('invalid version > float', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]]
    ));
    $moduleData['version'] = true;
    test('invalid version > true', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['version']],
        ['errors' => ['version' => ['The version field must be a string.']]]
    ));

    $moduleData['version'] = false;
    test('invalid version > false', apiTest(
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
    test('invalid enabled > string', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field must be true or false.']]]
    ));

    $moduleData['enabled'] = '';
    test('invalid enabled > empty string', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]]
    ));

    $moduleData['enabled'] = [];
    test('invalid enabled > empty array', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]]
    ));

    $moduleData['enabled'] = null;
    test('invalid enabled > null', apiTest(
        'POST',
        'modules.store',
        422,
        $moduleData,
        ['errors' => ['enabled']],
        ['errors' => ['enabled' => ['The enabled field is required.']]]
    ));
});
