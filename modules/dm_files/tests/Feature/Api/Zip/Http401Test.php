<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Http\UploadedFile;

describe('401 > Unauthorized', function (): void {
    test('extract zip file', function () {
        $file = UploadedFile::fake()->create('test.zip', 100, 'application/zip');

        $this->postJson(route('files.zip'), [
            'file' => $file,
        ])
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    });
});
