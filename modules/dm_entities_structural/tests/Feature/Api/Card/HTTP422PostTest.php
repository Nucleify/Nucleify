<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('card-api-422');
uses()->group('card-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($cardData = cardData) {
    /**
     * SRC TESTS
     */
    $cardData['src'] = '';
    test('src > empty', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field is required.'],
        ]]
    ));

    $cardData['src'] = 12345;
    test('src > integer', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field must be a string.'],
        ]]
    ));

    $cardData['src'] = false;
    test('src > false', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['src']],
        ['errors' => [
            'src' => ['The src field must be a string.'],
        ]]
    ));

    $cardData['src'] = cardData['src'];

    /**
     * TITLE TESTS
     */
    $cardData['title'] = '';
    test('title > empty', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $cardData['title'] = 12345;
    test('title > integer', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $cardData['title'] = false;
    test('title > false', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $cardData['title'] = cardData['title'];

    /**
     * DESCRIPTION TESTS
     */
    $cardData['description'] = '';
    test('description > empty', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field is required.'],
        ]]
    ));

    $cardData['description'] = 12345;
    test('description > integer', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $cardData['description'] = cardData['description'];

    /**
     * CATEGORY TESTS
     */
    $cardData['category'] = 1;
    test('category > integer', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $cardData['category'] = false;
    test('category > false', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $cardData['category'] = true;
    test('category > true', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $cardData['category'] = [];
    test('category > empty array', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $cardData['category'] = cardData['category'];

    /**
     * COMPONENT TESTS
     */
    $cardData['component'] = '';
    test('component > empty', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['component']],
        ['errors' => [
            'component' => ['The component field is required.'],
        ]]
    ));

    $cardData['component'] = 12345;
    test('component > integer', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['component']],
        ['errors' => [
            'component' => ['The component field must be a string.'],
        ]]
    ));

    $cardData['component'] = cardData['component'];

    /**
     * DISPLAY TESTS
     */
    $cardData['display'] = 'string';
    test('display > string', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['display']],
        ['errors' => [
            'display' => ['The display field must be true or false.'],
        ]]
    ));

    $cardData['display'] = [];
    test('display > empty array', apiTest(
        'POST',
        'cards.store',
        422,
        $cardData,
        ['errors' => ['display']],
        ['errors' => [
            'display' => ['The display field must be true or false.'],
        ]]
    ));

    $cardData['display'] = cardData['display'];
});
