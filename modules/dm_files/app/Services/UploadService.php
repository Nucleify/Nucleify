<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;

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
        $uploadDir = base_path('modules/dm_files/uploads');

        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $filename = $file->getClientOriginalName();
        $filePath = $uploadDir . '/' . $filename;

        $file->move($uploadDir, $filename);

        return $filePath;
    }
}
