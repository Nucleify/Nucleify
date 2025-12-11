<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('nuc-entities-structural')
    ->in('.');

uses()
    ->group('nuc-entities-structural-db')
    ->in('Database');

uses()
    ->group('nuc-entities-structural-ft')
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
    ->group('structural-model')
    ->in('Database/Models');

uses()
    ->group('migrations')
    ->in('Database/Migrations');

uses()
    ->group('structural-migrations')
    ->in('Database/Migrations');

uses()
    ->group('factories')
    ->in('Database/Factories');

uses()
    ->group('structural-factory')
    ->in('Database/Factories');

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('card-api')
    ->in('Feature/Api/Card');

uses()
    ->group('feature-api')
    ->in('Feature/Api/Feature');

uses()
    ->group('question-api')
    ->in('Feature/Api/Question');

uses()
    ->group('technology-api')
    ->in('Feature/Api/Technology');

uses()
    ->group('link-api')
    ->in('Feature/Api/Link');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('structural-feature')
    ->in('Feature');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('structural-controller')
    ->in('Feature/Controllers');
