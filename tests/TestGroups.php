<?php

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('activity-api')
    ->in('Feature/Api/Activity');

uses()
    ->group('article-api')
    ->in('Feature/Api/Article');

uses()
    ->group('artisan-api')
    ->in('Feature/Api/Artisan');

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
    ->group('sitemap-api')
    ->in('Feature/Api/Sitemap');

uses()
    ->group('question-api')
    ->in('Feature/Api/Question');

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
