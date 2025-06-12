<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\SystemColor;

beforeEach(function (): void {
    $this->createUsers();
});

it('can create record', function (): void {
    $color = SystemColor::factory()->create();

    $this->assertDatabaseCount('system_colors', 1);
    $this->assertDatabaseHas('system_colors', ['id' => $color->id]);
});

it('can create multiple records', function (): void {
    $colors = SystemColor::factory()->count(3)->create();

    $this->assertDatabaseCount('system_colors', 3);
    foreach ($colors as $color) {
        $this->assertDatabaseHas('system_colors', ['id' => $color->id]);
    }
});

it("can't create record", function (): void {
    try {
        SystemColor::factory(['id' => 'id'])->create();
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it("can't create multiple records", function (): void {
    try {
        SystemColor::factory(['id' => 'id'])->count(2)->create();
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
