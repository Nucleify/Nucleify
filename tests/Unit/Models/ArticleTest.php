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
    test('can get the id', function () {
        $article = Article::factory()->create();

        expect($article->getId())->toBeInt()
            ->and($article->getId())->toBe($article->id);
    });

    test('can get the title', function () {
        $article = Article::factory()->create(['title' => 'Title']);

        expect($article->getTitle())->toBeString()
            ->and($article->getTitle())->toBe('Title');
    });

    test('can get the description', function () {
        $article = Article::factory()->create(['description' => 'Description']);

        expect($article->getDescription())->toBeString()
            ->and($article->getDescription())->toBe('Description');
    });

    test('can get the category', function () {
        $article = Article::factory()->create(['category' => 'Category']);

        expect($article->getCategory())->toBeString()
            ->and($article->getCategory())->toBe('Category');
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
        $title = 'Title';
        Article::factory()->create(['title' => $title]);

        $foundArticle = Article::getByTitle($title)->first();

        expect($foundArticle)->not->toBeNull()
            ->and($foundArticle->title)->toBe($title);
    });

    test('can filter by description using scopeGetDescription', function () {
        $description = 'Description';
        Article::factory()->create(['description' => $description]);

        $foundArticle = Article::getByDescription($description)->first();

        expect($foundArticle)->not->toBeNull()
            ->and($foundArticle->description)->toBe($description);
    });

    test('can filter by category using scopeGetCategory', function () {
        $category = 'Technology';
        Article::factory()->create(['category' => $category]);

        $foundArticle = Article::getByCategory($category)->first();

        expect($foundArticle)->not->toBeNull()
            ->and($foundArticle->category)->toBe($category);
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
