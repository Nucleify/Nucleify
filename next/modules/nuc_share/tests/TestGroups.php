<?php

if (!defined('PEST_RUNNING')) {
    return;
}

/**
 *  Main groups
 */
uses()
    ->group('nuc-share')
    ->in('.');

uses()
    ->group('nuc-share-ft')
    ->in('Feature');

/**
 *  Feature groups
 */
uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('feature')
    ->in('Feature');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('share-controllers')
    ->in('Feature/Controllers');

uses()
    ->group('services')
    ->in('Feature/Services');

uses()
    ->group('share-services')
    ->in('Feature/Services');
