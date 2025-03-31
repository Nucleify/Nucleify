<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\JsonResponse;

use App\Services\Utilities\FriendshipService;

class FriendController extends Controller
{
    private FriendshipService $service;

    /**
     * @param FriendshipService $service
     */
    public function __construct(FriendshipService $service)
    {
        $this->service = $service;
    }

    /**
     * @param $recipient
     *
     * @return JsonResponse
     */
    public function sendRequest($recipient): JsonResponse
    {
        try {
            $result = $this->service->sendRequest($recipient);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param $sender
     *
     * @return JsonResponse
     */
    public function acceptRequest($sender): JsonResponse
    {
        try {
            $result = $this->service->acceptRequest($sender);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param $sender
     *
     * @return JsonResponse
     */
    public function denyRequest($sender): JsonResponse
    {
        try {
            $result = $this->service->denyRequest($sender);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param $friend
     *
     * @return JsonResponse
     */
    public function removeFriend($friend): JsonResponse
    {
        try {
            $result = $this->service->removeFriend($friend);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param $friend
     *
     * @return JsonResponse
     */
    public function blockFriend($friend): JsonResponse
    {
        try {
            $result = $this->service->blockFriend($friend);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param $friend
     *
     * @return JsonResponse
     */
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
