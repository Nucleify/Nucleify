<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Card
 */
const cardData = [
    'id' => 1,
    'src' => 'testSrc',
    'title' => 'testTitle',
    'description' => 'test description test',
    'category' => 'test',
    'component' => 'testComponent',
    'display' => false,
];

const updatedCardData = [
    'id' => 1,
    'src' => 'updatedTestSrc',
    'title' => 'updatedTestTitle',
    'description' => 'updated test description test',
    'category' => 'test2',
    'component' => 'updatedTestComponent',
    'display' => true,
];

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
 *  Feature
 */
const featureData = [
    'id' => 1,
    'icon' => 'prime:home',
    'header' => 'Feature #test',
    'description' => 'Example description #test',
    'category' => 'test',
];

const updatedFeatureData = [
    'id' => 1,
    'icon' => 'prime:cloud',
    'header' => 'Feature #test2',
    'description' => 'Example description #test2',
    'category' => 'test2',
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

/**
 * Link
 */
const linkData = [
    'id' => 1,
    'download' => 'file1.png',
    'href' => 'https://example.com',
    'src' => 'https://example.com/image.png',
    'icon' => 'icon.png',
    'category' => 'test3',
    'hreflang' => 'en',
    'media' => 'screen',
    'ping' => 'https://example.com/image.png|https://example.com/image.png',
    'referrerpolicy' => 'no-referrer',
    'rel' => 'nofollow',
    'target' => '_blank',
    'type' => 'text/html',
];

const updatedLinkData = [
    'id' => 1,
    'download' => 'file1.png',
    'href' => 'https://example.com',
    'src' => 'https://example.com/image.png',
    'icon' => 'icon.png',
    'category' => 'test3',
    'hreflang' => 'en',
    'media' => 'screen',
    'ping' => 'https://example.com/image.png|https://example.com/image.png',
    'referrerpolicy' => 'no-referrer',
    'rel' => 'nofollow',
    'target' => '_blank',
    'type' => 'text/html',
];
