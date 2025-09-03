<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Http\UploadedFile;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422', function () {
    test('missing file', function () {
        $this->postJson(route('files.unzip'), [])
            ->assertStatus(422);
    });

    test('invalid file type', function () {
        $model = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $this->postJson(route('files.unzip'), [
            'file' => $model,
        ])
            ->assertStatus(422);
    });
});
