<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Http\UploadedFile;
use ZanySoft\Zip\Facades\Zip;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);

    Zip::shouldReceive('open')
        ->andReturnSelf();
    Zip::shouldReceive('extract')
        ->andReturn(true);
});

describe('200', function (): void {
    test('unzip api', function (): void {
        $model = UploadedFile::fake()->create('test.zip', 100, 'application/zip');

        $this->post(route('files.unzip'), [
            'file' => $model,
        ])
            ->assertOk();
    });
});
