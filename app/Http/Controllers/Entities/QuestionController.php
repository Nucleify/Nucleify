<?php

namespace App\Http\Controllers\Entities;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests\Question\PostRequest;
use App\Http\Requests\Question\PutRequest;
use App\Models\Question;
use App\Services\Entities\QuestionService;

class QuestionController extends Controller
{
    private QuestionService $service;

    /**
     * @param QuestionService $service
     */
    public function __construct(QuestionService $service)
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
        return view('questions');
    }

    /**
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $result = $this->service->index($request);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function countByCreatedLastWeek(Request $request): JsonResponse
    {
        try {
            $result = $this->service->countByCreatedLastWeek($request);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    /**
     * @param $category
     * 
     * @return JsonResponse
     */
    public function getByCategory(string $category): JsonResponse
    {
        try {
            $result = $this->service->getByCategory($category);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param $category
     * 
     * @return JsonResponse
     */
    public function getSiteQuestions(string $site): JsonResponse
    {
        try {
            $result = $this->service->getSiteQuestions($site);

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
                'message' => 'Successfully created: ' . $result['content']
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
                'message' => 'Successfully updated: ' . $result['content']
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
        $model = Question::findOrFail($id);

        try {
            $this->service->delete($id);
            return response()->json([
                'deleted' => true,
                'message' => 'Successfully deleted: ' . $model->content
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}