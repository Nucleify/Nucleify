<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Money;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = Money::factory()->create();
});

it('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(Money::class);
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

    test('can get sender', function (): void {
        expect($this->model->getSender())
            ->toBeString()
            ->toBe($this->model->sender);
    });

    test('can get receiver', function (): void {
        expect($this->model->getReceiver())
            ->toBeString()
            ->toBe($this->model->receiver);
    });

    test('can get count', function (): void {
        expect($this->model->getCount())
            ->toBeInt()
            ->toBe($this->model->count);
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
        $foundModel = Money::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by user_id using scopeGetByUserId', function (): void {
        $foundModel = Money::getByUserId($this->model->user_id)->first();

        expect($foundModel->user_id)->toBe($this->model->user_id);
    });

    test('can filter by sender using scopeGetBySender', function (): void {
        $foundModel = Money::getBySender($this->model->sender)->first();

        expect($foundModel->sender)->toBe($this->model->sender);
    });

    test('can filter by receiver using scopeGetByReceiver', function (): void {
        $foundModel = Money::getByReceiver($this->model->receiver)->first();

        expect($foundModel->receiver)->toBe($this->model->receiver);
    });

    test('can filter by count using scopeGetByCount', function (): void {
        $foundModel = Money::getByCount($this->model->count)->first();

        expect($foundModel->count)->toBe($this->model->count);
    });

    test('can filter by title using scopeGetByTitle', function (): void {
        $foundModel = Money::getByTitle($this->model->title)->first();

        expect($foundModel->title)->toBe($this->model->title);
    });

    test('can filter by description using scopeGetByDescription', function (): void {
        $foundModel = Money::getByDescription($this->model->description)->first();

        expect($foundModel->description)->toBe($this->model->description);
    });

    test('can filter by category using scopeGetByCategory', function (): void {
        $foundModel = Money::getByCategory($this->model->category)->first();

        expect($foundModel->category)->toBe($this->model->category);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function (): void {
        $foundModel = Money::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function (): void {
        $foundModel = Money::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
