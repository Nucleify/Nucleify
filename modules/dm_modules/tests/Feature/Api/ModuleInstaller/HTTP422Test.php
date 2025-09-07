<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('module-installer-api-422');
uses()->group('api-422');

use Illuminate\Http\UploadedFile;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422', function (): void {
    test('file > empty', function (): void {
        $this->postJson(route('modules.install'), [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['file']);
    });

    test('file > invalid type', function (): void {
        $file = UploadedFile::fake()->create('test.txt', 100, 'text/plain');

        $this->postJson(route('modules.install'), [
            'file' => $file,
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['file']);
    });

    test('file > too large', function (): void {
        $file = UploadedFile::fake()->create('test.zip', 11000, 'application/zip');

        $this->postJson(route('modules.install'), [
            'file' => $file,
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['file']);
    });

    test('uninstall > name empty', function (): void {
        $this->postJson(route('modules.uninstall'), [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    });

    test('uninstall > name too long', function (): void {
        $this->postJson(route('modules.uninstall'), [
            'name' => str_repeat('a', 300),
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    });
});
