<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main tests group
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

/**
 *  Feature groups
 */
uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('services')
    ->in('Feature/Services');
