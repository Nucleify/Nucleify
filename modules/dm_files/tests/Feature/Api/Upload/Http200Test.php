<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Http\UploadedFile;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
    test('upload file', function (): void {
        $file = UploadedFile::fake()->create('test.zip', 100, 'application/zip');

        $response = $this->post(route('files.upload'), [
            'file' => $file,
        ]);

        $response->assertOk();
    });
});
