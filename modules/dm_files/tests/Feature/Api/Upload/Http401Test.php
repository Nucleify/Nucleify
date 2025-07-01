<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Http\UploadedFile;

describe('401 > Unauthorized', function (): void {
    test('upload file', function () {
        $file = UploadedFile::fake()->create('test.zip', 100, 'application/zip');

        $this->postJson(route('file.upload'), [
            'file' => $file,
        ])
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    });
});
