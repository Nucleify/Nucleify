<?php

namespace App\Http\Controllers;

use App\Http\Requests\ZipRequest;
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

    public function extract(ZipRequest $request): JsonResponse
    {
        try {
            $filePath = $this->uploadService->upload($request->file('file'));

            $extractedPath = $this->zipService->extract($filePath);

            return response()->json([
                'message' => 'Upload and extract successful',
                'file_path' => $filePath,
                'extracted_path' => $extractedPath,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
