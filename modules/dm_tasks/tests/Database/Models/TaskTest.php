<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Task;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = Task::factory()->create();
});

it('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(Task::class);
});

describe('Instance', function (): void {
    test('can get id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get user_id', function (): void {
        expect($this->model->getUserId())
            ->toBeInt()
            ->toBe($this->model->user_id);
    });

    test('can get assignee_id', function (): void {
        expect($this->model->getAssigneeId())
            ->toBeInt()
            ->toBe($this->model->assignee_id);
    });

    test('can get collaborator_ids', function (): void {
        expect($this->model->getCollaboratorIds())
            ->toBeString()
            ->toBe($this->model->collaborator_ids);
    });

    test('can get title', function (): void {
        expect($this->model->getTitle())
            ->toBeString()
            ->toBe($this->model->title);
    });

    test('can get description', function (): void {
        expect($this->model->getDescription())
            ->toBeString()
            ->toBe($this->model->description);
    });

    test('can get start_date', function (): void {
        expect($this->model->getStartDate())
            ->toBeString()
            ->toBe($this->model->start_date);
    });

    test('can get end_date', function (): void {
        expect($this->model->getEndDate())
            ->toBeString()
            ->toBe($this->model->end_date);
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
        $foundModel = Task::getByUserId($this->model->user_id)->first();

        expect($foundModel->user_id)->toBe($this->model->user_id);
    });

    test('can filter tasks by assignee_id using scopeGetByAssigneeId', function (): void {
        $foundModel = Task::getByAssigneeId($this->model->assignee_id)->first();

        expect($foundModel->assignee_id)->toBe($this->model->assignee_id);
    });

    test('can filter tasks by title using scopeGetByTitle', function (): void {
        $foundModel = Task::getByTitle($this->model->title)->first();

        expect($foundModel->title)->toBe($this->model->title);
    });

    test('can filter tasks by start_date using scopeGetByStartDate', function (): void {
        $foundModel = Task::getByStartDate($this->model->start_date)->first();

        expect($foundModel->start_date)->toBe($this->model->start_date);
    });

    test('can filter tasks by end_date using scopeGetByEndDate', function (): void {
        $foundModel = Task::getByEndDate($this->model->end_date)->first();

        expect($foundModel->end_date)->toBe($this->model->end_date);
    });
});
