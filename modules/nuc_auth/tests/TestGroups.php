<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main tests group
 */
uses()
    ->group('nuc-auth')
    ->in('.');

uses()
    ->group('nuc-auth-db')
    ->in('Database');

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
    ->group('auth-migrations')
    ->in('Database/Migrations');
