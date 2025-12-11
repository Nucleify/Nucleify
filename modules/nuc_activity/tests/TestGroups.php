<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main tests group
 */
uses()
    ->group('nuc-activity')
    ->in('.');

uses()
    ->group('nuc-activity-db')
    ->in('Database');

uses()
    ->group('nuc-activity-ft')
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
    ->group('activity-model')
    ->in('Database/Models');

uses()
    ->group('migrations')
    ->in('Database/Migrations');

uses()
    ->group('activity-migrations')
    ->in('Database/Migrations');

uses()
    ->group('factories')
    ->in('Database/Factories');

uses()
    ->group('activity-factory')
    ->in('Database/Factories');

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('activity-api')
    ->in('Feature/Api/Activity');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('activity-feature')
    ->in('Feature');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('activity-controller')
    ->in('Feature/Controllers');

uses()
    ->group('services')
    ->in('Feature/Services');

uses()
    ->group('activity-service')
    ->in('Feature/Services');
