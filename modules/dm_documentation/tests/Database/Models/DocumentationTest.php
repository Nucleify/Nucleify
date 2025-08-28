<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('documentation-model');

use App\Models\Documentation;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = Documentation::factory()->create();
});

test('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(Documentation::class);
});

describe('Instance', function (): void {
    test('can get id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get name', function (): void {
        expect($this->model->getName())
            ->toBeString()
            ->toBe($this->model->name);
    });

    test('can get category', function (): void {
        expect($this->model->getCategory())
            ->toBeString()
            ->toBe($this->model->category);
    });

    test('can get version', function (): void {
        expect($this->model->getVersion())
            ->toBeString()
            ->toBe($this->model->version);
    });

    test('can get file', function (): void {
        expect($this->model->getFile())
            ->toBeString()
            ->toBe($this->model->file);
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
    test('can filter documentation by id using scopeGetById', function (): void {
        $foundModel = Documentation::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter documentation by name using scopeGetByName', function (): void {
        $foundModel = Documentation::getByName($this->model->name)->first();

        expect($foundModel->name)->toBe($this->model->name);
    });

    test('can filter documentation by category using scopeGetByCategory', function (): void {
        $foundModel = Documentation::getByCategory($this->model->category)->first();

        expect($foundModel->category)->toBe($this->model->category);
    });

    test('can filter documentation by version using scopeGetByVersion', function (): void {
        $foundModel = Documentation::getByVersion($this->model->version)->first();

        expect($foundModel->version)->toBe($this->model->version);
    });

    test('can filter documentation by file using scopeGetByFile', function (): void {
        $foundModel = Documentation::getByFile($this->model->file)->first();

        expect($foundModel->file)->toBe($this->model->file);
    });
});
