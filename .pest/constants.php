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
$directory = new RecursiveDirectoryIterator('modules');
$iterator = new RecursiveIteratorIterator($directory);
$regex = new RegexIterator($iterator, '/^.+\/tests\/.+\.php$/i', RecursiveRegexIterator::GET_MATCH);
$guard = "\n\nif (!defined('PEST_RUNNING')) {\n    return;\n}\n\n";
