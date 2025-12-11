<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main test group
 */
uses()
    ->group('nuc-modules')
    ->in('.');

uses()
    ->group('nuc-modules-db')
    ->in('Database');

uses()
    ->group('nuc-modules-ft')
    ->in('Feature');

uses()
    ->group('nuc-modules-hooks')
    ->in('hooks');

/**
 *  Database groups
 */
uses()
    ->group('database')
    ->in('Database');

uses()
    ->group('models')
    ->in('Database/Models');

uses()
    ->group('migrations')
    ->in('Database/Migrations');

uses()
    ->group('factories')
    ->in('Database/Factories');

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('module-api')
    ->in('Feature/Api/Module');

uses()
    ->group('module-installer-api')
    ->in('Feature/Api/ModuleInstaller');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');
