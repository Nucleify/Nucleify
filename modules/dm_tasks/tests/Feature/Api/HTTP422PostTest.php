<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($taskData = taskData) {
    /**
     * USER_ID TESTS
     */
    $taskData['user_id'] = '';
    test('user_id > empty', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $taskData['user_id'] = 'user_id';
    test('user_id > string', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $taskData['user_id'] = false;
    test('user_id > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field must be an integer.'],
        ]]
    ));

    $taskData['user_id'] = [];
    test('user_id > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['user_id']],
        ['errors' => [
            'user_id' => ['The user id field is required.'],
        ]]
    ));

    $taskData['user_id'] = taskData['user_id'];

    /**
     * ASSIGNEE_ID TESTS
     */
    $taskData['assignee_id'] = 'user_id';
    test('assignee_id > string', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['assignee_id']],
        ['errors' => [
            'assignee_id' => ['The assignee id field must be an integer.'],
        ]]
    ));

    $taskData['assignee_id'] = false;
    test('assignee_id > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['assignee_id']],
        ['errors' => [
            'assignee_id' => ['The assignee id field must be an integer.'],
        ]]
    ));

    $taskData['assignee_id'] = [];
    test('assignee_id > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['assignee_id']],
        ['errors' => [
            'assignee_id' => ['The assignee id field must be an integer.'],
        ]]
    ));

    $taskData['assignee_id'] = taskData['assignee_id'];

    /**
     * COLLABORATOR_IDS TESTS
     */
    $taskData['collaborator_ids'] = 1;
    test('collaborator_ids > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['collaborator_ids']],
        ['errors' => [
            'collaborator_ids' => ['The collaborator ids field must be a string.'],
        ]]
    ));

    $taskData['collaborator_ids'] = false;
    test('collaborator_ids > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['collaborator_ids']],
        ['errors' => [
            'collaborator_ids' => ['The collaborator ids field must be a string.'],
        ]]
    ));

    $taskData['collaborator_ids'] = true;
    test('collaborator_ids > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['collaborator_ids']],
        ['errors' => [
            'collaborator_ids' => ['The collaborator ids field must be a string.'],
        ]]
    ));

    $taskData['collaborator_ids'] = [];
    test('collaborator_ids > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['collaborator_ids']],
        ['errors' => [
            'collaborator_ids' => ['The collaborator ids field must be a string.'],
        ]]
    ));

    $taskData['collaborator_ids'] = taskData['collaborator_ids'];

    /**
     * TITLE TESTS
     */
    $taskData['title'] = '';
    test('title > empty', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $taskData['title'] = 1;
    test('title > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $taskData['title'] = false;
    test('title > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $taskData['title'] = true;
    test('title > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field must be a string.'],
        ]]
    ));

    $taskData['title'] = [];
    test('title > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['title']],
        ['errors' => [
            'title' => ['The title field is required.'],
        ]]
    ));

    $taskData['title'] = taskData['title'];

    /**
     * DESCRIPTION TESTS
     */
    $taskData['description'] = 1;
    test('description > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $taskData['description'] = false;
    test('description > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $taskData['description'] = true;
    test('description > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $taskData['description'] = [];
    test('description > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['description']],
        ['errors' => [
            'description' => ['The description field must be a string.'],
        ]]
    ));

    $taskData['description'] = taskData['description'];

    /**
     * START_DATE TESTS
     */
    $taskData['start_date'] = '';
    test('start_date > empty', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['start_date']],
        ['errors' => [
            'start_date' => ['The start date field is required.'],
        ]]
    ));

    $taskData['start_date'] = 1;
    test('start_date > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['start_date']],
        ['errors' => [
            'start_date' => [
                'The start date field must be a string.',
                'The start date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $taskData['start_date'] = false;
    test('start_date > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['start_date']],
        ['errors' => [
            'start_date' => [
                'The start date field must be a string.',
                'The start date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $taskData['start_date'] = true;
    test('start_date > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['start_date']],
        ['errors' => [
            'start_date' => [
                'The start date field must be a string.',
                'The start date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $taskData['start_date'] = taskData['start_date'];

    /**
     * END_DATE TESTS
     */
    $taskData['end_date'] = 1;
    test('end_date > integer', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['end_date']],
        ['errors' => [
            'end_date' => [
                'The end date field must be a date after or equal to start date.',
                'The end date field must be a string.',
                'The end date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $taskData['end_date'] = false;
    test('end_date > false', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['end_date']],
        ['errors' => [
            'end_date' => [
                'The end date field must be a date after or equal to start date.',
                'The end date field must be a string.',
                'The end date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $taskData['end_date'] = true;
    test('end_date > true', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['end_date']],
        ['errors' => [
            'end_date' => [
                'The end date field must be a date after or equal to start date.',
                'The end date field must be a string.',
                'The end date field must match the format Y-m-d.',
            ],
        ]]
    ));

    $taskData['end_date'] = [];
    test('end_date > empty array', apiTest(
        'POST',
        'tasks.store',
        422,
        $taskData,
        ['errors' => ['end_date']],
        ['errors' => [
            'end_date' => [
                'The end date field must be a date after or equal to start date.',
                'The end date field must be a string.',
                'The end date field must match the format Y-m-d.',
            ],
        ]]
    ));

});
