<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 * Task
 */
const taskData = [
    'id' => 1,
    'index' => 1,
    'user_id' => 1,
    'assignee_id' => 2,
    'collaborator_ids' => '3, 4',
    'title' => 'Test task',
    'description' => 'This is a test task description.',
    'start_date' => '2024-01-01',
    'end_date' => '2024-01-10',
];

const updatedTaskData = [
    'id' => 1,
    'index' => 1,
    'user_id' => 4,
    'assignee_id' => 5,
    'collaborator_ids' => '6',
    'title' => 'Updated test task',
    'description' => 'Updated description for the test task.',
    'start_date' => '2024-02-01',
    'end_date' => '2024-02-15',
];
