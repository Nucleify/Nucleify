<?php

namespace App\Services;

use App\Models\Module;
use App\Traits\Setters\UserSetterTrait;
use Exception;
use ZanySoft\Zip\Facades\Zip;

class ModuleInstallerService
{
    use UserSetterTrait;

    public function __construct(
        private readonly Module $model,
        protected string $entity = 'module',
        private readonly LoggerService $logger = new LoggerService,
        private readonly ZipService $zipService = new ZipService
    ) {}

    /**
     * @param string $path
     *
     * @return Module|null
     *
     * @throws Exception
     */
    public function install(string $path, ?string $installPath = 'modules'): ?Module
    {
        $this->defineUserData();

        if (!$this->hasExpectedFile($path)) {
            throw new Exception('ZIP file does not contain required .php or .ts files');
        }

        try {
            $this->zipService->extract($path, $installPath);
        } catch (Exception $e) {
            throw new Exception('Failed to extract ZIP file: ' . $e->getMessage());
        }

        $moduleData = [
            'name' => pathinfo($path, PATHINFO_FILENAME),
            'description' => '',
            'category' => 'Custom',
            'version' => '1.0.0',
            'enabled' => false,
            'installed' => true,
        ];

        $existingModule = $this->model::where('name', $moduleData['name'])->first();

        if ($existingModule) {
            $result = $existingModule->update($moduleData)->fresh();

            $action = 'updated';
        } else {
            $result = $this->model::create($moduleData);

            $action = 'installed';
        }

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, $action);

        return $result;
    }

    /**
     * @param string $filePath
     *
     * @return bool
     *
     * @throws Exception
     */
    public function hasExpectedFile(string $filePath): bool
    {
        $zip = Zip::open($filePath);
        $baseName = pathinfo($filePath, PATHINFO_FILENAME);

        return $zip->has("$baseName/$baseName.ts") || $zip->has("$baseName/$baseName.php");
    }
}
