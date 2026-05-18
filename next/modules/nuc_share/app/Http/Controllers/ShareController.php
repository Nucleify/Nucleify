<?php

namespace App\Http\Controllers;

use App\Services\ShareService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShareController extends Controller
{
    private ShareService $service;

    public function __construct(ShareService $service)
    {
        $this->service = $service;
    }

    /**
     * Create share request
     */
    public function create(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'entity_ids' => 'required|array',
                'entity_ids.*' => 'required|integer',
                'entity_type' => 'required|string',
                'user_ids' => 'required|array',
                'user_ids.*' => 'required|integer|exists:users,id',
            ]);

            $result = $this->service->createShareRequest(
                $validated['entity_ids'],
                $validated['entity_type'],
                $validated['user_ids']
            );

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get received share requests
     */
    public function received(): JsonResponse
    {
        try {
            $requests = $this->service->getReceivedRequests();

            return response()->json(['data' => $requests]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get sent share requests
     */
    public function sent(): JsonResponse
    {
        try {
            $requests = $this->service->getSentRequests();

            return response()->json(['data' => $requests]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get pending requests count
     */
    public function count(): JsonResponse
    {
        try {
            $count = $this->service->getPendingCount();

            return response()->json(['count' => $count]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Accept share request
     */
    public function accept(int $id): JsonResponse
    {
        try {
            $result = $this->service->acceptRequest($id);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Reject share request
     */
    public function reject(int $id): JsonResponse
    {
        try {
            $result = $this->service->rejectRequest($id);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Cancel sent share request
     */
    public function cancel(int $id): JsonResponse
    {
        try {
            $result = $this->service->cancelRequest($id);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
