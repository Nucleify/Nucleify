<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;

use App\Services\ActivityLogService;


class ActivityLogController extends Controller
{
    private ActivityLogService $service;

    public function __construct(ActivityLogService $service)
    {
        $this->service = $service;
    }

    /**
     * Show the application dashboard.
     *
     * @return Renderable
     */
    public function render(): Renderable
    {
        return view('activity-log');
    }

    public function index(): JsonResponse
    {
        try {
            $result = $this->service->getAll();

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $result = $this->service->getById($id);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->service->delete($id);

            return response()->json([
                'deleted' => true,
                'message' => 'Activity log deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
