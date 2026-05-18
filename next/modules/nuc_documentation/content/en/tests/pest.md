# Pest (Backend Testing)

Pest is the PHP testing framework used for backend testing in Nucleify.

---

## Configuration

### phpunit.xml

Configuration lives in `.config/phpunit.xml`. Root `phpunit.xml` does not exist—Sail and `composer test` use it automatically via the custom Sail wrapper.

```xml
<!-- .config/phpunit.xml -->
<phpunit bootstrap="../vendor/autoload.php" colors="true">
    <testsuites>
        <testsuite name="Modules"><directory>../modules</directory></testsuite>
        <testsuite name="Global"><directory>../tests/Global</directory></testsuite>
        <testsuite name="Database"><directory>../tests/Database</directory></testsuite>
        <testsuite name="Feature"><directory>../tests/Feature</directory></testsuite>
    </testsuites>
</phpunit>
```

### Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `APP_ENV` | `testing` | Application environment |
| `CACHE_DRIVER` | `array` | In-memory cache |
| `DB_TEST_DATABASE` | `testing` | Test database name |
| `SESSION_DRIVER` | `array` | In-memory sessions |

---

## Structure

### Global Tests

```
tests/
├── Pest.php              # Main configuration
├── Groups.php            # Test groups
├── Uses.php              # Common uses
├── Global/               # Global tests
├── Feature/              # Feature tests
└── Database/             # Database tests
```

### Module Tests

```
modules/nuc_example/tests/
├── Pest.php              # Module config
├── TestConstants.php     # Test data
├── TestGroups.php        # Module groups
├── Database/
│   ├── Factories/
│   ├── Migrations/
│   └── Models/
└── Feature/
    ├── Api/
    │   └── User/
    │       ├── HTTP200Test.php
    │       ├── HTTP302Test.php
    │       ├── HTTP401Test.php
    │       ├── HTTP422PostTest.php
    │       └── HTTP500Test.php
    └── Controllers/
```

---

## Pest Configuration

### Groups.php

```php
<?php

uses()
    ->group('database')
    ->in('Database');

uses()
    ->group('models')
    ->in('Database/Models');

uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('modules')
    ->in('../modules');
```

### Uses.php

```php
<?php

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

uses(TestCase::class)->in('Feature', 'Database');
uses(DatabaseMigrations::class)->in('Database/Factories', 'Feature/Controllers');
```

---

## Writing Tests

### Guard Pattern

Every test file must start with:

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}
```

### API Tests (HTTP 200)

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-api-200');

use App\Models\User;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        $this->getJson(route('users.index'))->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('users.store'), userData)->assertOk();
    });

    test('show api', function (): void {
        $model = User::factory()->create();
        $this->getJson(route('users.show', $model->id))->assertOk();
    });

    test('destroy api', function (): void {
        $model = User::factory()->create();
        $this->deleteJson(route('users.destroy', $model->id))->assertOk();
        $this->assertDatabaseMissing('users', ['id' => $model->id]);
    });
});
```

### Validation Tests (HTTP 422)

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($userData = userData) {
    $userData['name'] = '';
    test('name > empty', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.']
        ]]
    ));

    $userData['email'] = 'invalid';
    test('email > invalid', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.']
        ]]
    ));
});
```

### Model Tests

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-model');

use App\Models\User;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = User::factory()->create();
});

test('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(User::class);
});

describe('Instance', function (): void {
    test('can get id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can check if admin', function (): void {
        $model = User::factory()->create(['role' => 'admin']);
        expect($model->isAdmin())
            ->toBeTrue();
    });
});

describe('Scope', function (): void {
    test('can filter by role', function (): void {
        $found = User::getByAdminRole()->first();
        expect($found->role)->toBe('admin');
    });
});
```

### Controller Tests

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-controller');

use App\Http\Controllers\UserController;
use App\Services\UserService;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(
        UserController::class,
        ['userService' => app()->make(UserService::class)]
    );
});

describe('200', function (): void {
    test('index method', function (): void {
        $response = $this->controller->index();
        expect($response->getStatusCode())->toEqual(200);
    });
});
```

---

## Helper Functions

### apiTest()

Single test helper - returns a Closure for use with `test()`.

```php
<?php

function apiTest(
    $method,
    $route,
    $status,
    $data = null,
    $jsonStructure = null,
    $jsonFragment = null
): Closure;
```

**Usage:**

```php
test('name > empty', apiTest(
    'POST',
    'users.store',
    422,
    $userData,
    ['errors' => ['name']],
    ['errors' => [
        'name' => ['The name field is required.']
    ]]
));
```

### apiTestArray()

Batch test generator - creates multiple tests from an array.

```php
<?php

function apiTestArray(array $tests): void;
```

**Test definition options:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `method` | string | 'POST' | HTTP method: GET, POST, PUT, DELETE, SHOW |
| `route` | string | '' | Route name |
| `status` | int | 422 | Expected HTTP status |
| `data` | array | [] | Request data |
| `structure` | array | null | assertJsonStructure |
| `fragment` | array | null | assertJsonFragment |
| `errors` | array | null | assertJsonValidationErrors |
| `id` | int | null | ID for route (required for SHOW/PUT/DELETE, optional for GET/POST) |
| `json` | bool | true | Use JSON methods (postJson, putJson) or regular (post, put) |

**Usage:**

```php
describe('401', function () {
    apiTestArray([
        'index api' => [
            'method' => 'GET',
            'route' => 'contacts.index',
            'status' => 401,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'show api' => [
            'method' => 'SHOW',
            'route' => 'contacts.show',
            'status' => 401,
            'id' => 1,
        ],
        'destroy api' => [
            'method' => 'DELETE',
            'route' => 'contacts.destroy',
            'status' => 401,
        ],
    ]);
});

describe('422 > POST', function () {
    apiTestArray([
        'user_id > empty' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => ['user_id' => ''],
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => [
                'user_id' => ['The user id field is required.']
            ]],
        ],
        'first_name > too short' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => ['first_name' => 'L'],
            'structure' => ['errors' => ['first_name']],
            'fragment' => ['errors' => [
                'first_name' => ['The first name field must be at least 3 characters.']
            ]],
        ],
    ]);
});
```

**Benefits:**
- Cleaner syntax for multiple tests
- Automatic test naming from array keys
- All parameters per test

---

## Commands

```bash
# Run all tests (Docker)
sail pest

# Run all tests (local)
composer test

# Run specific suite
sail pest --testsuite=Modules
sail pest --testsuite=Feature

# Run specific group
sail pest --group=api-200
sail pest --group=models

# Run specific file
sail pest modules/nuc_entities/tests/Feature/Api/User/HTTP200Test.php

# Run with coverage
sail pest --coverage

# Filter by name
sail pest --filter="store api"
```

---

## Best Practices

1. **Always add guard** - `if (!defined('PEST_RUNNING')) { return; }`
2. **Use groups** - `uses()->group('name')`
3. **Use `beforeEach`** - Common setup
4. **Use `describe` blocks** - Group related tests
5. **Test all HTTP codes** - 200, 302, 401, 405, 422, 500
6. **Keep module tests** in `modules/*/tests/`
7. **Use factories** - `Model::factory()->create()`
8. **Assert database** - `assertDatabaseHas()`, `assertDatabaseMissing()`
