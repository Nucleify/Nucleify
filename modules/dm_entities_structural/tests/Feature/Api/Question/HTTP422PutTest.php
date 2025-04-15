<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function ($updatedQuestionData = updatedQuestionData) {
    /**
     * CONTENT TESTS
     */
    $updatedQuestionData['content'] = '';
    test('invalid content > empty', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => ['The content field is required.'],
        ]]
    ));

    $updatedQuestionData['content'] = 1;
    test('invalid content > integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ],
        ]]
    ));

    $updatedQuestionData['content'] = false;
    test('invalid content > false', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ],
        ]]
    ));

    $updatedQuestionData['content'] = true;
    test('invalid content > true', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ],
        ]]
    ));

    $updatedQuestionData['content'] = [];
    test('invalid content > empty array', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => ['The content field is required.'],
        ]]
    ));

    $updatedQuestionData['content'] = updatedQuestionData['content'];

    /**
     * ANSWER TESTS
     */
    $updatedQuestionData['answer'] = 1;
    test('invalid answer > integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ],
        ]]
    ));

    $updatedQuestionData['answer'] = false;
    test('invalid answer > false', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ],
        ]]
    ));

    $updatedQuestionData['answer'] = true;
    test('invalid answer > true', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ],
        ]]
    ));

    $updatedQuestionData['answer'] = [];
    test('invalid answer > empty array', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => ['The answer field is required.'],
        ]]
    ));

    $updatedQuestionData['answer'] = updatedQuestionData['answer'];

    /**
     * CATEGORY TESTS
     */
    $updatedQuestionData['category'] = 1;
    test('invalid category > integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedQuestionData['category'] = false;
    test('invalid category > false', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedQuestionData['category'] = true;
    test('invalid category > true', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $updatedQuestionData['category'] = [];
    test('invalid category > empty array', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));
});
