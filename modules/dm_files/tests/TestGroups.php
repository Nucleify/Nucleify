<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main test group
 */
uses()
    ->group('dm-files')
    ->in('.');

uses()
    ->group('dm-files-ft')
    ->in('Feature');

/**
 *  Feature test group
 */
uses()
    ->group('upload-api')
    ->in('Feature/Api/Upload');
