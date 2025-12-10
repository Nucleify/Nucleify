<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('nuc-entities')
    ->in('.');

uses()
    ->group('nuc-entities-db')
    ->in('Database');

uses()
    ->group('nuc-entities-ft')
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
    ->group('entity-models')
    ->in('Database/Models');

uses()
    ->group('migrations')
    ->in('Database/Migrations');

uses()
    ->group('entity-migrations')
    ->in('Database/Migrations');

uses()
    ->group('factories')
    ->in('Database/Factories');

uses()
    ->group('entity-factories')
    ->in('Database/Factories');

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('article-api')
    ->in('Feature/Api/Article');

uses()
    ->group('contact-api')
    ->in('Feature/Api/Contact');

uses()
    ->group('money-api')
    ->in('Feature/Api/Money');

uses()
    ->group('user-api')
    ->in('Feature/Api/User');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('entity-controllers')
    ->in('Feature/Controllers');
