<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Money;

beforeEach(function (): void {
    $this->createUsers();
});

it('can create record', function (): void {
    $money = Money::factory()->create();

    $this->assertDatabaseCount('money', 1);
    $this->assertDatabaseHas('money', ['id' => $money->id]);
});

it('can create multiple records', function (): void {
    $moneys = Money::factory()->count(3)->create();

    $this->assertDatabaseCount('money', 3);
    foreach ($moneys as $money) {
        $this->assertDatabaseHas('money', ['id' => $money->id]);
    }
});

it('cant\'t create record', function (): void {
    try {
        Money::factory()->create(['count' => 'invalid_count']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it('cant\'t create multiple records', function (): void {
    try {
        Money::factory()->count(2)->create(['count' => 'invalid_count']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
