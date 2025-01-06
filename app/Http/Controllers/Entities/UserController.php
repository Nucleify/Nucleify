<?php

namespace App\Http\Controllers\Entities;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\JsonResponse;

use App\Models\User;
use App\Services\UserService;
use App\Http\Requests\User\PostRequest;
use App\Http\Requests\User\PutRequest;


class UserController extends Controller
{
    private UserService $service;

    /**
     * @param UserService $service
     */
    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $result = $this->service->index();

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        try {
            $result = $this->service->show($id);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param PostRequest $request
     *
     * @return JsonResponse
     */
    public function store(PostRequest $request): JsonResponse
    {
        try {
            $input = $request->validated();
            $result = $this->service->create($input);

            return response()->json([
                $result,
                'message' => 'Successfully created: '. $result['name']
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param PutRequest $request
     * @param $id
     *
     * @return JsonResponse
     */
    public function update(PutRequest $request, $id): JsonResponse
    {
        try {
            $input = $request->validated();
            $result = $this->service->update($id, $input);

            return response()->json([
                $result,
                'message' => 'Successfully updated: '. $result['name']
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        try {
            $model = User::findOrFail($id);
            $this->service->delete($id);

            return response()->json([
                'deleted' => true,
                'message' => 'Successfully deleted: '. $model->name
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
