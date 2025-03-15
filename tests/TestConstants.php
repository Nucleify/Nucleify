<?php

/**
 *  Article
 */
const articleData = [
    'id' => 1,
    'user_id' => 1,
    'title' => 'Magnam qui sed explicabo eos quisquam beatae.',
    'description' => 'Id laboriosam in consequatur perspiciatis ut perferendis. Quia suscipit earum quasi. Similique reprehenderit ipsum nisi omnis aliquid. Itaque a ad dolor quis illo ea magni.',
    'category' => 'omnis, voluptatum, omnis'
];

const updatedArticleData = [
    'id' => 1,
    'title' => 'Magnam qui sed explicabo eos quisquam beatae.',
    'description' => 'Id laboriosam in consequatur perspiciatis ut perferendis. Quia suscipit earum quasi. Similique reprehenderit ipsum nisi omnis aliquid. Itaque a ad dolor quis illo ea magni.',
    'category' => 'omnis, voluptatum, suspicit'
];

/**
 *  Contact
 */
const contactData = [
    'id' => 1,
    'user_id' => 1,
    'first_name' => 'Test',
    'last_name' => 'Test',
    'email' => 'test123@example.com',
    'personal_phone' => '987654321',
    'work_phone' => '123456789',
    'address' => '123 Main St, City',
    'birthday' => '2023-11-25',
    'contact_groups' => null,
    'role' => 'user'
];

const updatedContactData = [
    'id' => 1,
    'user_id' => 1,
    'first_name' => 'Update',
    'last_name' => 'Update',
    'email' => 'testupdate123@example.com',
    'personal_phone' => '987654321',
    'work_phone' => '123456789',
    'address' => '123 Update St, City',
    'birthday' => '2023-11-26',
    'contact_groups' => null,
    'role' => 'admin'
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
 *  Money
 */
const moneyData = [
    'count' => 100000,
    'id' => 1,
    'user_id' => 1,
    'sender' => 'NL20ABNA7044037380',
    'receiver' => 'LU920102241595375843',
    'title' => 'Magnam qui sed explicabo eos.',
    'description' => 'Id laboriosam in consequatur perspiciatis ut perferendis. Quia suscipit earum quasi.',
    'category' => 'omnis'
];
const updatedMoneyData = [
    'count' => 100000,
    'id' => 1,
    'user_id' => 1,
    'sender' => 'NL20ABNA7044037380',
    'receiver' => 'LU920102241595375843',
    'title' => 'Quia explicabo eos quisquam.',
    'description' => 'Id laboriosam in consequatur perspiciatis ut perferendis. Quia suscipit earum quasi.',
    'category' => 'omnis'
];

/**
 *  User
 */
const userData = [
    'id' => 1,
    'name' => 'User',
    'email' => 'user@example.com',
    'password' => 'password',
    'role' => 'user'
];
const updatedUserData = [
    'id' => 1,
    'name' => 'Updated User',
    'password' => 'password',
    'email' => 'updateduser@example.com',
    'role' => 'user'
];

/**
 * Question
 */
const questionData = [
    'id' => 1,
    'user_id' => 1,
    'index' => 1,
    'content' => 'Question',
    'answer' => 'Answer',
    'category' => 'test',
    'on_site' => True,
    'display' => True
];
const updatedQuestionData = [
    'id' => 1,
    'user_id' => 1,
    'index' => 1,
    'content' => 'Question2',
    'answer' => 'Answer2',
    'category' => 'test2',
    'on_site' => False,
    'display' => False
];

/**
 * Technology
 */
const technologyData = [
    'id' => 1,
    'user_id' => 1,
    'href' => 'href',
    'src' => 'src',
    'label' => 'Label',
    'description' => 'Description',
    'category' => 'test',
    'display' => True
];
const updatedTechnologyData = [
    'id' => 1,
    'user_id' => 1,
    'href' => 'href2',
    'src' => 'src2',
    'label' => 'Label2',
    'description' => 'Description2',
    'category' => 'test2',
    'display' => False
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
