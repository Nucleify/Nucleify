<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('article-factory');

use App\Models\Article;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = Article::factory()->create();

    $this->assertDatabaseCount('articles', 1)
        ->assertDatabaseHas('articles', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Article::factory()->count(3)->create();

    $this->assertDatabaseCount('articles', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('articles', ['id' => $model->id]);
    }
});

test('cant\'t create record', function (): void {
    try {
        Article::factory()->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('cant\'t create multiple records', function (): void {
    try {
        Article::factory()->count(2)->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
