<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('nuc-pages')
    ->in('.');

uses()
    ->group('nuc-pages-ft')
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
