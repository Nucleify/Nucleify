<?php

use App\Models\Article;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function () {
    test('authorized store api', function () {
        $this->postJson(route('articles.store'), articleData)
            ->assertOk();
    });

    test('authorized index api', function () {
        Article::factory(3)->create();

        $this->getJson(route('articles.index'))
            ->assertOk();
    });

    test('authorized show api', function () {
        $article = Article::factory()->create();

        $this->getJson(route('articles.show', $article->id))
            ->assertOk();
    });

    test('authorized update api', function () {
        $article = Article::factory()->create();

        $this->putJson(route('articles.update', $article->id), updatedArticleData)
            ->assertOk();
    });

    test('authorized destroy api', function () {
        $article = Article::factory()->create();

        $this->deleteJson(route('articles.destroy', $article->id))
            ->assertOk();
        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    });
});
