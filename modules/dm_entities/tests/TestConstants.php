<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Article
 */
const articleData = [
    'id' => 1,
    'user_id' => 1,
    'title' => 'Magnam qui sed explicabo eos quisquam beatae.',
    'description' => 'Id laboriosam in consequatur perspiciatis ut perferendis. Quia suscipit earum quasi. Similique reprehenderit ipsum nisi omnis aliquid. Itaque a ad dolor quis illo ea magni.',
    'category' => 'omnis, voluptatum, omnis',
];

const updatedArticleData = [
    'id' => 1,
    'title' => 'Magnam qui sed explicabo eos quisquam beatae.',
    'description' => 'Id laboriosam in consequatur perspiciatis ut perferendis. Quia suscipit earum quasi. Similique reprehenderit ipsum nisi omnis aliquid. Itaque a ad dolor quis illo ea magni.',
    'category' => 'omnis, voluptatum, suspicit',
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
    'role' => 'user',
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
    'role' => 'admin',
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
    'category' => 'omnis',
];
const updatedMoneyData = [
    'count' => 100000,
    'id' => 1,
    'user_id' => 1,
    'sender' => 'NL20ABNA7044037380',
    'receiver' => 'LU920102241595375843',
    'title' => 'Quia explicabo eos quisquam.',
    'description' => 'Id laboriosam in consequatur perspiciatis ut perferendis. Quia suscipit earum quasi.',
    'category' => 'omnis',
];

/**
 *  User
 */
const userData = [
    'id' => 1,
    'name' => 'User',
    'email' => 'user@example.com',
    'password' => 'password',
    'role' => 'user',
];
const updatedUserData = [
    'id' => 1,
    'name' => 'Updated User',
    'password' => 'password',
    'email' => 'updateduser@example.com',
    'role' => 'user',
];
