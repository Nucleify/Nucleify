<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstallRequest;
use App\Http\Requests\UninstallRequest;
use App\Services\ModuleInstallerService;
use Exception;
use Illuminate\Http\JsonResponse;

class ModuleInstallerController extends Controller
{
    private ModuleInstallerService $service;

    public function __construct(ModuleInstallerService $service)
    {
        $this->service = $service;
    }

    public function install(InstallRequest $request): JsonResponse
    {
        try {
            $file = $request->file('file');

            $tempPath = $file->getRealPath();
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

            $result = $this->service->install($tempPath, 'modules', $originalName);

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

    public function uninstall(UninstallRequest $request): JsonResponse
    {
        try {
            $name = $request->input('name');

            $result = $this->service->uninstall($name);

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'Module successfully uninstalled: ' . $name,
                    'name' => $name,
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to uninstall module: ' . $name,
                ], 422);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
