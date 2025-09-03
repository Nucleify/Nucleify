<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstallRequest;
use App\Services\ModuleInstallerService;
use Exception;
use Illuminate\Http\JsonResponse;

class ModuleInstallerController extends Controller
{
    private ModuleInstallerService $service;

    private string $pathGetInstalledModules = __DIR__ . '/../../../hooks/getInstalledModules.php';

    public function __construct(ModuleInstallerService $service)
    {
        $this->service = $service;
    }

    public function getInstalledModules(): JsonResponse
    {
        if (!file_exists($this->pathGetInstalledModules)) {
            return response()->json(['modules' => []], 200);
        }

        try {
            $modules = require $this->pathGetInstalledModules;

            return response()->json(['modules' => $modules], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to load installed modules: ' . $e->getMessage()], 500);
        }
    }

    public function install(InstallRequest $request): JsonResponse
    {
        try {
            $file = $request->file('file');

            $tempPath = $file->getRealPath();

            $result = $this->service->install($tempPath);

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'Module successfully installed: ' . $result->getName(),
                    'module' => $result,
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'ZIP file does not contain required .php or .ts files',
                ], 422);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
