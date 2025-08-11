<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('question-api-422');
uses()->group('question-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function ($updatedQuestionData = updatedQuestionData) {
    /**
     * CONTENT TESTS
     */
    $updatedQuestionData['content'] = '';
    test('content > empty', apiTest(
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
    test('content > integer', apiTest(
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
    test('content > false', apiTest(
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
    test('content > true', apiTest(
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
    test('content > empty array', apiTest(
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
    test('answer > integer', apiTest(
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
    test('answer > false', apiTest(
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
    test('answer > true', apiTest(
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
    test('answer > empty array', apiTest(
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
    test('category > integer', apiTest(
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
    test('category > false', apiTest(
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
    test('category > true', apiTest(
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
    test('category > empty array', apiTest(
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
