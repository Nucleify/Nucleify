<?php

use App\Models\Question;

beforeEach(function () {
    $this->createUsers();
});

it('can be created', function () {
    $question = Question::factory()->create();

    expect($question)->toBeInstanceOf(Question::class);
});

describe('Instance', function () {
    test('can get id', function () {
        $question = Question::factory()->create();

        expect($question->getId())
            ->toBeInt()
            ->toBe($question->id);
    });

    test('can get index', function () {
        $question = Question::factory()->create();

        expect($question->getIndex())
            ->toBeInt()
            ->toBe($question->index);
    });

    test('can get content', function () {
        $question = Question::factory()->create();

        expect($question->getContent())
            ->toBeString()
            ->toBe($question->content);
    });

    test('can get answer', function () {
        $question = Question::factory()->create();

        expect($question->getAnswer())
            ->toBeString()
            ->toBe($question->answer);
    });

    test('can get category', function () {
        $question = Question::factory()->create();

        expect($question->getCategory())
            ->toBeString()
            ->toBe($question->category);
    });

    test('can get null for category if not set', function () {
        $question = Question::factory()->create(['category' => null]);

        expect($question->getCategory())->toBeNull();
    });

    test('can get on_site', function () {
        $question = Question::factory()->create();

        expect($question->getOnSite())
            ->toBeBool()
            ->toBe($question->on_site);
    });

    test('can get display', function () {
        $question = Question::factory()->create();

        expect($question->getDisplay())
            ->toBeBool()
            ->toBe($question->display);
    });

    test('can get created_at date', function () {
        $question = Question::factory()->create();

        expect($question->getCreatedAt())
            ->toBeString()
            ->toBe($question->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $question = Question::factory()->create();

        expect($question->getUpdatedAt())
            ->toBeString()
            ->toBe($question->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by id using scopeGetId', function () {
        $question = Question::factory()->create();

        $foundQuestion = Question::getById($question->id)->first();

        expect($foundQuestion->id)->toBe($question->id);
    });

    test('can filter by index using scopeGetIndex', function () {
        $question = Question::factory()->create();

        $foundQuestion = Question::getByIndex($question->index)->first();

        expect($foundQuestion->index)->toBe($question->index);
    });

    test('can filter by content using scopeGetContent', function () {
        $question = Question::factory()->create();

        $foundQuestion = Question::getByContent($question->content)->first();

        expect($foundQuestion->content)->toBe($question->content);
    });

    test('can filter by answer using scopeGetAnswer', function () {
        $question = Question::factory()->create();

        $foundQuestion = Question::getByAnswer($question->answer)->first();

        expect($foundQuestion->answer)->toBe($question->answer);
    });

    test('can filter by category using scopeGetCategory', function () {
        $question = Question::factory()->create();

        $foundQuestion = Question::getByCategory($question->category)->first();

        expect($foundQuestion->category)->toBe($question->category);
    });

    test('can filter by on_site using scopeGetOnSite', function () {
        $question = Question::factory()->create();

        $foundQuestion = Question::getByOnSite($question->on_site)->first();

        expect($foundQuestion->on_site)->toEqual($question->on_site);
    });

    test('can filter by display using scopeGetDisplay', function () {
        $question = Question::factory()->create();

        $foundQuestion = Question::getByDisplay($question->display)->first();

        expect($foundQuestion->display)->toEqual($question->display);
    });

    test('can filter by created_at using scopeGetCreatedAt', function () {
        $question = Question::factory()->create();

        $foundQuestion = Question::getByCreatedAt($question->created_at->toDateString())->first();

        expect($foundQuestion->created_at->toDateString())->toBe($question->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetUpdatedAt', function () {
        $question = Question::factory()->create();

        $foundQuestion = Question::getByUpdatedAt($question->updated_at->toDateString())->first();

        expect($foundQuestion->updated_at->toDateString())->toBe($question->updated_at->toDateString());
    });
});
