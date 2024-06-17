<?php

use App\Models\Article;

beforeEach(function () {
    $this->createUsers();
});

it('creates record successfully', function () {
    $article = Article::factory()->create();

    $this->assertDatabaseCount('articles', 1);
    $this->assertDatabaseHas('articles', ['id' => $article->id]);
});

it('creates multiple records successfully', function () {
    $articles = Article::factory()->count(3)->create();

    $this->assertDatabaseCount('articles', 3);
    foreach ($articles as $article) {
        $this->assertDatabaseHas('articles', ['id' => $article->id]);
    }
});

it('creates wrong record unsuccessfully', function () {
    try {
        Article::factory()->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it('creates multiple wrong records unsuccessfully', function () {
    try {
        Article::factory()->count(2)->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
