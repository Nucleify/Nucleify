<?php

use App\Models\Article;

beforeEach(function () {
    $this->createUsers();
});

it('can be created', function () {
    $article = Article::factory()->create();

    expect($article)->toBeInstanceOf(Article::class);
});

describe('Instance', function () {
    test('can get id', function () {
        $article = Article::factory()->create();

        expect($article->getId())
            ->toBeInt()
            ->toBe($article->id);
    });

    test('can get title', function () {
        $article = Article::factory()->create();

        expect($article->getTitle())
            ->toBeString()
            ->toBe($article->title);
    });

    test('can get description', function () {
        $article = Article::factory()->create();

        expect($article->getDescription())
            ->toBeString()
            ->toBe($article->description);
    });

    test('can get category', function () {
        $article = Article::factory()->create();

        expect($article->getCategory())
            ->toBeString()
            ->toBe($article->category);
    });

    test('can get null for category if not set', function () {
        $article = Article::factory()->create(['category' => null]);

        expect($article->getCategory())->toBeNull();
    });

    test('can get created_at date', function () {
        $article = Article::factory()->create();

        expect($article->getCreatedAt())
            ->toBeString()
            ->toBe($article->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $article = Article::factory()->create();

        expect($article->getUpdatedAt())
            ->toBeString()
            ->toBe($article->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by id using scopeGetId', function () {
        $article = Article::factory()->create();

        $foundArticle = Article::getById($article->id)->first();

        expect($foundArticle->id)->toBe($article->id);
    });

    test('can filter by title using scopeGetTitle', function () {
        $article = Article::factory()->create();

        $foundArticle = Article::getByTitle($article->title)->first();

        expect($foundArticle->title)->toBe($article->title);
    });

    test('can filter by description using scopeGetDescription', function () {
        $article = Article::factory()->create();

        $foundArticle = Article::getByDescription($article->description)->first();

        expect($foundArticle->description)->toBe($article->description);
    });

    test('can filter by category using scopeGetCategory', function () {
        $article = Article::factory()->create();

        $foundArticle = Article::getByCategory($article->category)->first();

        expect($foundArticle->category)->toBe($article->category);
    });

    test('can filter by created_at using scopeGetCreatedAt', function () {
        $article = Article::factory()->create();

        $foundArticle = Article::getByCreatedAt($article->created_at->toDateString())->first();

        expect($foundArticle->created_at->toDateString())->toBe($article->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetUpdatedAt', function () {
        $article = Article::factory()->create();

        $foundArticle = Article::getByUpdatedAt($article->updated_at->toDateString())->first();

        expect($foundArticle->updated_at->toDateString())->toBe($article->updated_at->toDateString());
    });
});
