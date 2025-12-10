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

describe('422 > POST', function ($updatedDocumentationData = updatedDocumentationData) {
    /**
     * NAME TESTS
     */
    $updatedDocumentationData['name'] = '';
    test('name > empty', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $updatedDocumentationData['name'] = 1;
    test('name > integer', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['name'] = false;
    test('name > false', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['name'] = true;
    test('name > true', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['name'] = [];
    test('name > empty array', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.'],
        ]]
    ));

    $updatedDocumentationData['name'] = updatedDocumentationData['name'];

    /**
     * CATEGORY TESTS
     */
    $updatedDocumentationData['category'] = 1;
    test('category > integer', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['category'] = false;
    test('category > false', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['category'] = true;
    test('category > true', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['category'] = [];
    test('category > empty array', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['category'] = updatedDocumentationData['category'];

    /**
     * VERSION TESTS
     */
    $updatedDocumentationData['version'] = 1;
    test('version > integer', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['version']],
        ['errors' => [
            'version' => ['The version field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['version'] = false;
    test('version > false', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['version']],
        ['errors' => [
            'version' => ['The version field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['version'] = true;
    test('version > true', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['version']],
        ['errors' => [
            'version' => ['The version field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['version'] = [];
    test('version > empty array', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['version']],
        ['errors' => [
            'version' => ['The version field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['version'] = updatedDocumentationData['version'];

    /**
     * FILE TESTS
     */
    $updatedDocumentationData['file'] = '';
    test('file > empty', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field is required.'],
        ]]
    ));

    $updatedDocumentationData['file'] = 1;
    test('file > integer', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['file'] = false;
    test('file > false', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['file'] = true;
    test('file > true', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field must be a string.'],
        ]]
    ));

    $updatedDocumentationData['file'] = [];
    test('file > empty array', apiTest(
        'POST',
        'documentation.store',
        422,
        $updatedDocumentationData,
        ['errors' => ['file']],
        ['errors' => [
            'file' => ['The file field is required.'],
        ]]
    ));

});
