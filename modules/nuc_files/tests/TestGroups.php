<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main test groups
 */
uses()
    ->group('nuc-files')
    ->in('.');

uses()
    ->group('nuc-file-db')
    ->in('Database');

uses()
    ->group('nuc-file-ft')
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
    ->group('file-api')
    ->in('Feature/Api/File');

uses()
    ->group('upload-api')
    ->in('Feature/Api/Upload');

uses()
    ->group('unzip-api')
    ->in('Feature/Api/Unzip');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');
