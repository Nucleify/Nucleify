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
            $this->zipService->unzip($path, base_path('modules'));
        } catch (Exception $e) {
            throw new Exception('Failed to unzip ZIP file: ' . $e->getMessage());
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
        try {
            $zip = Zip::open($filePath);
            $files = $zip->listFiles();

            foreach ($files as $file) {
                $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                if ($extension === 'php' || $extension === 'ts') {
                    return true;
                }
            }

            return false;
        } catch (Exception $e) {
            throw new Exception('Failed to read ZIP file: ' . $e->getMessage());
        }
    }
}
