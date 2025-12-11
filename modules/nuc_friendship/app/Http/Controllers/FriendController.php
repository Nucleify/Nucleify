<?php

namespace App\Http\Controllers;

use App\Models\User;
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

    public function index(): JsonResponse
    {
        try {
            $result = $this->service->index();

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function sendRequest(User $recipient): JsonResponse
    {
        try {
            $result = $this->service->sendRequest($recipient);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function acceptRequest(User $sender): JsonResponse
    {
        try {
            $result = $this->service->acceptRequest($sender);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function denyRequest(User $sender): JsonResponse
    {
        try {
            $result = $this->service->denyRequest($sender);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function removeFriend(User $friend): JsonResponse
    {
        try {
            $result = $this->service->removeFriend($friend);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function blockFriend(User $friend): JsonResponse
    {
        try {
            $result = $this->service->blockFriend($friend);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function unblockFriend(User $friend): JsonResponse
    {
        try {
            $result = $this->service->unblockFriend($friend);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
