<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Requests\PostContactRequest;
use App\Http\Requests\PutContactRequest;
use App\Services\ContactService;


class ContactController extends Controller
{
    private ContactService $service;

    public function __construct(ContactService $service)
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
        return view('contacts');
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

    public function store(PostContactRequest $request): JsonResponse
    {
        try {
            $input = $request->validated();
            $result = $this->service->create($input);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(PutContactRequest $request, $id): JsonResponse
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
                'message' => 'Contact deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
