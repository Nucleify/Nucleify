<?php

namespace App\Http\Controllers;

use App\Http\Requests\PageBuilderPagePostRequest;
use App\Http\Requests\PageBuilderPagePutRequest;
use App\Http\Requests\PageBuilderPublishRequest;
use App\Http\Requests\PageBuilderSaveDraftRequest;
use App\Models\PageBuilderPage;
use App\Models\PageBuilderUserPreference;
use App\Resources\PageBuilderPageResource;
use App\Resources\PageBuilderVersionResource;
use App\Services\PageBuilderPageService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageBuilderPageController extends Controller
{
    public function __construct(private readonly PageBuilderPageService $service) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $result = $this->service->index($request->user());

            return response()->json(PageBuilderPageResource::collection($result));
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, int $id): JsonResponse
    {
        try {
            $result = $this->service->show($request->user(), $id);

            return response()->json(new PageBuilderPageResource($result));
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(PageBuilderPagePostRequest $request): JsonResponse
    {
        try {
            $result = $this->service->create($request->user(), $request->validated());

            return response()->json([
                'page' => $result,
                'message' => 'Page created successfully.',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(PageBuilderPagePutRequest $request, int $id): JsonResponse
    {
        try {
            $result = $this->service->update($request->user(), $id, $request->validated());

            return response()->json([
                'page' => $result,
                'message' => 'Page updated successfully.',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            $page = PageBuilderPage::findOrFail($id);
            $this->service->delete($request->user(), $id);

            return response()->json([
                'deleted' => true,
                'message' => 'Successfully deleted page: ' . $page->getTitle(),
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function saveDraft(PageBuilderSaveDraftRequest $request, int $id): JsonResponse
    {
        try {
            $version = $this->service->saveDraft(
                $request->user(),
                $id,
                $request->validated()['layout_json']
            );

            return response()->json([
                'version' => $version,
                'message' => 'Draft saved successfully.',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function publish(PageBuilderPublishRequest $request, int $id): JsonResponse
    {
        try {
            $versionId = $request->validated()['version_id'] ?? null;
            $page = $this->service->publish($request->user(), $id, $versionId);

            return response()->json([
                'page' => $page,
                'message' => 'Page published successfully.',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function versions(Request $request, int $id): JsonResponse
    {
        try {
            $result = $this->service->versions($request->user(), $id);

            return response()->json(PageBuilderVersionResource::collection($result));
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function restore(Request $request, int $id, int $version): JsonResponse
    {
        try {
            $result = $this->service->restore($request->user(), $id, $version);

            return response()->json([
                'version' => $result,
                'message' => 'Version restored into a new draft.',
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getPreferences(Request $request): JsonResponse
    {
        try {
            $pref = PageBuilderUserPreference::firstOrCreate(
                ['user_id' => $request->user()->id],
                ['preferences' => ['autosave' => true]]
            );

            return response()->json($pref->preferences);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updatePreferences(Request $request): JsonResponse
    {
        try {
            $pref = PageBuilderUserPreference::updateOrCreate(
                ['user_id' => $request->user()->id],
                ['preferences' => $request->input('preferences', [])]
            );

            return response()->json($pref->preferences);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
