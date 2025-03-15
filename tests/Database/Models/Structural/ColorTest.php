<?php

use App\Models\Structural\Color;

beforeEach(function () {
    $this->createUsers();
    $this->model = Color::factory()->create();
});

it('can be created', function () {
    expect($this->model)->toBeInstanceOf(Color::class);
});

describe('Instance', function () {
    test('can get id', function () {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get user_id', function () {
        expect($this->model->getUserId())
            ->toBeInt()
            ->toBe($this->model->user_id);
    });

    test('can get entity', function () {
        expect($this->model->getEntity())
            ->toBeString()
            ->toBe($this->model->entity);
    });

    test('can get value', function () {
        expect($this->model->getValue())
            ->toBeString()
            ->toBe($this->model->value);
    });

    test('can get new', function () {
        expect($this->model->getNew())
            ->toBeBool()
            ->toBe($this->model->new);
    });

    test('can get created_at date', function () {
        expect($this->model->getCreatedAt())
            ->toBeString()
            ->toBe($this->model->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        expect($this->model->getUpdatedAt())
            ->toBeString()
            ->toBe($this->model->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by id using scopeGetById', function () {
        $foundModel = Color::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by user_id using scopeGetByUserId', function () {
        $foundModel = Color::getByUserId($this->model->user_id)->first();

        expect($foundModel->user_id)->toBe($this->model->user_id);
    });

    test('can filter by index using scopeGetByEntity', function () {
        $foundModel = Color::getByEntity($this->model->entity)->first();

        expect($foundModel->entity)->toBe($this->model->entity);
    });

    test('can filter by content using scopeGetByValue', function () {
        $foundModel = Color::getByValue($this->model->value)->first();

        expect($foundModel->value)->toBe($this->model->value);
    });

    test('can filter by answer using scopeGetByNew', function () {
        $foundModel = Color::getByNew($this->model->new)->first();

        expect($foundModel->new)->toEqual($this->model->new);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function () {
        $foundModel = Color::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function () {
        $foundModel = Color::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
