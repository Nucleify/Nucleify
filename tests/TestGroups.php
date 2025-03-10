<?php

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('article-api')
    ->in('Feature/Api/Entities/Article');

uses()
    ->group('contact-api')
    ->in('Feature/Api/Entities/Contact');

uses()
    ->group('money-api')
    ->in('Feature/Api/Entities/Money');

uses()
    ->group('user-api')
    ->in('Feature/Api/Entities/User');

uses()
    ->group('card-api')
    ->in('Feature/Api/Structural/Card');    

uses()
    ->group('question-api')
    ->in('Feature/Api/Structural/Question');

uses()
    ->group('technology-api')
    ->in('Feature/Api/Structural/Technology');

uses()
    ->group('activity-api')
    ->in('Feature/Api/Utilities/Activity');

uses()
    ->group('artisan-api')
    ->in('Feature/Api/Utilities/Artisan');

uses()
    ->group('sitemap-api')
    ->in('Feature/Api/Utilities/Sitemap');

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
