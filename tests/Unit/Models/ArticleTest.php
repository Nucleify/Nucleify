<?php

use App\Models\Article;

beforeEach(function () {
    $this->createUsers();
    $this->title = 'Title';
    $this->description = 'Description';
    $this->category = 'Category';
});

it('can be created', function () {
    $article = Article::factory()->create();

    expect($article)->toBeInstanceOf(Article::class);
});

describe('Instance', function () {
    test('can get the id', function () {
        $article = Article::factory()->create();

        expect($article->getId())->toBeInt()
            ->and($article->getId())->toBe($article->id);
    });

    test('can get the title', function () {
        $article = Article::factory()->create(['title' => $this->title]);

        expect($article->getTitle())->toBeString()
            ->and($article->getTitle())->toBe($this->title);
    });

    test('can get the description', function () {
        $article = Article::factory()->create(['description' => $this->description]);

        expect($article->getDescription())->toBeString()
            ->and($article->getDescription())->toBe($this->description);
    });

    test('can get the category', function () {
        $article = Article::factory()->create(['category' => $this->category]);

        expect($article->getCategory())->toBeString()
            ->and($article->getCategory())->toBe($this->category);
    });

    test('can get null for category if not set', function () {
        $article = Article::factory()->create(['category' => null]);

        expect($article->getCategory())->toBeNull();
    });

    test('can get the created_at date', function () {
        $article = Article::factory()->create();

        expect($article->getCreatedAt())->toBeString()
            ->and($article->getCreatedAt())->toBe($article->created_at->toDateTimeString());
    });

    test('can get the updated_at date', function () {
        $article = Article::factory()->create();

        expect($article->getUpdatedAt())->toBeString()
            ->and($article->getUpdatedAt())->toBe($article->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by id using scopeGetId', function () {
        $article = Article::factory()->create();

        $foundArticle = Article::getById($article->id)->first();

        expect($foundArticle)->not->toBeNull()
            ->and($foundArticle->id)->toBe($article->id);
    });

    test('can filter by title using scopeGetTitle', function () {
        Article::factory()->create(['title' => $this->title]);

        $foundArticle = Article::getByTitle($this->title)->first();

        expect($foundArticle)->not->toBeNull()
            ->and($foundArticle->title)->toBe($this->title);
    });

    test('can filter by description using scopeGetDescription', function () {
        Article::factory()->create(['description' => $this->description]);

        $foundArticle = Article::getByDescription($this->description)->first();

        expect($foundArticle)->not->toBeNull()
            ->and($foundArticle->description)->toBe($this->description);
    });

    test('can filter by category using scopeGetCategory', function () {
        Article::factory()->create(['category' => $this->category]);

        $foundArticle = Article::getByCategory($this->category)->first();

        expect($foundArticle)->not->toBeNull()
            ->and($foundArticle->category)->toBe($this->category);
    });

    test('can filter by created_at using scopeGetCreatedAt', function () {
        $article = Article::factory()->create();

        $foundArticle = Article::getByCreatedAt($article->created_at->toDateString())->first();

        expect($foundArticle)->not->toBeNull()
            ->and($foundArticle->created_at->toDateString())->toBe($article->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetUpdatedAt', function () {
        $article = Article::factory()->create();

        $foundArticle = Article::getByUpdatedAt($article->updated_at->toDateString())->first();

        expect($foundArticle)->not->toBeNull()
            ->and($foundArticle->updated_at->toDateString())->toBe($article->updated_at->toDateString());
    });
});
