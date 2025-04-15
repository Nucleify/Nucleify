<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function ($cardData = cardData) {
    /**
     * SRC TESTS
     */
    $cardData['src'] = '';
    test('invalid src > empty', apiTest(
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
    test('invalid src > integer', apiTest(
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
    test('invalid src > false', apiTest(
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
    test('invalid title > empty', apiTest(
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
    test('invalid title > integer', apiTest(
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
    test('invalid title > false', apiTest(
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
    test('invalid description > empty', apiTest(
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
    test('invalid description > integer', apiTest(
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
    test('invalid category > integer', apiTest(
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
    test('invalid category > false', apiTest(
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
    test('invalid category > true', apiTest(
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
    test('invalid category > empty array', apiTest(
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
    test('invalid component > empty', apiTest(
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
    test('invalid component > integer', apiTest(
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
    test('invalid display > string', apiTest(
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
    test('invalid display > empty array', apiTest(
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
