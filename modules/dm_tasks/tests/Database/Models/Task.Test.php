<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Task;

beforeEach(function (): void {
    $this->model = Task::create([
        'user_id' => 10,
        'assignee_id' => 20,
        'collaborator_ids' => [30, 40],
        'title' => 'Test Task',
        'description' => 'Opis testowego zadania',
        'start_date' => '2025-07-01',
        'end_date' => '2025-07-10',
    ]);
});

describe('Instance', function (): void {
    test('can be created', function (): void {
        expect($this->model)->toBeInstanceOf(Task::class);
    });

    test('can get id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get user_id', function (): void {
        expect($this->model->getUserId())
            ->toBeInt()
            ->toBe(10);
    });

    test('can get assignee_id', function (): void {
        expect($this->model->getAssigneeId())
            ->toBeInt()
            ->toBe(20);
    });

    test('can get collaborator_ids', function (): void {
        expect($this->model->getCollaboratorIds())
            ->toBeArray()
            ->toBe([30, 40]);
    });

    test('can get title', function (): void {
        expect($this->model->getTitle())
            ->toBeString()
            ->toBe('Test Task');
    });

    test('can get description', function (): void {
        expect($this->model->getDescription())
            ->toBeString()
            ->toBe('Opis testowego zadania');
    });

    test('can get start_date', function (): void {
        expect($this->model->getStartDate())
            ->toBeString()
            ->toBe('2025-07-01');
    });

    test('can get end_date', function (): void {
        expect($this->model->getEndDate())
            ->toBeString()
            ->toBe('2025-07-10');
    });

    test('can get created_at', function (): void {
        expect($this->model->getCreatedAt())
            ->toBeString()
            ->toBe($this->model->created_at->toDateTimeString());
    });

    test('can get updated_at', function (): void {
        expect($this->model->getUpdatedAt())
            ->toBeString()
            ->toBe($this->model->updated_at->toDateTimeString());
    });
});

describe('Scope', function (): void {
    test('can filter tasks by id using scopeGetById', function (): void {
        $foundModel = Task::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter tasks by user_id using scopeGetByUserId', function (): void {
        $foundModel = Task::getByUserId(10)->first();

        expect($foundModel->user_id)->toBe(10);
    });

    test('can filter tasks by assignee_id using scopeGetByAssigneeId', function (): void {
        $foundModel = Task::getByAssigneeId(20)->first();

        expect($foundModel->assignee_id)->toBe(20);
    });

    test('can filter tasks by title using scopeGetByTitle', function (): void {
        $foundModel = Task::getByTitle('Test Task')->first();

        expect($foundModel->title)->toBe('Test Task');
    });

    test('can filter tasks by start_date using scopeGetByStartDate', function (): void {
        $foundModel = Task::getByStartDate('2025-07-01')->first();

        expect($foundModel->start_date)->toBe('2025-07-01');
    });

    test('can filter tasks by end_date using scopeGetByEndDate', function (): void {
        $foundModel = Task::getByEndDate('2025-07-10')->first();

        expect($foundModel->end_date)->toBe('2025-07-10');
    });
});
