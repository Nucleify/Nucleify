<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditRequest;
use App\Models\File;
use App\Services\FileService;
use Exception;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FileController extends Controller
{
    private FileService $service;

    public function __construct(FileService $service)
    {
        $this->service = $service;
    }

    /**
     * Show the application dashboard.
     */
    public function render(): Renderable
    {
        return view('files');
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $result = $this->service->index($request);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $result = $this->service->show($id);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function edit(EditRequest $request, $id): JsonResponse
    {
        try {
            $input = $request->validated();
            $result = $this->service->edit($id, $input['path']);

            return response()->json([
                $result,
                'message' => 'Successfully updated file name: ' . $result->getPath(),
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        $result = File::findOrFail($id);

        try {
            $this->service->delete($id);

            return response()->json([
                'deleted' => true,
                'message' => 'Successfully deleted: ' . $result->getId() . 'file',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
