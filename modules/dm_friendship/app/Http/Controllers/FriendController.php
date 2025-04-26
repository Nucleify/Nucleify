<?php

namespace App\Http\Controllers;

use App\Services\FriendshipService;
use Exception;
use Illuminate\Http\JsonResponse;

class FriendController extends Controller
{
    private FriendshipService $service;

    public function __construct(FriendshipService $service)
    {
        $this->service = $service;
    }

    public function sendRequest($recipient): JsonResponse
    {
        try {
            $result = $this->service->sendRequest($recipient);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function acceptRequest($sender): JsonResponse
    {
        try {
            $result = $this->service->acceptRequest($sender);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function denyRequest($sender): JsonResponse
    {
        try {
            $result = $this->service->denyRequest($sender);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function removeFriend($friend): JsonResponse
    {
        try {
            $result = $this->service->removeFriend($friend);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function blockFriend($friend): JsonResponse
    {
        try {
            $result = $this->service->blockFriend($friend);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function unblockFriend($friend): JsonResponse
    {
        try {
            $result = $this->service->unblockFriend($friend);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
