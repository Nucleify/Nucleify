<?php

define('PEST_RUNNING', true);

require_once __DIR__ . '/Groups.php';
require_once __DIR__ . '/Uses.php';

foreach (glob(__DIR__ . '/../modules/*/tests/Pest.php') as $pestFile) {
    require $pestFile;
}
