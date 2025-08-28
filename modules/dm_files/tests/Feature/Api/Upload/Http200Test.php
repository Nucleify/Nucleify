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
        $file = UploadedFile::fake()->create(uniqid('', true) . '_test.zip', 100, 'application/zip');

        $response = $this->post(route('files.upload'), [
            'file' => $file,
        ])
            ->assertOk();

        $filePath = $response->json('file_path');

        if ($filePath && file_exists($filePath)) {
            unlink($filePath);
        }
    });
});
