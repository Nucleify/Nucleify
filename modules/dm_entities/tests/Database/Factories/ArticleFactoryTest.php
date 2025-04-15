<?php

use App\Models\Article;

beforeEach(function () {
    $this->createUsers();
});

it('can create record', function () {
    $article = Article::factory()->create();

    $this->assertDatabaseCount('articles', 1);
    $this->assertDatabaseHas('articles', ['id' => $article->id]);
});

it('can create multiple records', function () {
    $articles = Article::factory()->count(3)->create();

    $this->assertDatabaseCount('articles', 3);
    foreach ($articles as $article) {
        $this->assertDatabaseHas('articles', ['id' => $article->id]);
    }
});

it('cant\'t create record', function () {
    try {
        Article::factory()->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it('cant\'t create multiple records', function () {
    try {
        Article::factory()->count(2)->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
