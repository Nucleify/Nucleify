<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('nuc-friendship')
    ->in('.');

uses()
    ->group('nuc-friendship-db')
    ->in('Database');

uses()
    ->group('nuc-friendship-ft')
    ->in('Feature');

/**
 *  Database groups
 */
uses()
    ->group('database')
    ->in('Database');

uses()
    ->group('migrations')
    ->in('Database/Migrations');

uses()
    ->group('friendship-migrations')
    ->in('Database/Migrations');

uses()
    ->group('seeders')
    ->in('Database/Seeders');

uses()
    ->group('friendship-seeder')
    ->in('Database/Seeders');

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('friendship-controllers')
    ->in('Feature/Controllers');

uses()
    ->group('services')
    ->in('Feature/Services');

uses()
    ->group('friendship-services')
    ->in('Feature/Services');
