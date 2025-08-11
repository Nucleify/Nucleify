<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Module;

beforeEach(function (): void {
    $this->createUsers();
});

it('can create record', function (): void {
    $module = Module::factory()->create();

    $this->assertDatabaseCount('modules', 1);
    $this->assertDatabaseHas('modules', ['id' => $module->id]);
});

it('can create multiple records', function (): void {
    $modules = Module::factory()->count(3)->create();

    $this->assertDatabaseCount('modules', 3);
    foreach ($modules as $module) {
        $this->assertDatabaseHas('modules', ['id' => $module->id]);
    }
});

it("can't create record", function (): void {
    try {
        Module::factory()->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it("can't create multiple records", function (): void {
    try {
        Module::factory()->count(2)->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests
