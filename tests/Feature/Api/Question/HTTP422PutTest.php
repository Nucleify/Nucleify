<?php

beforeEach(function () {
  $this->createUsers();
  $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > PUT', function($updatedQuestionData = updatedQuestionData) {
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
            'content' => ['The content field is required.']
        ]]
    ));

    $updatedQuestionData['content'] = 1;
    test('invalid content > positive integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['content'] = -1;
    test('invalid content > negative integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ]
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
            ]
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
            ]
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
            'content' => ['The content field is required.']
        ]]
    ));

    $updatedQuestionData['content'] = [1];
    test('invalid content > array with positive integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['content'] = [-1];
    test('invalid content > array with negative integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['content'] = ['content'];
    test('invalid content > array with string', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['content'] = ['content1', 'content2'];
    test('invalid content > array with multiple different strings', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['content'] = updatedQuestionData['content']; // reset content value

        /**
     * ANSWER TESTS
     */
    $updatedQuestionData['answer'] = 1;
    test('invalid answer > positive integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = -1;
    test('invalid answer > negative integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
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
            ]
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
            ]
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
            'answer' => ['The answer field is required.']
        ]]
    ));

    $updatedQuestionData['answer'] = [1];
    test('invalid answer > array with positive integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [-1];
    test('invalid answer > array with negative integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [1, 1];
    test('invalid answer > array with multiple same positive integers', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [1, 2];
    test('invalid answer > array with multiple different positive integers', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [-1, -1];
    test('invalid answer > array with multiple same negative integers', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [-1, -2];
    test('invalid answer > array with multiple different negative integers', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = ['answer'];
    test('invalid answer > array with string', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = ['answer1', 'answer1'];
    test('invalid answer > array with multiple same strings', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = ['answer1', 'answer2'];
    test('invalid answer > array with multiple different strings', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [true];
    test('invalid answer > array with true', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [false];
    test('invalid answer > array with false', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [true, true];
    test('invalid answer > array with multiple true', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [false, false];
    test('invalid answer > array with multiple false', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = [true , false];
    test('invalid answer > array with true false', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $updatedQuestionData['answer'] = updatedQuestionData['answer']; // reset answer value

    /**
     * CATEGORY TESTS
     */
    $updatedQuestionData['category'] = 1;
    test('invalid category > positive integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = -1;
    test('invalid category > negative integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
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
            'category' => ['The category field must be a string.']
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
            'category' => ['The category field must be a string.']
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
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [1];
    test('invalid category > array with positive integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [-1];
    test('invalid category > array with negative integer', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [1, 1];
    test('invalid category > array with multiple same positive integers', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [1, 2];
    test('invalid category > array with multiple different positive integers', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [-1, -1];
    test('invalid category > array with multiple same negative integers', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [-1, -2];
    test('invalid category > array with multiple different negative integers', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = ['category'];
    test('invalid category > array with string', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = ['category1', 'category1'];
    test('invalid category > array with multiple same strings', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = ['category1', 'category2'];
    test('invalid category > array with multiple different strings', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [true];
    test('invalid category > array with true', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [false];
    test('invalid category > array with false', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [true, true];
    test('invalid category > array with multiple true', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [false, false];
    test('invalid category > array with multiple false', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $updatedQuestionData['category'] = [true , false];
    test('invalid category > array with true false', apiTest(
        'PUT',
        'questions.update',
        422,
        $updatedQuestionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));
});