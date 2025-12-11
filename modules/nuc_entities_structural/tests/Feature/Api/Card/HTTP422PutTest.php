<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('card-api-422');
uses()->group('card-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedCardData = updatedCardData) {
    /**
     * SRC TESTS
     */
    $updatedCardData['src'] = '';
    test('src > empty', apiTest(
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
    test('src > integer', apiTest(
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
    test('src > false', apiTest(
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
    test('title > empty', apiTest(
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
    test('title > integer', apiTest(
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
    test('title > false', apiTest(
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
    test('description > empty', apiTest(
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
    test('description > integer', apiTest(
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
    test('category > integer', apiTest(
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
    test('category > false', apiTest(
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
    test('category > true', apiTest(
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
    test('category > empty array', apiTest(
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
    test('component > empty', apiTest(
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
    test('component > integer', apiTest(
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
    test('display > string', apiTest(
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
    test('display > empty array', apiTest(
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
