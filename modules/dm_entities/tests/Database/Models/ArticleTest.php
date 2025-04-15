<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Article;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = Article::factory()->create();
});

it('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(Article::class);
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
        $foundModel = Article::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by id using scopeGetByUserId', function (): void {
        $foundModel = Article::getByUserId($this->model->user_id)->first();

        expect($foundModel->user_id)->toBe($this->model->user_id);
    });

    test('can filter by title using scopeGetByTitle', function (): void {
        $foundModel = Article::getByTitle($this->model->title)->first();

        expect($foundModel->title)->toBe($this->model->title);
    });

    test('can filter by description using scopeGetByDescription', function (): void {
        $foundModel = Article::getByDescription($this->model->description)->first();

        expect($foundModel->description)->toBe($this->model->description);
    });

    test('can filter by category using scopeGetByCategory', function (): void {
        $foundModel = Article::getByCategory($this->model->category)->first();

        expect($foundModel->category)->toBe($this->model->category);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function (): void {
        $foundModel = Article::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function (): void {
        $foundModel = Article::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
