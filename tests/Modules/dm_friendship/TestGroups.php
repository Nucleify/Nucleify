<?php

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('services')
    ->in('Feature/Services');

uses()
    ->group('database')
    ->in('Database');

uses()
    ->group('migrations')
    ->in('Database/Migrations');
