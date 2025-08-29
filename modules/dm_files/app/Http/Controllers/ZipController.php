<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnzipRequest;
use App\Services\UploadService;
use App\Services\ZipService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class ZipController extends Controller
{
    private UploadService $uploadService;

    private ZipService $zipService;

    public function __construct(UploadService $uploadService, ZipService $zipService)
    {
        $this->uploadService = $uploadService;
        $this->zipService = $zipService;
    }

    public function unzip(UnzipRequest $request): JsonResponse
    {
        try {
            $filePath = $this->uploadService->upload($request->file('file'));

            $unzipedPath = $this->zipService->unzip($filePath);

            return response()->json([
                'message' => 'Upload and unzip successful',
                'file_path' => $filePath,
                'unziped_path' => $unzipedPath,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
