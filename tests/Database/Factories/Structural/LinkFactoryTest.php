<?php

use App\Models\Structural\Link;

it('can create record', function () {
    $link = Link::factory()->create();
    $this->assertDatabaseCount('links', 1);
    $this->assertDatabaseHas('links', ['id' => $link->id]);
});

it('can create multiple records', function () {
    $links = Link::factory()->count(3)->create();
    $this->assertDatabaseCount('links', 3);
    foreach ($links as $link) {
        $this->assertDatabaseHas('links', ['id' => $link->id]);
    }
});

it('can\'t create record', function () {
    try {
        Link::factory()->create(['category' => null]);
    } catch (Exception $e) {
        $this->assertNotEmpty($e->getMessage());
        return;
    }
    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it('can\'t create multiple records', function () {
    try {
        Link::factory()->count(2)->create(['category' => null]);
    } catch (Exception $e) {
        $this->assertNotEmpty($e->getMessage());
        return;
    }
    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
