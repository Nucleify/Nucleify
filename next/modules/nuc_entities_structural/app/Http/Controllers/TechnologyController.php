<?php

namespace App\Http\Controllers;

use App\Http\Requests\Technology\PostRequest;
use App\Http\Requests\Technology\PutRequest;
use App\Models\Technology;
use App\Services\TechnologyService;
use Exception;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TechnologyController extends Controller
{
    private TechnologyService $service;

    public function __construct(TechnologyService $service)
    {
        $this->service = $service;
    }

    /**
     * Show the application dashboard.
     */
    public function render(): Renderable
    {
        return view('technologies');
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

    public function getByCategory(string $category): JsonResponse
    {
        try {
            $result = $this->service->getByCategory($category);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getSiteTechnologies(string $site): JsonResponse
    {
        try {
            $result = $this->service->getSiteTechnologies($site);

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
                'message' => 'Successfully created: ' . $result['label'] . ' technology',
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
                'message' => 'Successfully updated: ' . $result['label'] . ' technology',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        $result = Technology::findOrFail($id);

        try {
            $this->service->delete($id);

            return response()->json([
                'deleted' => true,
                'message' => 'Successfully deleted: ' . $result->getLabel() . ' technology',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
