<?php

namespace App\Services;

use ZanySoft\Zip\Facades\Zip;

class ZipService
{
    public function extract(string $filePath): string
    {
        $unzipDir = base_path('modules/dm_files/storage/uploads/unzipped');

        if (!file_exists($unzipDir)) {
            mkdir($unzipDir, 0777, true);
        }

        $filename = basename($filePath);
        $baseName = pathinfo($filename, PATHINFO_FILENAME);
        $extractTo = $unzipDir . '/' . $baseName;

        if (!file_exists($extractTo)) {
            mkdir($extractTo, 0777, true);
        }

        Zip::open($filePath)->extract($extractTo);

        return $extractTo;
    }
}
