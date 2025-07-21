<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\File;

beforeEach(function (): void {
    $this->createUsers();
});

it('can create record', function (): void {
    $file = File::factory()->create();

    $this->assertDatabaseCount('files', 1);
    $this->assertDatabaseHas('files', ['id' => $file->id]);
});

it('can create multiple records', function (): void {
    $files = File::factory()->count(3)->create();

    $this->assertDatabaseCount('files', 3);
    foreach ($files as $file) {
        $this->assertDatabaseHas('files', ['id' => $file->id]);
    }
});

it("can't create record", function (): void {
    try {
        File::factory()->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }
    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable');

it("can't create multiple records", function (): void {
    try {
        File::factory()->count(2)->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }
    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable');
