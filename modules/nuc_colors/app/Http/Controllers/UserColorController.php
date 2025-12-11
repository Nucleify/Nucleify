<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserColor\PostRequest;
use App\Http\Requests\UserColor\PutRequest;
use App\Models\UserColor;
use App\Services\UserColorService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserColorController extends Controller
{
    private UserColorService $service;

    public function __construct(UserColorService $service)
    {
        $this->service = $service;
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

    public function countByCreatedLastWeek(Request $request): JsonResponse
    {
        try {
            $result = $this->service->countByCreatedLastWeek($request);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getByName(string $name): JsonResponse
    {
        try {
            $result = $this->service->getByName($name);

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

    public function store(PostRequest $request): JsonResponse
    {
        try {
            $input = $request->validated();
            $result = $this->service->create($input);

            return response()->json([
                $result,
                'message' => 'Successfully created: ' . $result['name'] . ' user color',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(PutRequest $request, $id): JsonResponse
    {
        try {
            $input = $request->validated();
            $result = $this->service->update($id, $input);

            return response()->json([
                $result,
                'message' => 'Successfully updated: ' . $result['name'] . ' user color',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        $result = UserColor::findOrFail($id);

        try {
            $this->service->delete($id);

            return response()->json([
                'deleted' => true,
                'message' => 'Successfully deleted: ' . $result->getName() . ' user color',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
