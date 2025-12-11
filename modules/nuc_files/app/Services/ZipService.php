<?php

namespace App\Services;

use ZanySoft\Zip\Facades\Zip;

class ZipService
{
    /**
     * @param string $filePath
     * @param string|null $unzipPath
     *
     * @return string
     *
     * @throws Exception
     */
    public function unzip(string $filePath, ?string $unzipPath = null): string
    {
        $unzipDir = $unzipPath ?? base_path('modules/nuc_files/uploads/unzipped');

        if (!file_exists($unzipDir)) {
            mkdir($unzipDir, 0777, true);
        }

        $filename = basename($filePath);
        $baseName = pathinfo($filename, PATHINFO_FILENAME);

        Zip::open($filePath)->extract($unzipDir);

        return $unzipDir;
    }
}
