# Pest PHP (Backend Testing)

## Overview

Backend tests use **Pest 2.34** with a modular test infrastructure provided by `nuc_tests`. Tests live both in the global `tests/` directory and inside each module's `tests/` folder.

---

## Stack

- **Framework:** Pest 2.34 (+ pest-plugin-laravel)
- **Mocking:** Mockery
- **Database:** `RefreshDatabase` / `DatabaseMigrations` traits (auto-configured per test type)
- **TestCase:** `Modules\NucTests\TestCase` (extends Laravel's `BaseTestCase`)

---

## Global Test Configuration

### Entry Point (`tests/Pest.php`)

Defines `PEST_RUNNING` constant and auto-loads all module test configs:

```php
define('PEST_RUNNING', true);

require_once __DIR__ . '/Groups.php';
require_once __DIR__ . '/Uses.php';

foreach (glob(__DIR__ . '/../modules/*/tests/Pest.php') as $pestFile) {
    require $pestFile;
}
```

### PHPUnit Configuration (`phpunit.xml`)

Test suites:
- `Modules` — `modules/` directory
- `Global` — `tests/Global/`
- `Database` — `tests/Database/`
- `Feature` — `tests/Feature/`

Source coverage includes `app/` and `modules/` (excluding `modules/*/tests`).

### Environment variables for testing:
- `APP_ENV=testing`
- `CACHE_DRIVER=array`
- `SESSION_DRIVER=array`
- `MAIL_MAILER=array`
- `QUEUE_CONNECTION=sync`

---

## Test Infrastructure (`nuc_tests` module)

### TestCase (`modules/nuc_tests/tests/TestCase.php`)

Base test class used by all tests:

```php
abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use CreatesUsers;
    use ResolvesSqlite;
}
```

### CreatesUsers Trait

Provides `$this->admin`, `$this->tech`, `$this->user` with roles `admin`, `tech`, `user`:

```php
protected function createUsers(): void
{
    $this->admin = User::create([...  'role' => 'admin']);
    $this->tech = User::create([...   'role' => 'tech']);
    $this->user = User::create([...   'role' => 'user']);
}
```

### Helper Functions

Loaded via `nuc_tests/tests/Functions.php`:

#### `apiTest()` — Single API test closure

```php
test('example',
    apiTest('PUT', 'contacts.update', 422, $data, $structure, $fragment)
);
```

#### `apiTestArray()` — Batch API tests from array

```php
apiTestArray([
    'title > empty' => [
        'method' => 'POST',
        'route' => 'articles.store',
        'data' => array_merge(articleData, ['title' => '']),
        'structure' => ['errors' => ['title']],
        'fragment' => ['errors' => ['title' => ['The title field is required.']]],
    ],
    'put > index api' => [
        'method' => 'PUT',
        'route' => 'articles.index',
        'status' => 405,
        'id' => 1,
        'json' => false,
    ],
]);
```

Array keys for `apiTestArray`:
- `method` — HTTP method (`GET`, `SHOW`, `POST`, `PUT`, `PATCH`, `DELETE`)
- `route` — Named route
- `status` — Expected HTTP status (default: `422`)
- `data` — Request payload (default: `[]`)
- `structure` — Expected JSON structure
- `fragment` — Expected JSON fragment
- `errors` — Expected validation errors
- `id` — Route parameter ID
- `json` — Use JSON methods (default: `true`)

#### `getModelByEntity()` — Resolves model class from entity name

#### `expectLogMessage()` — Asserts activity log messages

### Custom Expectations

```php
expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});
```

---

## Module Test Structure

Each module with backend logic has `tests/` with this structure:

```
modules/nuc_example/tests/
├── Pest.php              # Module test config (requires groups, uses, constants)
├── TestConstants.php      # Test data constants
├── TestGroups.php         # Test groups definitions
├── TestUses.php           # TestCase and database trait bindings
│
├── Database/
│   ├── Factories/         # Factory tests
│   │   └── ArticleFactoryTest.php
│   ├── Migrations/        # Migration tests
│   │   └── ArticleMigrationsTest.php
│   └── Models/            # Model instance + scope tests
│       └── ArticleTest.php
│
└── Feature/
    ├── Api/               # HTTP status code tests
    │   └── Article/
    │       ├── HTTP200Test.php
    │       ├── HTTP302Test.php
    │       ├── HTTP401Test.php
    │       ├── HTTP405AuthTest.php
    │       ├── HTTP405UnAuthTest.php
    │       ├── HTTP422PostTest.php
    │       ├── HTTP422PutTest.php
    │       └── HTTP500Test.php
    └── Controllers/
        └── ArticleControllerTest.php
```

---

## Module Test Config Files

### `Pest.php` — Loads module dependencies

```php
if (!defined('PEST_RUNNING')) { return; }

require_once __DIR__ . '/TestGroups.php';
require_once __DIR__ . '/TestUses.php';

$articleData = require_once __DIR__ . '/TestConstants.php';
```

### `TestConstants.php` — Static test data

```php
const articleData = [
    'id' => 1,
    'user_id' => 1,
    'title' => 'Example title',
    'description' => 'Example description...',
    'category' => 'example',
];

const updatedArticleData = [
    'id' => 1,
    'title' => 'Updated title',
    // ...
];
```

### `TestGroups.php` — Group assignments

```php
uses()->group('nuc-entities')->in('.');
uses()->group('nuc-entities-db')->in('Database');
uses()->group('nuc-entities-ft')->in('Feature');
uses()->group('models')->in('Database/Models');
uses()->group('api')->in('Feature/Api');
uses()->group('article-api')->in('Feature/Api/Article');
uses()->group('controllers')->in('Feature/Controllers');
```

### `TestUses.php` — Database strategy bindings

```php
uses(Tests\TestCase::class)->in('Feature', 'Database');
uses(RefreshDatabase::class)->in('Database/Models', ...);
uses(DatabaseMigrations::class)->in('Database/Factories', 'Database/Migrations', 'Feature/Controllers', ...);
```

---

## Test Types & Conventions

### Guard Clause

Every test file starts with:

```php
if (!defined('PEST_RUNNING')) { return; }
```

### Group Registration

Each test file registers its own groups:

```php
uses()->group('article-api-200');
uses()->group('api-200');
```

### API Tests (by HTTP status code)

#### HTTP 200 — Success tests

```php
beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        Article::factory(3)->create();
        $this->getJson(route('articles.index'))->assertOk();
    });
});
```

#### HTTP 401 — Unauthenticated tests (no `actingAs`)

```php
describe('401', function (): void {
    apiTestArray([
        'index api' => [
            'method' => 'GET',
            'route' => 'articles.index',
            'status' => 401,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
    ]);
});
```

#### HTTP 405 — Method Not Allowed (auth + unauth variants)

Tests wrong HTTP methods against routes (e.g. PUT on a GET endpoint).

#### HTTP 422 — Validation (separate POST and PUT files)

Tests invalid data per field:

```php
'title > empty' => [
    'method' => 'POST',
    'route' => 'articles.store',
    'data' => array_merge(articleData, ['title' => '']),
    'structure' => ['errors' => ['title']],
    'fragment' => ['errors' => ['title' => ['The title field is required.']]],
],
```

#### HTTP 500 — Server Error (uses Mockery)

```php
beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(ArticleService::class);
});

test('index api', function (): void {
    $this->service->shouldReceive('index')->once()
        ->andThrow(new Exception('Internal Server Error'));
    $this->getJson(route('articles.index'))
        ->assertStatus(500)
        ->assertJson(['error' => 'Internal Server Error']);
});
```

### Model Tests

Test instance getters and scope methods:

```php
describe('Instance', function (): void {
    test('can get title', function (): void {
        expect($this->model->getTitle())
            ->toBeString()
            ->toBe($this->model->title);
    });
});

describe('Scope', function (): void {
    test('can filter by title', function (): void {
        $found = Article::getByTitle($this->model->title)->first();
        expect($found->title)->toBe($this->model->title);
    });
});
```

### Factory Tests

```php
test('can create record', function (): void {
    $model = Article::factory()->create();
    $this->assertDatabaseCount('articles', 1)
        ->assertDatabaseHas('articles', ['id' => $model->id]);
});
```

### Migration Tests

```php
test('can create table', function (): void {
    expect(Schema::hasTable('articles'))->toBeTrue()
        ->and(Schema::hasColumns('articles', ['id', 'title', ...]))->toBeTrue();
});

test('can be rolled back', function (): void {
    $this->artisan('migrate:rollback');
    expect(Schema::hasTable('articles'))->toBeFalse();
});
```

### Controller Tests

Test controller methods directly via DI:

```php
beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ArticleController::class, [
        'articleService' => app()->make(ArticleService::class)
    ]);
});

test('index method', function (): void {
    Article::factory()->count(3)->create();
    $response = $this->controller->index(new Request);
    expect($response->getStatusCode())->toEqual(200);
});
```

---

## Running Tests

```bash
# Run all tests
php artisan test

# Run by group
php artisan test --group=nuc-entities
php artisan test --group=api-200
php artisan test --group=article-model
php artisan test --group=models
php artisan test --group=modules
```

