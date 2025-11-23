<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('dm-database')
    ->in('.');

uses()
    ->group('dm-database-ft')
    ->in('Feature');

/**
 *  Feature groups
 */
uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('services')
    ->in('Feature/Services');

uses()
    ->group('database-service')
    ->in('Feature/Services');
