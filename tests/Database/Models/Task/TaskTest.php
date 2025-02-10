<?php

use App\Models\Task\Task;

beforeEach(function () {
    $this->createUsers();
    $this->createTask();
});

it('can be created', function () {
    expect($this->task)->toBeInstanceOf(Task::class);
});

describe('Instance', function () {
    test('can get id', function () {
        expect($this->task->getId())
            ->toBeInt()
            ->toBe($this->task->id);
    });

    test('can get creator_id', function () {
        expect($this->task->getCreatorId())
            ->toBeInt()
            ->toBe($this->task->creator_id);
    });

    test('can get assignee_id', function () {
        expect($this->task->getAssigneeId())
            ->toBeInt()
            ->toBe($this->task->assignee_id);
    });

    test('can get title', function () {
        expect($this->task->getTitle())
            ->toBeString()
            ->toBe($this->task->title);
    });

    test('can get description', function () {
        expect($this->task->getDescription())
            ->toBeString()
            ->toBe($this->task->description);
    });

    test('can get start date', function () {
        expect($this->task->getStartDate())
            ->toBeString()
            ->toBe($this->task->start_date);
    });

    test('can get end date', function () {
        expect($this->task->getEndDate())
            ->toBeString()
            ->toBe($this->task->end_date);
    });

    test('can get created_at date', function () {
        expect($this->task->getCreatedAt())
            ->toBeString()
            ->toBe($this->task->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        expect($this->task->getUpdatedAt())
            ->toBeString()
            ->toBe($this->task->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by id using scopeGetById', function () {
        $foundTask = Task::getById($this->task->id)->first();

        expect($foundTask->id)->toBe($this->task->id);
    });

    test('can filter by user_id using scopeGetByCreatorId', function () {
        $foundTask = Task::getByCreatorId($this->task->creator_id)->first();

        expect($foundTask->creator_id)->toBe($this->task->creator_id);
    });

    test('can filter by assignee_id using scopeGetByAssigneeId', function () {
        $foundTask = Task::getByAssigneeId($this->task->assignee_id)->first();

        expect($foundTask->assignee_id)->toBe($this->task->assignee_id);
    });

    test('can filter by title using scopeGetByTitle', function () {
        $foundTask = Task::getByTitle($this->task->title)->first();

        expect($foundTask->title)->toBe($this->task->title);
    });

    test('can filter by description using scopeGetByDescription', function () {
        $foundTask = Task::getByDescription($this->task->description)->first();

        expect($foundTask->description)->toBe($this->task->description);
    });

    test('can filter by start_date using scopeGetByStartDate', function () {
        $foundTask = Task::getByStartDate($this->task->start_date)->first();

        expect($foundTask->start_date)->toBe($this->task->start_date);
    });

    test('can filter by end_date using scopeGetByEndDate', function () {
        $foundTask = Task::getByEndDate($this->task->end_date)->first();

        expect($foundTask->end_date)->toBe($this->task->end_date);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function () {
        $foundTask = Task::getByCreatedAt($this->task->created_at->toDateString())->first();

        expect($foundTask->created_at->toDateString())->toBe($this->task->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function () {
        $foundTask = Task::getByUpdatedAt($this->task->updated_at->toDateString())->first();

        expect($foundTask->updated_at->toDateString())->toBe($this->task->updated_at->toDateString());
    });
});
