<?php

namespace App\Http\Controllers;

use App\Http\Requests\Question\PostRequest;
use App\Http\Requests\Question\PutRequest;
use App\Models\Question;
use App\Services\QuestionService;
use Exception;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    private QuestionService $service;

    public function __construct(QuestionService $service)
    {
        $this->service = $service;
    }

    /**
     * Show the application dashboard.
     */
    public function render(): Renderable
    {
        return view('questions');
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

    public function getSiteQuestions(string $site): JsonResponse
    {
        try {
            $result = $this->service->getSiteQuestions($site);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getSiteQuestionsByLang(string $site, string $lang): JsonResponse
    {
        try {
            $result = $this->service->getSiteQuestionsByLang($site, $lang);

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
                'message' => 'Successfully created: ' . $result['content'] . ' question',
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
                'message' => 'Successfully updated: ' . $result['content'] . ' question',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        $result = Question::findOrFail($id);

        try {
            $this->service->delete($id);

            return response()->json([
                'deleted' => true,
                'message' => 'Successfully deleted: ' . $result->getContent() . ' question',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
