<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('article-api-200');
uses()->group('api-200');

use App\Models\Article;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
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
        $model = Article::factory()->create();

        $this->getJson(route('articles.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = Article::factory()->create();

        $this->putJson(route('articles.update', $model->id), updatedArticleData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = Article::factory()->create();

        $this->deleteJson(route('articles.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('articles', ['id' => $model->id]);
    });
});
