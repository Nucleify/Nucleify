<?php

use App\Models\Article;

beforeEach(function () {
    $this->createUsers();
});

it('can be created', function () {
    $article = Article::factory()->create();

    expect($article)->toBeInstanceOf(Article::class);
});

