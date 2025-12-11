<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Http\UploadedFile;

describe('401', function (): void {
    test('unzip api', function () {
        $model = UploadedFile::fake()->create('test.zip', 100, 'application/zip');

        $this->postJson(route('files.unzip'), [
            'file' => $model,
        ])
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    });
});
