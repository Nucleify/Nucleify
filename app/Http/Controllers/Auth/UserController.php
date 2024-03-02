<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\PostUserRequest;
use App\Http\Requests\PutUserRequest;
use App\Services\UserService;


class UserController extends Controller
{
    private UserService $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
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

    public function store(PostUserRequest $request): JsonResponse
    {
        try {
            $input = $request->validated();

            $result = $this->service->create($input);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(PutUserRequest $request, $id): JsonResponse
    {
        try {
            $input = $request->validated();

            $result = $this->service->update($id, $input);

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
                'message' => 'User deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
