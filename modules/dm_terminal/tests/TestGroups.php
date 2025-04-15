<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main tests group
 */
uses()
    ->group('dm-terminal')
    ->in('.');

uses()
    ->group('dm-terminal-ft')
    ->in('Feature');

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('artisan-api')
    ->in('Feature/Api/Artisan');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('commands')
    ->in('Feature/Commands');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');
