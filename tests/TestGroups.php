<?php

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

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

uses()
    ->group('modules')
    ->in('Modules');

uses()
    ->group('dm-entities')
    ->in('Modules/dm_entities');

uses()
    ->group('dm-entities-structural')
    ->in('Modules/dm_entities_structural');
