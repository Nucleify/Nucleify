<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Module;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = Module::factory()->create();
});

test('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(Module::class);
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

    test('can get description', function (): void {
        expect($this->model->getDescription())
            ->toBeString()
            ->toBe($this->model->description);
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

    test('can get enabled', function (): void {
        expect($this->model->getEnabled())
            ->toBeBool()
            ->toBe($this->model->enabled);
    });

    test('can get installed', function (): void {
        expect($this->model->getInstalled())
            ->toBeBool()
            ->toBe($this->model->installed);
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
        $foundModel = Module::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by index using scopeGetByName', function (): void {
        $foundModel = Module::getByName($this->model->name)->first();

        expect($foundModel->name)->toBe($this->model->name);
    });

    test('can filter by content using scopeGetByDescription', function (): void {
        $foundModel = Module::getByDescription($this->model->description)->first();

        expect($foundModel->description)->toBe($this->model->description);
    });

    test('can filter by answer using scopeGetByCategory', function (): void {
        $foundModel = Module::getByCategory($this->model->category)->first();

        expect($foundModel->category)->toBe($this->model->category);
    });

    test('can filter by category using scopeGetByVersion', function (): void {
        $foundModel = Module::getByVersion($this->model->version)->first();

        expect($foundModel->version)->toBe($this->model->version);
    });

    test('can filter by on_site using scopeGetByEnabled', function (): void {
        $foundModel = Module::getByEnabled($this->model->enabled)->first();

        expect($foundModel->enabled)->toEqual($this->model->enabled);
    });

    test('can filter by on_site using scopeGetByInstalled', function (): void {
        $foundModel = Module::getByInstalled($this->model->installed)->first();

        expect($foundModel->installed)->toEqual($this->model->installed);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function (): void {
        $foundModel = Module::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function (): void {
        $foundModel = Module::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
