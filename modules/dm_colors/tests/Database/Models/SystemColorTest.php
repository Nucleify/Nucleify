<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-model');

use App\Models\SystemColor;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = SystemColor::factory()->create();
});

test('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(SystemColor::class);
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

    test('can get value', function (): void {
        expect($this->model->getValue())
            ->toBeString()
            ->toBe($this->model->value);
    });

    test('can get new', function (): void {
        expect($this->model->getNew())
            ->toBeBool()
            ->toBe($this->model->new);
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
        $foundModel = SystemColor::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by index using scopeGetByName', function (): void {
        $foundModel = SystemColor::getByName($this->model->name)->first();

        expect($foundModel->name)->toBe($this->model->name);
    });

    test('can filter by content using scopeGetByValue', function (): void {
        $foundModel = SystemColor::getByValue($this->model->value)->first();

        expect($foundModel->value)->toBe($this->model->value);
    });

    test('can filter by answer using scopeGetByNew', function (): void {
        $foundModel = SystemColor::getByNew($this->model->new)->first();

        expect($foundModel->new)->toEqual($this->model->new);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function (): void {
        $foundModel = SystemColor::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function (): void {
        $foundModel = SystemColor::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
