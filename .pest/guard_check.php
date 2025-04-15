<?php

/**
 * The early return using `if (!defined('PEST_RUNNING')) return;` is a guard 
 * to prevent this file from executing during Composer autoloading or regular 
 * Artisan commands. 
 *
 * Since Pest test setup files (using `uses(...)`) are executed immediately 
 * on load, and these files may reside in autoloaded directories (like modules/),
 * this guard ensures they are only evaluated when Pest is actually running.
 *
 * This is a workaround to allow test helpers/configs inside shared or autoloaded
 * folders without causing runtime errors when the application or CLI tools
 * are executed outside of the Pest test runner.
 * 
 * I've tried all possible solutions and this is the only reasonable solution I could find
 */
require_once __DIR__ . '/constants.php';


$guarded = [];
$unguarded = [];

foreach ($regex as $filePaths) {
    foreach ($filePaths as $filePath) {
        $contents = file_get_contents($filePath);

        if (strpos($contents, $guard) !== false) {
            $guarded[] = $filePath;
        } else {
            $unguarded[] = $filePath;
        }
    }
}

if (count($unguarded) === 0) {
    echo "\n✅ All test files are properly guarded with `PEST_RUNNING`.\n";
    echo "Total files checked: " . count($guarded) . "\n\n";
    exit(0);
} else {
    echo "\n❌ Some test files are missing the `PEST_RUNNING` guard:\n\n";
    foreach ($unguarded as $file) {
        echo "✗ $file\n";
    }
    echo "\n❌ Guard check failed. " . count($unguarded) . " file(s) missing the guard.\n\n";
    echo "💡 Tip: Add `$guard` to the top of those files.\n\n";
    exit(1);
}
