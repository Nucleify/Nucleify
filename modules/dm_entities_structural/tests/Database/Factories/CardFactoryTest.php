<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Card;

beforeEach(function (): void {
    $this->createUsers();
});

it('can create record', function (): void {
    $card = Card::factory()->create();

    $this->assertDatabaseCount('cards', 1);
    $this->assertDatabaseHas('cards', ['id' => $card->id]);
});

it('can create multiple records', function (): void {
    $cards = Card::factory()->count(3)->create();

    $this->assertDatabaseCount('cards', 3);
    foreach ($cards as $card) {
        $this->assertDatabaseHas('cards', ['id' => $card->id]);
    }
});

it("can't create record", function (): void {
    try {
        Card::factory()->create(['display' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it("can't create multiple records", function (): void {
    try {
        Card::factory()->count(2)->create(['display' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
