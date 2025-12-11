<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('nuc-terminal')
    ->in('.');

uses()
    ->group('nuc-terminal-ft')
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
    ->group('terminal-feature')
    ->in('Feature');

uses()
    ->group('commands')
    ->in('Feature/Commands');

uses()
    ->group('terminal-command')
    ->in('Feature/Commands');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('terminal-controller')
    ->in('Feature/Controllers');
