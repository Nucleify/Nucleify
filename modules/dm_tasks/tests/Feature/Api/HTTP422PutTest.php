<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('task-api-422');
uses()->group('task-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedTaskData = updatedTaskData) {
    /**
     * USER_ID TESTS
     */
    $updatedTaskData['user_id'] = '';
    test('user_id > empty', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $updatedTaskData['user_id'] = 'user_id';
    test('user_id > string', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedTaskData['user_id'] = false;
    test('user_id > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $updatedTaskData['user_id'] = [];
    test('user_id > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $updatedTaskData['user_id'] = updatedTaskData['user_id'];

    /**
     * ASSIGNEE_ID TESTS
     */
    $updatedTaskData['assignee_id'] = 'user_id';
    test('assignee_id > string', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['assignee_id']],
        ['errors' => [
            'assignee_id' => ['The assignee id field must be an integer.'],
        ]]
    ));

    $updatedTaskData['assignee_id'] = false;
    test('assignee_id > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['assignee_id']],
        ['errors' => [
            'assignee_id' => ['The assignee id field must be an integer.'],
        ]]
    ));

    $updatedTaskData['assignee_id'] = [];
    test('assignee_id > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['assignee_id']],
        ['errors' => [
            'assignee_id' => ['The assignee id field must be an integer.'],
        ]]
    ));

    $updatedTaskData['assignee_id'] = updatedTaskData['assignee_id'];

    /**
     * COLLABORATOR_IDS TESTS
     */
    $updatedTaskData['collaborator_ids'] = 1;
    test('collaborator_ids > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['collaborator_ids']],
        ['errors' => [
            'collaborator_ids' => ['The collaborator ids field must be a string.'],
        ]]
    ));

    $updatedTaskData['collaborator_ids'] = false;
    test('collaborator_ids > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['collaborator_ids']],
        ['errors' => [
            'collaborator_ids' => ['The collaborator ids field must be a string.'],
        ]]
    ));

    $updatedTaskData['collaborator_ids'] = true;
    test('collaborator_ids > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['collaborator_ids']],
        ['errors' => [
            'collaborator_ids' => ['The collaborator ids field must be a string.'],
        ]]
    ));

    $updatedTaskData['collaborator_ids'] = [];
    test('collaborator_ids > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['collaborator_ids']],
        ['errors' => [
            'collaborator_ids' => ['The collaborator ids field must be a string.'],
        ]]
    ));

    $updatedTaskData['collaborator_ids'] = updatedTaskData['collaborator_ids'];

    /**
     * TITLE TESTS
     */
    $updatedTaskData['title'] = '';
    test('title > empty', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $updatedTaskData['title'] = 1;
    test('title > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $updatedTaskData['title'] = false;
    test('title > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $updatedTaskData['title'] = true;
    test('title > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $updatedTaskData['title'] = [];
    test('title > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $updatedTaskData['title'] = updatedTaskData['title'];

    /**
     * DESCRIPTION TESTS
     */
    $updatedTaskData['description'] = 1;
    test('description > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $updatedTaskData['description'] = false;
    test('description > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $updatedTaskData['description'] = true;
    test('description > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $updatedTaskData['description'] = [];
    test('description > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $updatedTaskData['description'] = updatedTaskData['description'];

    /**
     * START_DATE TESTS
     */
    $updatedTaskData['start_date'] = '';
    test('start_date > empty', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['start_date']],
        ['errors' => [
            'start_date' => ['The start date field is required.'],
        ]]
    ));

    $updatedTaskData['start_date'] = 1;
    test('start_date > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['start_date']],
        ['errors' => [
            'start_date' => [
                'The start date field must be a string.',
                'The start date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $updatedTaskData['start_date'] = false;
    test('start_date > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['start_date']],
        ['errors' => [
            'start_date' => [
                'The start date field must be a string.',
                'The start date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $updatedTaskData['start_date'] = true;
    test('start_date > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['start_date']],
        ['errors' => [
            'start_date' => [
                'The start date field must be a string.',
                'The start date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $updatedTaskData['start_date'] = updatedTaskData['start_date'];

    /**
     * END_DATE TESTS
     */
    $updatedTaskData['end_date'] = 1;
    test('end_date > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['end_date']],
        ['errors' => [
            'end_date' => [
                'The end date field must be a date after or equal to start date.',
                'The end date field must be a string.',
                'The end date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $updatedTaskData['end_date'] = false;
    test('end_date > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['end_date']],
        ['errors' => [
            'end_date' => [
                'The end date field must be a date after or equal to start date.',
                'The end date field must be a string.',
                'The end date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $updatedTaskData['end_date'] = true;
    test('end_date > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['end_date']],
        ['errors' => [
            'end_date' => [
                'The end date field must be a date after or equal to start date.',
                'The end date field must be a string.',
                'The end date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $updatedTaskData['end_date'] = [];
    test('end_date > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $updatedTaskData,
        ['errors' => ['end_date']],
        ['errors' => [
            'end_date' => [
                'The end date field must be a date after or equal to start date.',
                'The end date field must be a string.',
                'The end date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $updatedTaskData['end_date'] = updatedTaskData['end_date'];
});
