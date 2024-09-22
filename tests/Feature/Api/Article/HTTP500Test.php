<?php

use function Pest\Laravel\mock;

use App\Models\Article;
use App\Services\ArticleService;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(ArticleService::class);
});

describe('500 > Internal Server Error', function() {
    test('index api', function () {
        $this->service
            ->shouldReceive('getAll')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('articles.index'));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('show api', function () {
        $this->service
            ->shouldReceive('getById')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('articles.show', ['id' => 1]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('store api', function () {
        $this->service
            ->shouldReceive('create')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->postJson(route('articles.store'), articleData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('update api', function () {
        $this->service
            ->shouldReceive('update')
            ->with(1, Mockery::any())
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->putJson(route('articles.update', articleData['id']), updatedArticleData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('destroy api', function () {
        $article = Article::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->deleteJson(route('articles.destroy', ['id' => $article->id]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });
});
