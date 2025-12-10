<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('nuc-colors')
    ->in('.');

uses()
    ->group('nuc-colors-db')
    ->in('Database');

uses()
    ->group('nuc-colors-ft')
    ->in('Feature');

/**
 *  Database groups
 */
uses()
    ->group('database')
    ->in('Database');

uses()
    ->group('color-models')
    ->in('Database/Models');

uses()
    ->group('models')
    ->in('Database/Models');

uses()
    ->group('color-migrations')
    ->in('Database/Migrations');

uses()
    ->group('migrations')
    ->in('Database/Migrations');

uses()
    ->group('color-factories')
    ->in('Database/Factories');

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
    ->group('color-api')
    ->in('Feature/Api');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('color-controllers')
    ->in('Feature/Controllers');
