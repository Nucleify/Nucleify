<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedCardData = updatedCardData) {
    /**
     * SRC TESTS
     */
    $updatedCardData['src'] = '';
    test('invalid src > empty', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field is required.'],
        ]]
    ));

    $updatedCardData['src'] = 12345;
    test('invalid src > integer', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field must be a string.'],
        ]]
    ));

    $updatedCardData['src'] = false;
    test('invalid src > false', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field must be a string.'],
        ]]
    ));

    $updatedCardData['src'] = updatedCardData['src'];

    /**
     * TITLE TESTS
     */
    $updatedCardData['title'] = '';
    test('invalid title > empty', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $updatedCardData['title'] = 12345;
    test('invalid title > integer', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $updatedCardData['title'] = false;
    test('invalid title > false', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $updatedCardData['title'] = updatedCardData['title'];

    /**
     * DESCRIPTION TESTS
     */
    $updatedCardData['description'] = '';
    test('invalid description > empty', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field is required.'],
        ]]
    ));

    $updatedCardData['description'] = 12345;
    test('invalid description > integer', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $updatedCardData['description'] = updatedCardData['description'];

    /**
     * CATEGORY TESTS
     */
    $updatedCardData['category'] = 1;
    test('invalid category > integer', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedCardData['category'] = false;
    test('invalid category > false', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedCardData['category'] = true;
    test('invalid category > true', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedCardData['category'] = [];
    test('invalid category > empty array', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedCardData['category'] = updatedCardData['category'];

    /**
     * COMPONENT TESTS
     */
    $updatedCardData['component'] = '';
    test('invalid component > empty', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['component']],
        ['errors' => [
            'component' => ['The component field is required.'],
        ]]
    ));

    $updatedCardData['component'] = 12345;
    test('invalid component > integer', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['component']],
        ['errors' => [
            'component' => ['The component field must be a string.'],
        ]]
    ));

    $updatedCardData['component'] = updatedCardData['component'];

    /**
     * DISPLAY TESTS
     */
    $updatedCardData['display'] = 'string';
    test('invalid display > string', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['display']],
        ['errors' => [
            'display' => ['The display field must be true or false.'],
        ]]
    ));

    $updatedCardData['display'] = [];
    test('invalid display > empty array', apiTest(
        'PUT',
        'cards.update',
        422,
        $updatedCardData,
        ['errors' => ['display']],
        ['errors' => [
            'display' => ['The display field must be true or false.'],
        ]]
    ));
});
