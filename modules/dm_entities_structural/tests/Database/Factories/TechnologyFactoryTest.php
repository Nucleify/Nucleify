<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Technology;

beforeEach(function (): void {
    $this->createUsers();
});

it('can create record', function (): void {
    $technology = Technology::factory()->create();

    $this->assertDatabaseCount('technologies', 1);
    $this->assertDatabaseHas('technologies', ['id' => $technology->id]);
});

it('can create multiple records', function (): void {
    $technologies = Technology::factory()->count(3)->create();

    $this->assertDatabaseCount('technologies', 3);
    foreach ($technologies as $technology) {
        $this->assertDatabaseHas('technologies', ['id' => $technology->id]);
    }
});

it("can't create record", function (): void {
    try {
        Technology::factory()->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it("can't create multiple records", function (): void {
    try {
        Technology::factory()->count(2)->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
