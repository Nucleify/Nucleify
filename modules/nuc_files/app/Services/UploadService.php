<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

class UploadService
{
    /**
     * @param UploadedFile $file
     *
     * @return string
     *
     * @throws Exception
     */
    public function upload(UploadedFile $file): string
    {
        $uploadDir = base_path('modules/nuc_files/uploads');

        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $filename = $file->getClientOriginalName();
        $filePath = $uploadDir . '/' . $filename;

        $file->move($uploadDir, $filename);

        return $filePath;
    }

    public function edit(string $oldFullPath, string $newFullPath): void
    {
        if (!File::exists($oldFullPath)) {
            throw new \Exception('Old file path does not exist: ' . $oldFullPath);
        }

        if (File::exists($newFullPath)) {
            throw new \Exception('A file with the new name already exists: ' . $newFullPath);
        }

        File::move($oldFullPath, $newFullPath);
    }
}
