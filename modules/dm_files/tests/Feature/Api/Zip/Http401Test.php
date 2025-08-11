<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Http\UploadedFile;

describe('401', function (): void {
    test('extract zip api', function () {
        $model = UploadedFile::fake()->create('test.zip', 100, 'application/zip');

        $this->postJson(route('files.zip'), [
            'file' => $model,
        ])
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    });
});
