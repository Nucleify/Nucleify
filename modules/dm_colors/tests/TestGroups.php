<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main tests group
 */
uses()
    ->group('dm-colors')
    ->in('.');

uses()
    ->group('dm-colors-db')
    ->in('Database');

uses()
    ->group('dm-colors-ft')
    ->in('Feature');

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
    ->group('controllers')
    ->in('Feature/Controllers');
