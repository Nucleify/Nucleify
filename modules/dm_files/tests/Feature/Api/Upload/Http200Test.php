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

describe('200 > Authorized', function (): void {
    test('upload file', function (): void {
        $file = UploadedFile::fake()->create('test.zip', 100, 'application/zip');

        $response = $this->post(route('file.upload'), [
            'file' => $file,
        ]);

        $response->assertOk();
    });
});
