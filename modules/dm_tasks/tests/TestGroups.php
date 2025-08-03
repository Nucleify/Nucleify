<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main tests group
 */
uses()
    ->group('dm-tasks')
    ->in('.');

uses()
    ->group('dm-tasks-db')
    ->in('Database');

uses()
    ->group('dm-tasks-migrations')
    ->in('Database/Migrations');

uses()
    ->group('dm-tasks-ft')
    ->in('Feature');

uses()
    ->group('dm-tasks-controllers')
    ->in('Feature/Controllers');

uses()
    ->group('dm-tasks-api')
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
    ->group('task-api')
    ->in('Feature/Api/Task');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('global')
    ->in('Global');

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
