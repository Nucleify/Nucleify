<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use ZanySoft\Zip\Facades\Zip;

class UploadService
{
    public function upload(UploadedFile $file): void
    {
        $zipDir = base_path('modules/dm_files/storage/uploads/zip');
        $unzipDir = base_path('modules/dm_files/storage/uploads/unzipped');

        $filename = $file->getClientOriginalName();
        $baseName = pathinfo($filename, PATHINFO_FILENAME);
        $fullZipPath = $zipDir . '/' . $filename;

        foreach ([$zipDir, $unzipDir, $unzipDir . '/' . $baseName] as $dir) {
            if (!file_exists($dir)) {
                mkdir($dir, 0777, true);
            }
        }

        $file->move($zipDir, $filename);

        Zip::open($fullZipPath)->extract($unzipDir . '/' . $baseName);
    }
}
