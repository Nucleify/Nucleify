<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main tests group
 */
uses()
    ->group('dm-entities-structural')
    ->in('.');

uses()
    ->group('dm-entities-structural-db')
    ->in('Database');

uses()
    ->group('dm-entities-structural-ft')
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
