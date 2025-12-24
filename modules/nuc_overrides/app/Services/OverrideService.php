<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

class OverrideService
{
    private const MODULES_PATH = 'modules';

    private const OVERRIDES_PATH = 'overrides/modules';

    /** @var array<string, string> */
    private array $overrideMap = [];

    private bool $mapBuilt = false;

    /**
     * Build a map of original file paths to override file paths
     *
     * @return void
     */
    public function buildOverrideMap(): void
    {
        if ($this->mapBuilt) {
            return;
        }

        $overridesPath = base_path(self::OVERRIDES_PATH);
        if (!File::exists($overridesPath)) {
            $this->mapBuilt = true;

            return;
        }

        $this->scanOverrideDirectory($overridesPath);
        $this->mapBuilt = true;
    }

    /**
     * Recursively scan override directory and build the map
     *
     * @param string $dir
     * @return void
     */
    private function scanOverrideDirectory(string $dir): void
    {
        if (!File::isDirectory($dir)) {
            return;
        }

        $overridesBasePath = realpath($dir);
        $modulesBasePath = realpath(base_path(self::MODULES_PATH));

        if (!$overridesBasePath || !$modulesBasePath) {
            return;
        }

        foreach (File::allFiles($dir) as $file) {
            $overridePath = $file->getRealPath();
            $relativePath = str_replace(
                $overridesBasePath . DIRECTORY_SEPARATOR,
                '',
                $overridePath
            );
            $originalPath = $modulesBasePath . DIRECTORY_SEPARATOR . $relativePath;

            $originalPath = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $originalPath);
            $overridePath = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $overridePath);

            if (File::exists($originalPath)) {
                $this->overrideMap[$originalPath] = $overridePath;
            }
        }
    }

    /**
     * Get override path for a given original file path, or null if no override exists
     *
     * @param string $originalPath
     * @return string|null
     */
    public function getOverridePath(string $originalPath): ?string
    {
        $this->buildOverrideMap();

        $normalizedPath = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, realpath($originalPath) ?: $originalPath);

        return $this->overrideMap[$normalizedPath] ?? null;
    }

    /**
     * Get the override map
     *
     * @return array<string, string>
     */
    public function getOverrideMap(): array
    {
        $this->buildOverrideMap();

        return $this->overrideMap;
    }
}
