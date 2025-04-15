<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Article;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
    test('index api', function (): void {
        Article::factory(3)->create();

        $this->getJson(route('articles.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Article::factory(3)->create();

        $this->getJson(route('articles.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('articles.store'), articleData)
            ->assertOk();
    });

    test('show api', function (): void {
        $article = Article::factory()->create();

        $this->getJson(route('articles.show', $article->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $article = Article::factory()->create();

        $this->putJson(route('articles.update', $article->id), updatedArticleData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $article = Article::factory()->create();

        $this->deleteJson(route('articles.destroy', $article->id))
            ->assertOk();
        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    });
});
