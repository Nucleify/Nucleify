<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('documentation-api-422');
uses()->group('documentation-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($documentationData = documentationData) {
    /**
     * NAME TESTS
     */
    $documentationData['name'] = '';
    test('name > empty', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $documentationData['name'] = 1;
    test('name > integer', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $documentationData['name'] = false;
    test('name > false', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $documentationData['name'] = true;
    test('name > true', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $documentationData['name'] = [];
    test('name > empty array', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $documentationData['name'] = documentationData['name'];

    /**
     * CATEGORY TESTS
     */
    $documentationData['category'] = 1;
    test('category > integer', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $documentationData['category'] = false;
    test('category > false', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $documentationData['category'] = true;
    test('category > true', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $documentationData['category'] = [];
    test('category > empty array', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $documentationData['category'] = documentationData['category'];

    /**
     * VERSION TESTS
     */
    $documentationData['version'] = 1;
    test('version > integer', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['version']],
        ['errors' => [
            'version' => ['The version field must be a string.'],
        ]]
    ));

    $documentationData['version'] = false;
    test('version > false', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['version']],
        ['errors' => [
            'version' => ['The version field must be a string.'],
        ]]
    ));

    $documentationData['version'] = true;
    test('version > true', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['version']],
        ['errors' => [
            'version' => ['The version field must be a string.'],
        ]]
    ));

    $documentationData['version'] = [];
    test('version > empty array', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['version']],
        ['errors' => [
            'version' => ['The version field must be a string.'],
        ]]
    ));

    $documentationData['version'] = documentationData['version'];

    /**
     * FILE TESTS
     */
    $documentationData['file'] = '';
    test('file > empty', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field is required.'],
        ]]
    ));

    $documentationData['file'] = 1;
    test('file > integer', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field must be a string.'],
        ]]
    ));

    $documentationData['file'] = false;
    test('file > false', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field must be a string.'],
        ]]
    ));

    $documentationData['file'] = true;
    test('file > true', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field must be a string.'],
        ]]
    ));

    $documentationData['file'] = [];
    test('file > empty array', apiTest(
        'POST',
        'documentation.store',
        422,
        $documentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field is required.'],
        ]]
    ));

});
