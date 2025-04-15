<?php

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
    ->group('artisan-api')
    ->in('Feature/Api/Utilities/Artisan');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('commands')
    ->in('Feature/Commands');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('services')
    ->in('Feature/Services');

uses()
    ->group('traits')
    ->in('Feature/Traits');

/**
 *  Global groups
 */
uses()
    ->group('global')
    ->in('Global');

/**
 *  Modules groups
 */
uses()
    ->group('modules')
    ->in('../modules');
