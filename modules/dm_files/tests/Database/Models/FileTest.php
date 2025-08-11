<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\File;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = File::factory()->create();
});

test('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(File::class);
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

    test('can get path', function (): void {
        expect($this->model->getPath())
            ->toBeString()
            ->toBe($this->model->path);
    });

    test('can get mime_type', function (): void {
        expect($this->model->getMimeType())
            ->toBeString()
            ->toBe($this->model->mime_type);
    });

    test('can get size', function (): void {
        expect($this->model->getSize())
            ->toBeString()
            ->toBe($this->model->size);
    });

    test('can get created_at date', function (): void {
        expect($this->model->getCreatedAt())
            ->toBeString()
            ->toBe($this->model->created_at->toDateTimeString());
    });

    test('can get updated_at date', function (): void {
        expect($this->model->getUpdatedAt())
            ->toBeString()
            ->toBe($this->model->updated_at->toDateTimeString());
    });
});

describe('Scope', function (): void {
    test('can filter by id using scopeGetById', function (): void {
        $foundModel = File::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by user_id using scopeGetByUserId', function (): void {
        $foundModel = File::getByUserId($this->model->user_id)->first();

        expect($foundModel->user_id)->toBe($this->model->user_id);
    });

    test('can filter by path using scopeGetByPath', function (): void {
        $foundModel = File::getByPath($this->model->path)->first();

        expect($foundModel->path)->toBe($this->model->path);
    });

    test('can filter by mime_type using scopeGetByMimeType', function (): void {
        $foundModel = File::getByMimeType($this->model->mime_type)->first();

        expect($foundModel->mime_type)->toBe($this->model->mime_type);
    });

    test('can filter by size using scopeGetBySize', function (): void {
        $foundModel = File::getBySize($this->model->size)->first();

        expect($foundModel->size)->toBe($this->model->size);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function (): void {
        $foundModel = File::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function (): void {
        $foundModel = File::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
