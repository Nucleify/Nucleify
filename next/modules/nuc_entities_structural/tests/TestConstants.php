<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Color
 */
const colorData = [
    'id' => 1,
    'user_id' => 1,
    'entity' => 'article',
    'value' => '#6d7c75',
    'new' => true,
];

const updatedColorData = [
    'id' => 1,
    'user_id' => 1,
    'entity' => 'contact',
    'value' => '#39965b',
    'new' => false,
];

/**
 * Question
 */
const questionData = [
    'id' => 1,
    'index' => 1,
    'content' => 'Question',
    'answer' => 'Answer',
    'category' => 'test',
    'on_site' => true,
    'display' => true,
];
const updatedQuestionData = [
    'id' => 1,
    'index' => 1,
    'content' => 'Question2',
    'answer' => 'Answer2',
    'category' => 'test2',
    'on_site' => false,
    'display' => false,
];

/**
 * Technology
 */
const technologyData = [
    'id' => 1,
    'href' => 'href',
    'src' => 'src',
    'label' => 'Label',
    'description' => 'Description',
    'category' => 'test',
    'display' => true,
];
const updatedTechnologyData = [
    'id' => 1,
    'href' => 'href2',
    'src' => 'src2',
    'label' => 'Label2',
    'description' => 'Description2',
    'category' => 'test2',
    'display' => false,
];
