<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('question-model');

use App\Models\Question;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = Question::factory()->create();
});

test('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(Question::class);
});

describe('Instance', function (): void {
    test('can get id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get index', function (): void {
        expect($this->model->getIndex())
            ->toBeInt()
            ->toBe($this->model->index);
    });

    test('can get content', function (): void {
        expect($this->model->getContent())
            ->toBeString()
            ->toBe($this->model->content);
    });

    test('can get answer', function (): void {
        expect($this->model->getAnswer())
            ->toBeString()
            ->toBe($this->model->answer);
    });

    test('can get category', function (): void {
        expect($this->model->getCategory())
            ->toBeString()
            ->toBe($this->model->category);
    });

    test('can get on_site', function (): void {
        expect($this->model->getOnSite())
            ->toBeBool()
            ->toBe($this->model->on_site);
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
    test('can filter by id using scopeGetById', function (): void {
        $foundModel = Question::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by index using scopeGetByIndex', function (): void {
        $foundModel = Question::getByIndex($this->model->index)->first();

        expect($foundModel->index)->toBe($this->model->index);
    });

    test('can filter by content using scopeGetByContent', function (): void {
        $foundModel = Question::getByContent($this->model->content)->first();

        expect($foundModel->content)->toBe($this->model->content);
    });

    test('can filter by answer using scopeGetByAnswer', function (): void {
        $foundModel = Question::getByAnswer($this->model->answer)->first();

        expect($foundModel->answer)->toBe($this->model->answer);
    });

    test('can filter by category using scopeGetByCategory', function (): void {
        $foundModel = Question::getByCategory($this->model->category)->first();

        expect($foundModel->category)->toBe($this->model->category);
    });

    test('can filter by on_site using scopeGetByOnSite', function (): void {
        $foundModel = Question::getByOnSite($this->model->on_site)->first();

        expect($foundModel->on_site)->toEqual($this->model->on_site);
    });

    test('can filter by display using scopeGetByDisplay', function (): void {
        $foundModel = Question::getByDisplay($this->model->display)->first();

        expect($foundModel->display)->toEqual($this->model->display);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function (): void {
        $foundModel = Question::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function (): void {
        $foundModel = Question::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
