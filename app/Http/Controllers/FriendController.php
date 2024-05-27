<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Exception;
use App\Services\FriendService;

class FriendController extends Controller
{
    private FriendService $service;

    public function __construct(FriendService $service)
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
