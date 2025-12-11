<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('card-model');

use App\Models\Card;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = Card::factory()->create();
});

test('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(Card::class);
});

describe('Instance', function (): void {
    test('can get id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get src', function (): void {
        expect($this->model->getSrc())
            ->toBeString()
            ->toBe($this->model->src);
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

    test('can get category', function (): void {
        expect($this->model->getCategory())
            ->toBeString()
            ->toBe($this->model->category);
    });

    test('can get component', function (): void {
        expect($this->model->getComponent())
            ->toBeString()
            ->toBe($this->model->component);
    });

    test('can get display', function (): void {
        expect($this->model->getDisplay())
            ->toBeBool()
            ->toBe($this->model->display);
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
    test('can filter by id using scopeGetId', function (): void {
        $foundModel = Card::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by src using scopeGetSrc', function (): void {
        $foundModel = Card::getBySrc($this->model->src)->first();

        expect($foundModel->src)->toBe($this->model->src);
    });

    test('can filter by title using scopeGetTitle', function (): void {
        $foundModel = Card::getByTitle($this->model->title)->first();

        expect($foundModel->title)->toBe($this->model->title);
    });

    test('can filter by description using scopeGetDescription', function (): void {
        $foundModel = Card::getByDescription($this->model->description)->first();

        expect($foundModel->description)->toBe($this->model->description);
    });

    test('can filter by category using scopeGetCategory', function (): void {
        $foundModel = Card::getByCategory($this->model->category)->first();

        expect($foundModel->category)->toBe($this->model->category);
    });

    test('can filter by component using scopeGetComponent', function (): void {
        $foundModel = Card::getByComponent($this->model->component)->first();

        expect($foundModel->component)->toBe($this->model->component);
    });

    test('can filter by display using scopeGetDisplay', function (): void {
        $foundModel = Card::getByDisplay($this->model->display)->first();

        expect($foundModel->display)->toEqual($this->model->display);
    });

    test('can filter by created_at using scopeGetCreatedAt', function (): void {
        $foundModel = Card::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetUpdatedAt', function (): void {
        $foundModel = Card::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
