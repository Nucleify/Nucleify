# Pest PHP

Pest 2.34 + Mockery. TestCase from `nuc_tests` provides `createUsers()` → `$this->admin`, `$this->tech`, `$this->user`.

## Module Test Structure

```
modules/nuc_example/tests/
├── Pest.php              # if (!defined('PEST_RUNNING')) { return; } + requires
├── TestConstants.php      # const entityData = [...]
├── TestGroups.php         # uses()->group('nuc-example')->in('.')
├── TestUses.php           # uses(TestCase::class)->in('Feature', 'Database')
├── Database/
│   ├── Factories/         # factory()->create() + assertDatabaseHas
│   ├── Migrations/        # Schema::hasTable + rollback
│   └── Models/            # Instance getters + scope methods
└── Feature/
    ├── Api/{Entity}/
    │   ├── HTTP200Test.php     # CRUD success (actingAs admin)
    │   ├── HTTP302Test.php
    │   ├── HTTP401Test.php     # Unauthenticated (no actingAs)
    │   ├── HTTP405AuthTest.php # Wrong method (authed)
    │   ├── HTTP405UnAuthTest.php
    │   ├── HTTP422PostTest.php # Validation per field
    │   ├── HTTP422PutTest.php
    │   └── HTTP500Test.php     # Mockery service exceptions
    └── Controllers/
```

## Conventions

- Guard: `if (!defined('PEST_RUNNING')) { return; }` — **mandatory**, CI runs `.pest/guard_check.php` which scans all test files and fails if any is missing this guard
- Use `describe()` + `test()`, group with `uses()->group()`
- `beforeEach`: `$this->createUsers()`, `$this->actingAs($this->admin)`
- Helpers: `apiTest()` for single, `apiTestArray()` for batch tests
- HTTP 500: mock service with Mockery `->andThrow(new Exception(...))`

## Key Patterns

```php
// API batch test (422 validation)
apiTestArray([
    'title > empty' => [
        'method' => 'POST', 'route' => 'articles.store',
        'data' => array_merge(articleData, ['title' => '']),
        'structure' => ['errors' => ['title']],
        'fragment' => ['errors' => ['title' => ['The title field is required.']]],
    ],
]);

// Model test
test('can get title', function (): void {
    expect($this->model->getTitle())->toBeString()->toBe($this->model->title);
});
```

## Commands

```bash
composer test
composer test -- --group=nuc-entities
composer test -- --group=api-200
```
