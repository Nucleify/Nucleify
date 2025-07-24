<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\File;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
    test('index api', function (): void {
        File::factory(3)->create();

        $this->getJson(route('files.index'))
            ->assertOk();
    });

    test('show api', function (): void {
        $file = File::factory()->create();

        $this->getJson(route('files.show', $file->id))
            ->assertOk();
    });

    test('destroy api', function (): void {
        $file = File::factory()->create();

        $this->deleteJson(route('files.destroy', $file->id))
            ->assertOk();
        $this->assertDatabaseMissing('files', ['id' => $file->id]);
    });
});
