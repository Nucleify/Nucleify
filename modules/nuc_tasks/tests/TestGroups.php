<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('nuc-tasks')
    ->in('.');

uses()
    ->group('nuc-tasks-db')
    ->in('Database');

uses()
    ->group('nuc-tasks-migrations')
    ->in('Database/Migrations');

uses()
    ->group('nuc-tasks-ft')
    ->in('Feature');

uses()
    ->group('nuc-tasks-controllers')
    ->in('Feature/Controllers');

uses()
    ->group('nuc-tasks-api')
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
    ->group('task-model')
    ->in('Database/Models');

uses()
    ->group('migrations')
    ->in('Database/Migrations');

uses()
    ->group('task-migrations')
    ->in('Database/Migrations');

uses()
    ->group('factories')
    ->in('Database/Factories');

uses()
    ->group('task-factory')
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
    ->group('task-feature')
    ->in('Feature');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('task-controller')
    ->in('Feature/Controllers');
