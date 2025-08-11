<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('article-controller');

use App\Http\Controllers\ArticleController;
use App\Http\Requests\Article\PostRequest;
use App\Http\Requests\Article\PutRequest;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ArticleController::class, ['articleService' => app()->make(ArticleService::class)]);
});

describe('200', function (): void {
    test('index method', function (): void {
        Article::factory()->count(3)->create();

        $request = new Request;

        $response = $this->controller->index($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('countByCreatedLastWeek method', function (): void {
        $request = new Request;

        $response = $this->controller->countByCreatedLastWeek($request);

        expect($response->getStatusCode())->toEqual(200);
    });

    test('show method', function (): void {
        $article = Article::factory()->create();

        $response = $this->controller->show($article->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(articleData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('update method', function (): void {
        $article = Article::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(updatedArticleData);

        $response = $this->controller->update($request, $article->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('delete method', function (): void {
        $article = Article::factory()->create();

        $response = $this->controller->destroy($article->id);

        expect($response->getStatusCode())->toEqual(200);
        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    });
});
