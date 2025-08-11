<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\File;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        File::factory(3)->create();

        $this->getJson(route('files.index'))
            ->assertOk();
    });

    test('show api', function (): void {
        $model = File::factory()->create();

        $this->getJson(route('files.show', $model->id))
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = File::factory()->create();

        $this->deleteJson(route('files.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('files', ['id' => $model->id]);
    });
});
