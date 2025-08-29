<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('dm-documentation')
    ->in('.');

uses()
    ->group('dm-documentation-db')
    ->in('Database');

uses()
    ->group('dm-documentation-migrations')
    ->in('Database/Migrations');

uses()
    ->group('dm-documentation-ft')
    ->in('Feature');

uses()
    ->group('dm-documentation-controllers')
    ->in('Feature/Controllers');

uses()
    ->group('dm-documentation-api')
    ->in('Feature/Api');

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
    ->group('documentation-model')
    ->in('Database/Models');

uses()
    ->group('migrations')
    ->in('Database/Migrations');

uses()
    ->group('documentation-migrations')
    ->in('Database/Migrations');

uses()
    ->group('factories')
    ->in('Database/Factories');

uses()
    ->group('documentation-factory')
    ->in('Database/Factories');

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('documentation-api')
    ->in('Feature/Api/Documentation');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('documentation-feature')
    ->in('Feature');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('documentation-controller')
    ->in('Feature/Controllers');
