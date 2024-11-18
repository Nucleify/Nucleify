# <img src="/public/img/technologies/pest.svg" width="25"> &nbsp;Pest

This folder contains [Pest](https://pestphp.com/) tests.

1. ```Pest.php``` core file for imports
1. ```TestCase.php``` initializes core features for each test case
2. ```TestConstants.php``` contains constants accessible for all tests
3. ```TestExpectations.php``` contains expectations definitions. Expectation name should be camelCase and start with ```toBe``` prefix
4. ```TestFunctions.php``` contains functions accessible for all tests
5. ```TestGroups.php``` contains test groups definitions which can be used with ```--group=``` flag
5. ```TestUses.php``` it defines test uses for local/workflow runs
