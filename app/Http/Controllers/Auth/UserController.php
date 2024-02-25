<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostUserRequest;
use App\Http\Requests\PutUserRequest;
use App\Services\UserService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private UserService $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
        $this->middleware(function($request, $next) {
            if(!Auth::user()->isAdmin()) {
                throw new AuthorizationException('Unauthorized', 403);
            }
            return $next($request);
        })->only('index', 'show', 'store', 'update', 'destroy');
    }

    public function index(): JsonResponse
    {
        $result = $this->service->getAllUsers();

        return response()->json($result);
    }

    public function show($id): JsonResponse
    {
        $result = $this->service->getUserById($id);

        return response()->json($result);
    }

    public function store(PostUserRequest $request): JsonResponse
    {
        $input = $request->validated();

        $result = $this->service->createUser($input);

        return response()->json($result);
    }

    public function update(PutUserRequest $request, $id): JsonResponse
    {
        $input = $request->validated();

        $result = $this->service->updateUser($id, $input);

        return response()->json($result);
    }

    public function destroy($id): JsonResponse
    {
        $this->service->deleteUser($id);

        return response()->json(['deleted' => true]);
    }

}
