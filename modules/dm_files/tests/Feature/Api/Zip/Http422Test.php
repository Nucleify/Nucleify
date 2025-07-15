<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Http\UploadedFile;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content', function () {
    test('missing file', function () {
        $this->postJson(route('files.zip'), [])
            ->assertStatus(422);
    });

    test('invalid file type', function () {
        $file = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->postJson(route('files.zip'), [
            'file' => $file,
        ]);

        $response->assertStatus(422);
    });
});
