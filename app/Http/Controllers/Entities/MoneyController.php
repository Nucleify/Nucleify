<?php

namespace App\Http\Controllers\Entities;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Models\Money;
use App\Services\MoneyService;
use App\Http\Requests\Money\PostRequest;
use App\Http\Requests\Money\PutRequest;

class MoneyController extends Controller
{
    private MoneyService $service;

    public function __construct(MoneyService $service)
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
        return view('money');
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $result = $this->service->getAll($request);

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

    public function store(PostRequest $request): JsonResponse
    {
        try {
            $input = $request->validated();
            $result = $this->service->create($input);

            return response()->json([
                $result,
                'message' => 'Successfully created: ' . $result['title'] . ' transaction'
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
                'message' => 'Successfully updated: ' . $result['title'] . ' transaction'
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        $model = Money::findOrFail($id);

        try {
            $this->service->delete($id);
            return response()->json([
                'deleted' => true,
                'message' => 'Successfully deleted: '. $model->title . ' transaction'
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
