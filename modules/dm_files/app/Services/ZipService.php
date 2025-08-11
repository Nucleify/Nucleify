<?php

namespace App\Services;

use ZanySoft\Zip\Facades\Zip;

class ZipService
{
    /**
     * @param string $filePath
     * @param string|null $extractPath
     *
     * @return string
     *
     * @throws Exception
     */
    public function extract(string $filePath, ?string $extractPath = null): string
    {
        $unzipDir = $extractPath ?? base_path('modules/dm_files/uploads/unzipped');

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
