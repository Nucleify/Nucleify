<?php

if (!function_exists('require_override')) {
    /**
     * Require a file, using override if it exists
     *
     * @param string $filePath
     * @return void
     */
    function require_override(string $filePath): void
    {
        $overridePath = get_override_path($filePath);
        require $overridePath ?? $filePath;
    }
}

if (!function_exists('require_once_override')) {
    /**
     * Require a file once, using override if it exists
     *
     * @param string $filePath
     * @return void
     */
    function require_once_override(string $filePath): void
    {
        $overridePath = get_override_path($filePath);
        require_once $overridePath ?? $filePath;
    }
}

if (!function_exists('include_override')) {
    /**
     * Include a file, using override if it exists
     *
     * @param string $filePath
     * @return mixed
     */
    function include_override(string $filePath)
    {
        $overridePath = get_override_path($filePath);

        return include $overridePath ?? $filePath;
    }
}

if (!function_exists('include_once_override')) {
    /**
     * Include a file once, using override if it exists
     *
     * @param string $filePath
     * @return mixed
     */
    function include_once_override(string $filePath)
    {
        $overridePath = get_override_path($filePath);

        return include_once $overridePath ?? $filePath;
    }
}

if (!function_exists('get_override_path')) {
    /**
     * Get override path for a file, or null if no override exists
     *
     * @param string $filePath
     * @return string|null
     */
    function get_override_path(string $filePath): ?string
    {
        static $overrideService = null;

        if ($overrideService === null) {
            $overrideServiceClass = 'App\\Services\\OverrideService';
            if (class_exists($overrideServiceClass)) {
                $overrideService = new $overrideServiceClass;
            } else {
                return null;
            }
        }

        $realPath = realpath($filePath);

        if ($realPath === false) {
            return null;
        }

        return $overrideService->getOverridePath($realPath);
    }
}
