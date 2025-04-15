<?php

use App\Models\Card;

beforeEach(function () {
    $this->createUsers();
    $this->model = Card::factory()->create();
});

it('can be created', function () {
    expect($this->model)->toBeInstanceOf(Card::class);
});

describe('Instance', function () {
    test('can get id', function () {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get src', function () {
        expect($this->model->getSrc())
            ->toBeString()
            ->toBe($this->model->src);
    });

    test('can get title', function () {
        $this->model = Card::factory()->create();

        expect($this->model->getTitle())
            ->toBeString()
            ->toBe($this->model->title);
    });

    test('can get description', function () {
        $this->model = Card::factory()->create();

        expect($this->model->getDescription())
            ->toBeString()
            ->toBe($this->model->description);
    });

    test('can get category', function () {
        expect($this->model->getCategory())
            ->toBeString()
            ->toBe($this->model->category);
    });

    test('can get component', function () {
        $this->model = Card::factory()->create();

        expect($this->model->getComponent())
            ->toBeString()
            ->toBe($this->model->component);
    });

    test('can get display', function () {
        $this->model = Card::factory()->create();

        expect($this->model->getDisplay())
            ->toBeBool()
            ->toBe($this->model->display);
    });

    test('can get created_at date', function () {
        $this->model = Card::factory()->create();

        expect($this->model->getCreatedAt())
            ->toBeString()
            ->toBe($this->model->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $this->model = Card::factory()->create();

        expect($this->model->getUpdatedAt())
            ->toBeString()
            ->toBe($this->model->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by id using scopeGetId', function () {
        $this->model = Card::factory()->create();

        $foundCard = Card::getById($this->model->id)->first();

        expect($foundCard->id)->toBe($this->model->id);
    });

    test('can filter by src using scopeGetSrc', function () {
        $this->model = Card::factory()->create();

        $foundCard = Card::getBySrc($this->model->src)->first();

        expect($foundCard->src)->toBe($this->model->src);
    });

    test('can filter by title using scopeGetTitle', function () {
        $this->model = Card::factory()->create();

        $foundCard = Card::getByTitle($this->model->title)->first();

        expect($foundCard->title)->toBe($this->model->title);
    });

    test('can filter by description using scopeGetDescription', function () {
        $this->model = Card::factory()->create();

        $foundCard = Card::getByDescription($this->model->description)->first();

        expect($foundCard->description)->toBe($this->model->description);
    });

    test('can filter by category using scopeGetCategory', function () {
        $this->model = Card::factory()->create();

        $foundCard = Card::getByCategory($this->model->category)->first();

        expect($foundCard->category)->toBe($this->model->category);
    });

    test('can filter by component using scopeGetComponent', function () {
        $this->model = Card::factory()->create();

        $foundCard = Card::getByComponent($this->model->component)->first();

        expect($foundCard->component)->toBe($this->model->component);
    });

    test('can filter by display using scopeGetDisplay', function () {
        $this->model = Card::factory()->create();

        $foundCard = Card::getByDisplay($this->model->display)->first();

        expect($foundCard->display)->toEqual($this->model->display);
    });

    test('can filter by created_at using scopeGetCreatedAt', function () {
        $this->model = Card::factory()->create();

        $foundCard = Card::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundCard->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetUpdatedAt', function () {
        $this->model = Card::factory()->create();

        $foundCard = Card::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundCard->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
