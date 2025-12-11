<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadRequest;
use App\Services\UploadService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class UploadController extends Controller
{
    private UploadService $service;

    public function __construct(UploadService $service)
    {
        $this->service = $service;
    }

    public function upload(UploadRequest $request): JsonResponse
    {
        try {
            $filePath = $this->service->upload($request->file('file'));

            return response()->json([
                'message' => 'Upload successful',
                'file_path' => $filePath,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
