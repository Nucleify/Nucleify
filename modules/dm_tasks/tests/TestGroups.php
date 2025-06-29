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

/**
 *  Database groups
 */
uses()
    ->group('migrations')
    ->in('Database/Migrations');

uses()
    ->group('models')
    ->in('Database/Models');

uses()
    ->group('factories')
    ->in('Database/Factories');
