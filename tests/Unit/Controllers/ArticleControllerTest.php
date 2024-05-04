<?php

use App\Http\Controllers\Entities\ArticleController;
use App\Http\Requests\Article\PostRequest;
use App\Http\Requests\Article\PutRequest;
use App\Models\Article;
use App\Services\ArticleService;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ArticleController::class, ['articleService' => app()->make(ArticleService::class)]);
});

it('runs index method successfully', function () {
    $response = $this->controller->index();

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs show method successfully', function () {
    $article = Article::factory()->create();

    $response = $this->controller->show($article->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs store method successfully', function () {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(articleData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs update method successfully', function () {
    $article = Article::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedArticleData);

    $response = $this->controller->update($request, $article->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs delete method successfully', function () {
    $article = Article::factory()->create();

    $response = $this->controller->destroy($article->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('articles', ['id' => $article->id]);
});
