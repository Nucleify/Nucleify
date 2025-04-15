<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main tests group
 */
uses()
    ->group('dm-pages')
    ->in('.');

uses()
    ->group('dm-pages-ft')
    ->in('Feature');

/**
 *  Feature groups
 */
uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');
