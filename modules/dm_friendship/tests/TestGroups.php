<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('dm-friendship')
    ->in('.');

uses()
    ->group('dm-friendship-db')
    ->in('Database');

uses()
    ->group('dm-friendship-ft')
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
    ->group('friendship-controller')
    ->in('Feature/Controllers');

uses()
    ->group('services')
    ->in('Feature/Services');

uses()
    ->group('friendship-service')
    ->in('Feature/Services');
