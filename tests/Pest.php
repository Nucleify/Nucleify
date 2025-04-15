<?php

define('PEST_RUNNING', true);

require_once __DIR__ . '/TestExpectations.php';
require_once __DIR__ . '/TestFunctions.php';
require_once __DIR__ . '/TestGroups.php';
require_once __DIR__ . '/TestUses.php';

foreach (glob(__DIR__ . '/../modules/*/tests/Pest.php') as $pestFile) {
    require $pestFile;
}
