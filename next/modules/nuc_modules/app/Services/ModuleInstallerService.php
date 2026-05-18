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
     * @param string|null $installPath
     * @param string|null $originalName
     *
     * @return Module|null
     *
     * @throws Exception
     */
    public function install(string $path, ?string $installPath = 'modules', ?string $originalName = null): ?Module
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

        $moduleName = $originalName ?? pathinfo($path, PATHINFO_FILENAME);

        $moduleData = [
            'name' => $moduleName,
            'description' => '',
            'category' => 'Custom',
            'version' => '1.0.0',
            'enabled' => false,
            'installed' => true,
        ];

        $existingModule = $this->model::where('name', $moduleData['name'])->first();

        if ($existingModule) {
            $existingModule->update($moduleData);
            $result = $existingModule->fresh();
        } else {
            $result = $this->model::create($moduleData);
        }

        return $result;
    }

    /**
     * @param string $name
     *
     * @return bool
     *
     * @throws Exception
     */
    public function uninstall(string $name): bool
    {
        $this->defineUserData();

        $module = $this->model::where('name', $name)->first();

        if (!$module) {
            throw new Exception('Module not found in database: ' . $name);
        }

        if (!$module->getInstalled()) {
            throw new Exception('Module is not installed: ' . $name);
        }

        $path = base_path('modules/' . $name);

        if (!is_dir($path)) {
            throw new Exception('Module directory not found: ' . $path);
        }

        try {

            $this->removeDirectory($path);

            $module->update([
                'installed' => false,
                'enabled' => false,
            ]);

            $this->logger->log($this->causer->name, $module->getName(), $this->entity, 'uninstalled');

            return true;
        } catch (Exception $e) {
            throw new Exception('Failed to uninstall module: ' . $e->getMessage());
        }
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

    /**
     * @param string $directory
     *
     * @return bool
     */
    private function removeDirectory(string $directory): bool
    {
        if (!is_dir($directory)) {
            return false;
        }

        foreach (array_diff(scandir($directory), ['.', '..']) as $file) {
            $path = $directory . '/' . $file;
            is_dir($path) ? $this->removeDirectory($path) : unlink($path);
        }

        return rmdir($directory);
    }
}
