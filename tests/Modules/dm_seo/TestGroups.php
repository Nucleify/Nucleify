<?php

uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('sitemap-api')
    ->in('Feature/Api/Sitemap');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('commands')
    ->in('Feature/Commands');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('services')
    ->in('Feature/Services');
