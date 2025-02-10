<?php

use App\Models\Task\TaskCollaboration;

beforeEach(function () {
    $this->createUsers();
    $this->createTask();
});

it('can be created', function () {
    expect($this->collaboration)->toBeInstanceOf(TaskCollaboration::class);
});

describe('Instance', function () {
    test('can get id', function () {
        expect($this->collaboration->getId())
            ->toBeInt()
            ->toBe($this->collaboration->id);
    });

    test('can get collaborator_id', closure: function () {
        expect($this->collaboration->getCollaboratorId())
            ->toBeInt()
            ->toBe($this->collaboration->collaborator_id);
    });

    test('can get task_id', function () {
        expect($this->collaboration->getTaskId())
            ->toBeInt()
            ->toBe($this->collaboration->task_id);
    });

    test('can get created_at date', function () {
        expect($this->collaboration->getCreatedAt())
            ->toBeString()
            ->toBe($this->collaboration->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        expect($this->collaboration->getUpdatedAt())
            ->toBeString()
            ->toBe($this->collaboration->updated_at->toDateTimeString());
    });


    describe('Scope', function () {
        test('can filter by id using scopeGetId', function () {
            $foundTaskCollaborator = TaskCollaboration::getById($this->collaboration->id)->first();

            expect($foundTaskCollaborator->id)->toBe($this->collaboration->id);
        });

        test('can filter by user_id using scopeGetCollaboratorId', function () {
            $foundTaskCollaborator = TaskCollaboration::GetByCollaboratorId($this->collaboration->collaborator_id)->first();

            expect($foundTaskCollaborator->collaborator_id)->toBe($this->collaboration->collaborator_id);
        });

        test('can filter by task_id using scopeGetTaskId', function () {
            $foundTaskCollaborator = TaskCollaboration::GetByTaskId($this->collaboration->task_id)->first();

            expect($foundTaskCollaborator->task_id)->toBe($this->collaboration->task_id);
        });

        test('can filter by created_at using scopeGetCreatedAt', function () {
            $foundTaskCollaborator = TaskCollaboration::getByCreatedAt($this->collaboration->created_at->toDateString())->first();

            expect($foundTaskCollaborator->created_at->toDateString())->toBe($this->collaboration->created_at->toDateString());
        });

        test('can filter by updated_at using scopeGetUpdatedAt', function () {
            $foundTaskCollaborator = TaskCollaboration::getByUpdatedAt($this->collaboration->updated_at->toDateString())->first();

            expect($foundTaskCollaborator->updated_at->toDateString())->toBe($this->collaboration->updated_at->toDateString());
        });
    });
});

