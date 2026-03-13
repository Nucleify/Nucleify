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


$anyChangesMade = false;

foreach ($regex as $filePaths) {
    foreach ($filePaths as $filePath) {
        $contents = file_get_contents($filePath);

        if (strpos($contents, $guard) !== false) {
            continue;
        }

        $updatedContents = preg_replace(
            '/<\?php\s*/',
            "<?php $guard \n\n\n",
            $contents,
            1
        );

        file_put_contents($filePath, $updatedContents);
        echo "Updated: $filePath\n";

        $anyChangesMade = true;
    }
}

if (!$anyChangesMade) {
    echo "\n✅ It's all good, no changes were needed.\n\n";
}
