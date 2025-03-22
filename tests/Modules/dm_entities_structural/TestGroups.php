<?php

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('color-api')
    ->in('Feature/Api/Color');

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
