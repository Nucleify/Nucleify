<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\User;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    private ContactService $service;

    public function __construct(ContactService $service)
    {
        $this->service = $service;
    }

    public function index(): JsonResponse
    {
        $result = $this->service->getAllContacts();

        return response()->json($result);
    }

    public function show($id): JsonResponse
    {
        $result = $this->service->getContactById($id);

        return response()->json($result);
    }

    public function store(ContactRequest $request): JsonResponse
    {
        $input = $request->validated();

        $result = $this->service->createContact($input);

        return response()->json($result);
    }

    public function update(ContactRequest $request, $id): JsonResponse
    {
        $input = $request->validated();

        $result = $this->service->updateContact($id, $input);

        return response()->json($result);
    }

    public function destroy($id): JsonResponse
    {
        $this->service->deleteContact($id);

        return response()->json(['deleted' => true]);
    }
}
