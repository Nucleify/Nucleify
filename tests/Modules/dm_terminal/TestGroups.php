<?php

uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('artisan-api')
    ->in('Feature/Api/Artisan');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('commands')
    ->in('Feature/Commands');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');
