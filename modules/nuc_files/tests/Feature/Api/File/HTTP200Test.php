<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\File;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        File::factory(3)->create();

        $this->getJson(route('files.index'))
            ->assertOk();
    });

    test('show api', function (): void {
        $model = File::factory()->create();

        $this->getJson(route('files.show', $model->id))
            ->assertOk();
    });

    test('edit api', function (): void {
        $model = File::factory()->create();
        $uploadsDir = base_path('modules/nuc_files/uploads');
        $oldPath = $uploadsDir . '/' . ($filename = basename($model->path) ?: 'testfile.txt');

        if (!is_dir($uploadsDir)) {
            mkdir($uploadsDir, 0777, true);
        }

        file_put_contents($oldPath, 'content');

        $model->update(['path' => $oldPath]);

        $newFilename = 'updated_' . $filename;
        $newPath = $uploadsDir . '/' . $newFilename;

        $this->putJson(route('files.edit', $model->id), ['path' => $newFilename])->assertOk();

        $this->assertFileDoesNotExist($oldPath);
        $this->assertFileExists($newPath);
        $this->assertDatabaseHas('files', ['id' => $model->id, 'path' => $newPath]);

        unlink($newPath);
    });

    test('destroy api', function (): void {
        $model = File::factory()->create();

        $this->deleteJson(route('files.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('files', ['id' => $model->id]);
    });
});
