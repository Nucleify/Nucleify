<?php

namespace App\Http\Controllers;

use App\Services\PageBuilderPageService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;

class PageBuilderRenderController extends Controller
{
    public function __construct(private readonly PageBuilderPageService $service) {}

    public function render(string $slug): JsonResponse
    {
        try {
            return response()->json($this->service->renderBySlug($slug));
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Page not found.'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function prerenderRoutes(): JsonResponse
    {
        try {
            $locales = ['en', 'pl'];

            return response()->json([
                'routes' => $this->service->prerenderRoutes($locales),
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
