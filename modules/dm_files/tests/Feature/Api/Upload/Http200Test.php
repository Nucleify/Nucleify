<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Http\UploadedFile;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('upload api', function (): void {
        $model = UploadedFile::fake()->create('test.zip', 100, 'application/zip');

        $this->post(route('files.upload'), [
            'file' => $model,
        ])
            ->assertOk();
    });
});
