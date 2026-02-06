# <img src="/public/img/technologies/pest.svg" width="25"> &nbsp;Pest

This folder contains [Pest](https://pestphp.com/) tests entry point.

## Structure

- `Pest.php` - main loader, includes all from `modules/nuc_tests`
- `TestCase.php` - alias for backward compatibility (`Tests\TestCase` → `Modules\NucTests\TestCase`)

## Core module

All test infrastructure has been moved to `modules/nuc_tests/tests/`:

```txt
modules/nuc_tests/tests/
├── functions/                    # Helper functions
│   ├── apiTest.php
│   ├── apiTestArray.php
│   ├── expectLogMessage.php
│   └── getModelByEntity.php
├── testcase/                     # TestCase traits
│   ├── CreatesApplication.php
│   ├── CreatesUsers.php
│   └── ResolvesSqlite.php
├── Functions.php                 # Includes functions/*
├── TestCase.php                  # Base test case class
├── Expectations.php              # Custom Pest expectations
├── Groups.php                    # Test group definitions
├── Uses.php                      # Test uses configuration
└── Pest.php
```
