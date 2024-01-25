<?php


it('does not contain dd and dump in app')
    ->expect('app')
    ->not->toUse(['dd', 'dump']);

it('does not contain dd and dump in database')
    ->expect('database')
    ->not->toUse(['dd', 'dump']);

it('does not contain dd and dump in resources')
    ->expect('resources')
    ->not->toUse(['dd', 'dump']);

it('does not contain dd and dump in routes')
    ->expect('routes')
    ->not->toUse(['dd', 'dump']);

it('does not contain dd and dump in tests')
    ->expect('tests')
    ->not->toUse(['dd', 'dump']);
